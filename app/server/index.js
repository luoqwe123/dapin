require('dotenv').config();

const express = require('express')
const http = require('http')
const cors = require('cors');
const mysql = require('mysql2')


const app = express()
const server = http.createServer(app)
app.use(cors());
// 连接 MySQL 数据库

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // 替换为您的 MySQL 用户名
  password: process.env.SQL_PASSWORD, // 替换为您的 MySQL 密码
  database: 'shudapin'
})



db.connect((err) => {
  if (err) {
    console.error('数据库连接失败:', err.message)
    process.exit(1)
  }
  console.log('数据库连接成功')
})

// // 模拟更新数据库数据（每五分钟）
// const updateRoomData = () => {
//   const newData = {
//     temperature: (25 + (Math.random() - 0.5) * 2).toFixed(1), // 温度 24-26°C
//     humidity: (60 + (Math.random() - 0.5) * 5).toFixed(1),    // 湿度 57.5-62.5%
//     windSpeed: (3 + (Math.random() - 0.5) * 1).toFixed(1),   // 风速 2.5-3.5 m/s
//   }

//   db.query(
//     'INSERT INTO room_data (temperature, humidity, wind_speed) VALUES (?, ?, ?)',
//     [newData.temperature, newData.humidity, newData.windSpeed],
//     (err) => {
//       if (err) {
//         console.error('更新数据失败:', err.message)
//       }
//     }
//   )

//   return newData
// }

// 从数据库获取最新数据
const getLatestRoomData = (callback) => {
  db.query(
    'SELECT id, name FROM user ORDER BY id DESC LIMIT 1;',
    (err, results) => {
      if (err) {
        console.error('查询数据失败:', err.message)
        callback(null)
      } else {
        callback(results[0])
      }
    }
  )
}
// getLatestRoomData(console.log)
// // SSE 路由
// app.get('/events', (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream')
//   res.setHeader('Cache-Control', 'no-cache')
//   res.setHeader('Connection', 'keep-alive')

//   // 首次发送当前数据
//   getLatestRoomData((data) => {
//     if (data) {
//       res.write(`data: ${JSON.stringify(data)}\n\n`)
//     }
//   })

//   // 每五分钟更新并推送数据
//   const interval = setInterval(() => {
//     updateRoomData()
//     getLatestRoomData((data) => {
//       if (data) {
//         res.write(`data: ${JSON.stringify(data)}\n\n`)
//       }
//     })
//   }, 5 * 60 * 1000) // 5 分钟

//   // 客户端断开时清理
//   req.on('close', () => {
//     clearInterval(interval)
//     res.end()
//   })
// })

// // 静态文件服务（可选，用于服务前端）
// app.use(express.static('public'))

// const PORT = process.env.PORT || 3000
// server.listen(PORT, () => {
//   console.log(`服务器运行在 http://localhost:${PORT}`)
// })

// // 关闭数据库连接
// process.on('SIGINT', () => {
//   db.end((err) => {
//     if (err) {
//       console.error('关闭数据库失败:', err.message)
//     }
//     console.log('数据库已关闭')
//     process.exit(0)
//   })
// })