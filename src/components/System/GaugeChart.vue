<template>
  <div class="gauge-chart-container">
    <div class="gauge-chart" v-for="(item, index) in gaugeData" :key="index">
      <div class="gauge-title">{{ item.title }}</div>
      <div class="main-box">
        <div class="data" v-if="item.title === '室内'">
          <Circle :value="10" name="温度" :min="-20" :max="40" unit="°C" />
          <Circle :value="10" name="温度" :min="-20" :max="40" unit="°C" />
          <Circle :value="10" name="温度" :min="-20" :max="40" unit="°C" />
        </div>
        <div class="data" v-else>
          <Circle :value="10" name="温度" :min="-20" :max="40" unit="°C" />
          <Circle :value="10" name="温度" :min="-20" :max="40" unit="°C" />
          <Circle :value="10" name="温度" :min="-20" :max="40" unit="°C" />
          <Circle :value="10" name="温度" :min="-20" :max="40" unit="°C" />

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
}

.gauge-chart {
  width: 100%;
  height: 100%;
  background-color: #0e1a2b;
  border-radius: 10px;
 
}

.gauge-title {
  color: #fff;
  font-size: 1.3rem;
  // text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25%;

}

.main-box {
  height: 75%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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