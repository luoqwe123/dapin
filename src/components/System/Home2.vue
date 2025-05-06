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
            <div v-for="room in rooms.slice(0, Math.floor(rooms.length) / 2)" :key="room.id" class="room">
                <div class="floor"></div>
                <div class="wall-left"></div>
                <div class="wall-back">{{ room.name }}</div>
                <div class="wall-right"></div>
            </div>
        </div>

        <!-- 下层房间 -->
        <div class="row bottom-row">
            <div v-for="room in rooms.slice(Math.floor(rooms.length) / 2, rooms.length)" :key="room.id" class="room">
                <div class="floor">{{ room.name }}</div>
                <div class="wall-left"></div>
                <div class="wall-back">{{ room.name }}</div>
                <div class="wall-right"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$room-width: 12vw;
$room-height: 12vh;

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
    justify-content: center;
    /* justify-content: space-between; */
    gap: 5%;
}


.room {
    position: relative;
    width: $room-width;
    /* 房间宽度 */
    height: $room-height;
    transform-style: preserve-3d;
    transform: rotateX(-10deg) rotateY(-10deg);
    /* 旋转观察角度 */
}

/* 地板 */
.floor {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, .8), #090f27);
    transform: rotateX(90deg) translateZ(-6vh) ;
    // box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

/* 左墙 */
.wall-left {
    position: absolute;
    width: 100%;
    height: 100%;
    // background: white;
    background: linear-gradient(to left, rgba(255, 255, 255, .8), #090f27);
    transform: rotateY(90deg) translateZ(-6vw) ;
}

/* 后墙 */
.wall-back {
    position: absolute;
    width: 100%;
    height: 100%;
    // background: #090f27;
    transform: translateZ(-6vh);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

/* 右墙 */
.wall-right {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, .8), #090f27);
    transform: rotateY(-90deg) translateZ(-6vw);
}
</style>