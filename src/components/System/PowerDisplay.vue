<template>
    <div class="solar-container">
        <div class="title">太阳能发电量实时</div>
        <div class="info">
            <div class="item">
                <span class="label">电量存量</span>
                <span class="value">{{ totalPower }} kWh</span>
            </div>
            <div class="item">
                <span class="label">电量显示</span>
                <div class="chart-wrapper">
                    <div ref="chartRef" class="chart"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
    name: 'SolarPower',
    setup() {
        const chartRef = ref<HTMLDivElement | null>(null);
        const chartInstance = ref<echarts.ECharts | null>(null);

        const totalPower = ref<number>(1200); // 总电量  
        const remainingPercentage = ref<number>(66); // 剩余百分比  

        const initChart = () => {
            if (chartRef.value) {
                chartInstance.value = echarts.init(chartRef.value);
                const options = {
                    grid: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    },
                    xAxis: {
                        type: 'value',
                        min: 0,
                        max: 100,
                        splitLine: { show: false },
                        axisLine: { show: false },
                        axisTick: { show: false },
                        axisLabel: { show: false }
                    },
                    yAxis: {
                        type: 'category',
                        data: ['电量显示'],
                        axisLine: { show: false },
                        axisTick: { show: false },
                        axisLabel: { show: false }
                    },
                    series: [
                        {
                            type: 'bar',
                            data: [remainingPercentage.value],
                            barWidth: 40,
                            itemStyle: {
                                color: '#3FC7FA',
                                borderRadius: [0, 4, 4, 0]
                            },
                            label: {
                                show: true,
                                position: 'inside',
                                formatter: '{c}%',
                                color: '#fff',
                                fontSize: 14
                            }
                        }
                    ],
                    animationDuration: 1500,
                    animationEasing: 'linear', // 平滑动画效果
                    animationDirection: 'horizontal' // 水平方向动画
                };
                chartInstance.value.setOption(options);
            }
        };

        onMounted(() => {
            initChart();
        });

        watch(remainingPercentage, () => {
            if (chartInstance.value) {
                chartInstance.value.setOption({
                    series: [
                        {
                            data: [remainingPercentage.value]
                        }
                    ]
                });
            }
        });

        return {
            chartRef,
            totalPower,
            remainingPercentage
        };
    }
});
</script>

<style lang="scss" scoped>
.solar-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .title {
        color: #ffffff;
        font-size: 1.3rem;
        font-weight: 400;
        text-align: center;

    }

    .info {
        display: flex;
        flex-direction: column;

        .item {
            display: flex;
            margin-top: 10px;

            .label {
                color: #999;
                font-size: 1.3rem;
                font-weight: 400;
                padding-right: 10px;
            }

            .value {
                color: #fff;
                font-size: 1.3rem;
                font-weight: 400;

            }
        }
    }

    .chart-wrapper {
        flex: 1;
        justify-content: center;
        align-items: center;

        .chart {
            width: 80%;
            height: 30px;
        }
    }
}
</style>