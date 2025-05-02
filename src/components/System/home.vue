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
      <div v-for="room in rooms.slice(0, 3)" :key="room.id" class="room">
        <div class="room-inner">
          <div class="room-front"></div>
          <div class="room-back"></div>
          <div class="room-left"></div>
          <div class="room-right"></div>
          <div class="room-bottom">{{ room.name }}</div>
        </div>
      </div>
    </div>
    
    <!-- 下层房间 -->
    <div class="row bottom-row">
      <div v-for="room in rooms.slice(3, 6)" :key="room.id" class="room">
        <div class="room-inner">
          <div class="room-front"></div>
          <div class="room-back"></div>
          <div class="room-left"></div>
          <div class="room-right"></div>
          <div class="room-bottom">{{ room.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 容器阴影增强立体感 */
  display: flex;
  flex-direction: column;
  gap: 20px;
  perspective: 1000px; /* 全局透视效果 */
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.room {
  width: 200px; /* 立方体宽度 */
  height: 200px; /* 立方体高度 */
  position: relative;
  transform-style: preserve-3d;
}

.room-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateZ(45deg); /* 斜上方视角，展示立方体 */
  transition: transform 0.3s ease;
}

.room-inner:hover {
  transform: rotateX(30deg) rotateZ(30deg) translateZ(20px); /* 悬停时调整角度并上浮 */
}

/* 立方体的各个面 */
.room-front,
.room-back,
.room-left,
.room-right,
.room-bottom {
  position: absolute;
  width: 200px; /* 立方体面尺寸 */
  height: 200px;
  backface-visibility: hidden;
  box-sizing: border-box;
}

.room-front {
  background: linear-gradient(135deg, #ffffff, #e0e7ef); /* 正面渐变（墙面） */
  border: 2px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateZ(100px); /* 正面位于Z轴100px */
}

.room-back {
  background: linear-gradient(135deg, #d0d7df, #c0c7cf); /* 背面渐变（墙面） */
  transform: rotateY(180deg) translateZ(100px); /* 背面旋转180度 */
}

.room-left {
  background: linear-gradient(90deg, #d0d7df, #c0c7cf); /* 左面渐变（墙面） */
  transform: rotateY(-90deg) translateZ(100px); /* 左面旋转-90度 */
}

.room-right {
  background: linear-gradient(90deg, #c0c7cf, #d0d7df); /* 右面渐变（墙面） */
  transform: rotateY(90deg) translateZ(100px); /* 右面旋转90度 */
}

.room-bottom {
  background: linear-gradient(0deg, #8b7d6b, #6b5b4a); /* 底面渐变（地面，深棕色调） */
  transform: rotateX(-90deg) translateZ(100px); /* 底面旋转-90度 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  color: #fff; /* 白色文字以对比深棕色地面 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); /* 文字阴影增强可读性 */
}

/* 响应式设计 */
@media (max-width: 768px) {
  .room {
    width: 150px;
    height: 150px;
  }
  .room-front,
  .room-back,
  .room-left,
  .room-right,
  .room-bottom {
    width: 150px;
    height: 150px;
  }
  .room-bottom {
    font-size: 1em; /* 小屏幕下减小文字 */
  }
  .room-inner:hover {
    transform: rotateX(30deg) rotateZ(30deg) translateZ(15px);
  }
  .row {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>