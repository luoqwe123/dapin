<template>
  <div class="gauge-chart-container">
    <div class="gauge-chart" v-for="(item, index) in gaugeData" :key="index">
      <div class="gauge-title">{{ item.title }}</div>
      <div class="main-box">
        <div class="data" v-if="item.title === '室内'">
          <Circle :value="10" name="温度" :min="-20" :max="40" unit="°C" />
          <Circle :value="50" name="湿度" :min="0" :max="100" unit="%" />
          <Circle :value="1" name="速度" :min="0" :max="10" unit="m/s" />
        </div>
        <div class="data" v-else>
          <Circle :value="30" name="温度" :min="-20" :max="40" unit="°C" />
          <Circle :value="50" name="湿度" :min="0" :max="100" unit="%" />
          <Circle :value="4" name="风速" :min="0" :max="10" unit="m/s" />
          <Circle :value="60" name="光照强度" :min="0" :max="100" unit="lx" />

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Circle from './circle.vue';


const gaugeData = ref([
  {
    title: '室内',

  },
  {
    title: '室外',

  }
]);



</script>

<style lang="scss" scoped>
.gauge-chart-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #0e1a2b;
  // padding: 20px;
  flex-direction: column;
  border-radius: inherit;
  // border: 1px solid #0e1a2b;
}

.gauge-chart {
  width: 100%;
  height: 50%;
  background-color: #0e1a2b;
  border-radius: inherit;
  display: flex;
  
}

.gauge-title {
  color: #fff;
  font-size: 1.2rem;
  // text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

}

.main-box {
  height: 100%;
  width: 100%;
  display: flex;
  
  align-items: center;
  justify-content: left;
  padding: 0px 16px;
  .data {
    
    display: inline-flex;
    flex-direction: row; // 保持行布局
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap; // 启用换行
    gap: 10px;
    // box-sizing: border-box; // 包含 padding 在高度计算中
  }
}
</style>