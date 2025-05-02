<script setup lang="ts">
import { ref } from 'vue'

// 定义房间数据
const rooms = ref([
  { id: 1, name: '房间 1' },
  { id: 2, name: '房间 2' },
  { id: 3, name: '房间 3' },
  { id: 4, name: '房间 4' },
  { id: 5, name: '房间 5' },
  { id: 6, name: '房间 6' },
])
</script>

<template>
  <div class="container">
    <!-- 上层房间 -->
    <div class="row top-row">
      <div v-for="room in rooms.slice(0, Math.floor(rooms.length)/2)" :key="room.id" class="room">
      
          <div class="box-container">
            <!-- 盒子的底面 -->
            <div class="box-face bottom-face">
              <slot name="content">{{ room.name }}</slot>
            </div>

            <!-- 四条支柱，表示四个顶点向上延伸的实线 -->
            <div class="line line-1"></div>
            <div class="line line-2"></div>
            <div class="line line-3"></div>
            <div class="line line-4"></div>
          </div>
       
      </div>
    </div>

    <!-- 下层房间 -->
    <div class="row bottom-row">
      <div v-for="room in rooms.slice(Math.floor(rooms.length)/2, rooms.length)" :key="room.id" class="room">
        <div class="room-inner">
          <div class="box-container">
            <!-- 盒子的底面 -->
            <div class="box-face bottom-face">
              <slot name="content">{{ room.name }}</slot>
            </div>

            <!-- 四条支柱，表示四个顶点向上延伸的实线 -->
            <div class="line line-1"></div>
            <div class="line line-2"></div>
            <div class="line line-3"></div>
            <div class="line line-4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;

  height: 100%;

  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  /* 容器阴影增强整体立体感 */
  display: flex;
  flex-direction: column;
  gap: 30%;
  /* justify-content: space-between; */
}

.row {
  display: flex;
  justify-content: space-between;
  
  gap: 15%;
}

.room {
  width: 200px;
  /* 房间宽度 */
  height: 100px;
  /* 房间高度 */
  position: relative;
}





.box-container {
  position: relative;
  width: 150px;
  height: 150px;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(30deg);
  /* 调整观察角度 */
  margin-top: 80px;
  padding-left: 20px;
}

/* 底面样式 */
.box-face.bottom-face {
  position: absolute;
  width: 150px;
  height: 150px;
  background: rgba(255, 99, 71, 0.8);
  /* 底面颜色 */
  border: 1px solid #ffffff;
  opacity: 0.9;
  transform: rotateX(90deg) translateZ(50px);
  /* 底面位置 */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

/* 四条线（立体支柱） */
.line {
  position: absolute;
  width: 2px;
  background: #000;
  /* 实线颜色 */
  transform-origin: bottom center;
}

.line-1 {
  height: 6.9vh;
  transform: translateX(-20px) translateY(-69px) translateZ(-37px) rotateY(0deg);
}

.line-2 {
  height: 6.9vh;
  transform: translateX(170px) translateY(-22px) translateZ(-110px) rotateY(0deg);
}

.line-3 {
  height: 6.9vh;
  transform: translateX(-14px) translateY(-64px) translateZ(100px) rotateY(0deg);
}

.line-4 {
  height: 6.9vh;
  transform: translateX(170px) translateY(-24px) translateZ(40px) rotateY(0deg);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .room {
    width: 150px;
    height: 150px;
  }

  .room-inner {
    font-size: 1em;
    /* 小屏幕下减小文字 */
  }

  .row {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>