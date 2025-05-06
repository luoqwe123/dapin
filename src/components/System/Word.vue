<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
    word:string
}>(),{
    word:"你好"
})


</script>

<template>
  <div class="square-box">
    <!-- 文字部分 -->
    <div class="text-container" >
      {{ props.word }}
    </div>
    <!-- 盒子主体，包含分段边框 -->
    <div class="box-content" style="gap: inherit;">
        
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.square-box {
  position: relative;
  width: 100%; /* 正方形宽度 */
  height: 100%; /* 正方形高度 */
  /* margin: 50px auto; 居中显示 */
}

.text-container {
  position: absolute;
  top: -16px; /* 与上边框平齐（抵消边框厚度） */
  left: 32%; /* 距离左边框约25%（20%-30%范围内） */
  transform: translateX(-50%); /* 水平居中于定位点 */
  padding: 0 10px; /* 文字左右留白 */
  background: #090f27; /* 背景色覆盖边框，模拟无边框效果 */
  font-size: 1.2em;
  color: white;
  text-align: center;
  
  z-index: 2; /* 确保文字在边框之上 */
}

.box-content {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #333; /* 边框样式 */
  box-sizing: border-box;
  border-radius: 2%;
  padding: 20px;
  
}

/* 伪元素覆盖文字区域边框 */
.box-content::before {
  content: '';
  position: absolute;
  top: -2px; /* 对齐上边框 */
  left: 32%; /* 与文字对齐 */
  width: 100px; /* 覆盖文字区域，宽度根据文字长度调整 */
  height: 2px; /* 覆盖边框厚度 */
  background: #090f27; /* 使用背景色覆盖边框 */
  transform: translateX(-50%);
  
  z-index: 1; /* 在边框之上，文字之下 */
}

/* 左右两段上边框 */
.box-content::after {
  content: '';
  position: absolute;
  top: -2px;
  left: 2%;
  right: 2%;
  height: 2px;
  background: linear-gradient(
    to right,
    #333 0%,
    #333 calc(25% - 50px), /* 左段边框，调整为文字偏左 */
    transparent calc(25% - 50px),
    transparent calc(25% + 50px), /* 文字区域无边框 */
    #333 calc(25% + 50px),
    #333 100% /* 右段边框 */
  );
  z-index: 0; /* 在文字和覆盖层之下 */
}
</style>