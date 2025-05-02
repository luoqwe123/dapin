<template>
    <div ref="chartRef" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, } from 'vue';
  import * as echarts from 'echarts';
  const props = withDefaults(defineProps<{
    value:number
  }>(),{
    value:20
  })
  const chartRef = ref<HTMLDivElement | null>(null);
  const value = ref(props.value); // 示例值，可根据实际情况修改
  const title = ref('仪表'); // 示例标题，可根据实际情况修改
  const min = ref(0); // 最小值
  const max = ref(100); // 最大值
  
  const initChart = () => {
    if (chartRef.value) {
      const myChart = echarts.init(chartRef.value);
      const option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
       
        series: [
          {
            name: title.value,
            type: 'gauge',
            min: min.value,
            max: max.value,
            detail: {
              formatter: '{value}'
            },
            data: [
              {
                value: value.value,
                
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    }
  };
  
  onMounted(() => {
    initChart();
  });
  </script>
  
  <style scoped></style>    