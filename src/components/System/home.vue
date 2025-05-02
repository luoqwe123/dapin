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
          {{ room.name }}
        </div>
      </div>
    </div>
    
    <!-- 下层房间 -->
    <div class="row bottom-row">
      <div v-for="room in rooms.slice(3, 6)" :key="room.id" class="room">
        <div class="room-inner">
          {{ room.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  margin-top: 20px;

  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 容器阴影增强整体立体感 */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.room {
  width: 200px; /* 房间宽度 */
  height: 100px; /* 房间高度 */
  position: relative;
}

.room-inner {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ffffff, #e0e7ef); /* 房间渐变背景 */
  border: 2px solid #ccc; /* 边框 */
  border-radius: 8px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3), /* 右下阴影，模拟立体感 */
              -3px -3px 6px rgba(255, 255, 255, 0.5); /* 左上高光，增强3D效果 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  color: #333;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* 文字阴影 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.room-inner:hover {
  transform: translateY(-5px); /* 悬停时上浮 */
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.4), /* 阴影加深 */
              -5px -5px 10px rgba(255, 255, 255, 0.6);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .room {
    width: 150px;
    height: 150px;
  }
  .room-inner {
    font-size: 1em; /* 小屏幕下减小文字 */
  }
  .row {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>