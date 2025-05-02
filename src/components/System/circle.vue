<template>
  <div ref="chartRef" class="gauge-chartel"></div>
</template>

<script setup lang="ts">
import {  onMounted, ref, watch} from "vue";
import * as echarts from "echarts";
const props = withDefaults(defineProps<{
  value: number
  name: string
  min: number
  max: number
  unit: string
}>(), {
  value: 10,
  name: '温度',
  min: -20,
  max: 40,
  unit: '°C'
})


const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

// 初始化 ECharts
const initChart = () => {
  if (!chartRef.value) return;

  chartInstance = echarts.init(chartRef.value);

  const options = getChartOptions(props);
  chartInstance.setOption(options);
};

// 动态更新图表
const updateChart = () => {
  if (chartInstance) {
    const options = getChartOptions(props);
    chartInstance.setOption(options);
  }
};

// 监听数据变化
watch(
  () => props,
  () => {
    updateChart();
  },
  { deep: true }
);

// 组件挂载后初始化图表
onMounted(() => {
  initChart();
});

// 图表配置函数
const getChartOptions = (data: {
  value: number;
  name: string;
  min: number;
  max: number;
  unit: string;
}) => {
  return {
    series: [
      {
        type: "gauge",
        radius: "100%", // 图表尺寸
        startAngle: 90,
        endAngle: -270,
        splitNumber: 0, // 无刻度
        axisLine: {
          lineStyle: {
            width: 8, // 环形宽度
            color: [
              [data.value / data.max, "#3FA7DC"], // 当前值的颜色
              [1, "#E5E5E5"], // 剩余部分
            ],
          },
        },
        pointer: {
          show: false, // 不显示指针
        },
        axisTick: {
          show: false, // 不显示刻度
        },
        splitLine: {
          show: false, // 不显示分割线
        },
        axisLabel: {
          show: false, // 不显示轴标签
        },
        detail: {
          valueAnimation: true,
          formatter: `{value}${data.unit}`,
          color: "#333",
          fontSize: 14, // 中心文字大小
          offsetCenter: [0, "0%"], // 中心位置
        },
        data: [
          {
            value: data.value,
            // name: data.name,
          },
        ],
      },
    ],
  };
};




</script>

<style lang="scss" scoped>
.gauge-chartel {
  width: 50px;
  height: 50px;
}
</style>