<template>
  <div class="power-consumption-chart" ref="chartContainer"></div>
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
        text: '整体耗电量曲线',
        left: 'left',
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
        boundaryGap: false,
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
          data: [40, 45, 50, 55, 60, 65, 70], // 调整为7个数据点，与xAxis.data匹配
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

    // 监听窗口大小变化，适配图表
    window.addEventListener('resize', () => {
      myChart.resize();
    });
  }
});
</script>

<style scoped>
.power-consumption-chart {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
</style>