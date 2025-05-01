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
        left: 'center',
        textStyle: {
          color: '#fff',
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['0时', '4时', '8时', '12时', '16时', '20时', '24时']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} kWh'
        },
  
      },
      series: [
        {
          data: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90],
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
.power-consumption-chart {
  width: 100%;
  height: 100%;
}
</style>