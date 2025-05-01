<template>
  <div class="dashboard-container">
    <div class="section">
      <h3 class="section-title">室内</h3>
      <div class="gauge" v-for="item in indoorData" :key="item.title">
        <div>{{ item.title }}</div>
        <v-chart :options="item.option" autoresize />
      </div>
    </div>
    <div class="section">
      <h3 class="section-title">室外</h3>
      <div class="gauge" v-for="item in outdoorData" :key="item.title">
        <div>{{ item.title }}</div>
        <v-chart :options="item.option" autoresize />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { defineComponent } from 'vue';
import VChart from 'vue-echarts';
import * as echarts from 'echarts';

const indoorData = ref([
  { title: '温度', option: { /* 室内温度仪表盘配置 */ } },
  { title: '湿度', option: { /* 室内湿度仪表盘配置 */ } },
  { title: '风速', option: { /* 室内风速仪表盘配置 */ } }
]);

const outdoorData = ref([
  { title: '温度', option: { /* 室外温度仪表盘配置 */ } },
  { title: '湿度', option: { /* 室外湿度仪表盘配置 */ } },
  { title: '风速', option: { /* 室外风速仪表盘配置 */ } },
  { title: '空气质量', option: { /* 室外空气质量仪表盘配置 */ } }
]);

const gaugeOption = (value: number, title: string, unit: string) => ({
  title: {
    text: `${value}${unit}`,
    subtext: title,
    left: 'center',
    top: '30%',
    textStyle: {
      color: '#fff',
      fontSize: '20px' // 固定像素值
    },
    subtextStyle: {
      color: '#fff',
      fontSize: '12px' // 固定像素值
    }
  },
  series: [
    {
      type: 'gauge',
      startAngle: 90,
      endAngle: -270,
      progress: {
        show: true,
        overlap: false,
        roundCap: true,
        clip: false,
        shape: 'arc',
        width: '10%' // 百分比宽度
      },
      axisLine: {
        lineStyle: {
          width: 10, // 固定像素值
          color: [[0.3, '#67e0e3'], [0.7, '#37a2da'], [1, '#fd666d']]
        }
      },
      pointer: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      detail: {
        valueAnimation: true,
        formatter: `{value}${unit}`,
        color: '#fff',
        fontSize: 20, // 固定像素值
        offsetCenter: [0, '70%']
      },
      data: [{ value }]
    }
  ]
});

onMounted(() => {
  indoorData.value.forEach(item => item.option = gaugeOption(25, item.title, '°C'));
  outdoorData.value.forEach((item, index) => {
    item.option = index === 0 ? gaugeOption(30, item.title, '°C') :
                   index === 1 ? gaugeOption(50, item.title, '%') :
                   index === 2 ? gaugeOption(25, item.title, '°C') :
                   gaugeOption(80, item.title, '%');
  });
});

</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
  width: 100%; /* 相对于父容器的宽度 */
  height: 100%; /* 相对于父容器的高度 */
}

.section {
  width: 10%; /* 每个部分宽度相同 */
  text-align: center;
}

.section-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
}

.gauge {
  width: 100%; /* 仪表盘宽度与部分相同 */
  height: 100%; /* 仪表盘高度与部分相同 */
  margin: 10px;
}
</style>