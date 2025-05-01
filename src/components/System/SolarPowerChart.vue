<template>
  <div class="solar-power-chart" ref="chartContainer"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartContainer = ref(null);

onMounted(() => {
  if (chartContainer.value) {
    const myChart = echarts.init(chartContainer.value);

    const option = {
      title: {
        text: '太阳能发电量',
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: '1.3rem',
          fontWeight: 400
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
                containLabel: true, // 确保网格区域包含坐标轴的标签
                left: '3%',
                right: '4%',
                bottom: '5%',
                top: '22%', // 调整图表与容器顶部的距离
            },
      xAxis: {
        type: 'category',
        data: ['0时', '4时', '8时', '12时', '16时', '20时', '24时'],
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff',
            width: 1,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} kWh'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff',
            width: 1,
          },
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          data: [50, 55, 60, 65, 70, 75, 80, 85, 90],
          type: 'line',
          lineStyle: {
            color: '#00bfff'
          },
          symbol: 'circle',
          symbolSize: 5
        }
      ]
    };

    myChart.setOption(option);
  }
});
</script>

<style scoped>
.solar-power-chart {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>