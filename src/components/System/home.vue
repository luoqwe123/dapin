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
  <div class="Home-container">
    <!-- 上层房间 -->
    <div class="row top-row">
      <div v-for="room in rooms.slice(0, Math.floor(rooms.length)/2)" :key="room.id" class="room">
      
          <div class="box-container">
            <!-- 盒子的底面 -->
            <div class="box-face bottom-face">
              <div class="roomName">
                <slot name="content">{{ room.name }}</slot>
              </div>
              
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
</template>

<style  lang="scss" scoped>

$room-width:12vw;
$room-height:12vh;
.Home-container {
  width: 100%;

  height: 100%;

  background: #090f27;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  /* 容器阴影增强整体立体感 */
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 30% 0;
  gap: 30%;
  /* justify-content: space-between; */
}

.row {
  height: 42%;
  width: 80%;
  display: flex;
  /* justify-content: space-between; */
  gap: 5%;
}

.room {
  // flex: 1;
  width: $room-width; 
  /* 房间宽度 */
  height: $room-height;
  /* 房间高度 */
  position: relative;
}





.box-container {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(30deg);
  /* 调整观察角度 */
  /* margin-top: 2vh; */
  padding-left: 20px;
}

/* 底面样式 */
.box-face.bottom-face {
  position: absolute;
  width: 100%;
  height: 100%;
  /* background: rgba(255, 99, 71, 0.8); */
  /* 底面颜色 */
  border: 1px solid #fff;
  opacity: 0.9;
  transform: rotateX(90deg)  translateZ(0px);
  /* 底面位置 */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}

/* 四条线（立体支柱） */
.line {
  position: absolute;
  width: 0.1vw;
  background:  linear-gradient(to top, rgba(255,255,255,.6), #090f27);
  /* 实线颜色 */
  transform-origin: bottom center;
}

.line-1 {
  height: 6vh;
  transform: translateX(0) translateY(0.1vh) translateZ(-calc($room-width/4)) rotateY(0deg);
}

.line-2 {
  height: 6vh;
  transform: translateX(0) translateY(0.1vh) translateZ(calc($room-width/4)) rotateY(0deg);
}

.line-3 {
  height: 6vh;
  transform: translateX($room-width) translateY(0.1vh) translateZ(-calc($room-width/4)) rotateY(0deg);
}

.line-4 {
  height: 6vh;
  transform: translateX($room-width) translateY(0.1vh) translateZ(calc($room-width/4)) rotateY(0deg);
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