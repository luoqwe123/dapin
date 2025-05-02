<template>
    <div class="dashboard-container">
        <!-- 标题 -->
        <h2 class="title underline">变电站热环境数字孪系统</h2>
        <div class="main">
            <div class="left">
                <div class="left-top">
                    <div class="air-con">
                        <span>空调</span>
                        <!-- 空调滑动开关 -->
                        <Button @click="airToggle" />
                    </div>
                    <!-- 风速调节 -->
                    <div class="control-group">
                        <span>风速：{{ windSpeed }}m/s</span>
                        <div class="btn-group">
                            <button @click="decreaseWind" class="btn">-</button>
                            <button @click="increaseWind" class="btn">+</button>
                        </div>
                    </div>
                    <!-- 温度调节 -->
                    <div class="control-group">
                        <span>温度：{{ temperature }}℃</span>
                        <div class="btn-group">
                            <button @click="decreaseTemp" class="btn">-</button>
                            <button @click="increaseTemp" class="btn">+</button>
                        </div>
                    </div>
                </div>

                <div class="left-center">
                    <div class="cold-warm">
                        <div class="cold-warm-con">
                            <span>冷暖：</span>
                            <Button :class="{ 'cold': isCold, 'hot': !isCold }" @click="toggleSwitch" />
                        </div>
                        <div class="cold-warm-con">
                            当前状态：{{ isCold ? '冷' : '暖' }}
                        </div>
                    </div>
                    <div class="ele-heater">
                        <span>电暖气</span>
                        <Button @click="eleToggle" />
                    </div>
                    <div class="auto-ven">
                        <span>自动通风系统</span>
                        <Button @click="autoToggle" />
                    </div>
                </div>
                <div class="left-bottom">
                    <div ref="brokenChart" class="broken-chart"></div>
                </div>
            </div>
            <div class="middle">
                <div class="middle-top">
                    <div class="carousel-table">
                        <div class="carousel-table-header">
                            <div v-for="(header, index) in headers" :key="index" class="header-item">{{ header }}</div>
                        </div>
                        <div class="carousel-table-body" ref="scrollContainer">
                            <div v-for="(row, index) in displayedData" :key="index" class="row">
                                <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell">{{ cell }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="indoor-outdoor">
                        <GaugeChart />
                    </div>
                </div>
                <div class="middle-center">
                   
                </div>
                <div class="middle-bottom">
                    <PowerConsumptionChart />
                </div>
            </div>
            <div class="right">
                <div class="right-top">
                    <PowerDisplay />
                </div>
                <div class="right-center">
                    <SolarPowerChart />
                </div>
                <div class="right-bottom"></div>
            </div>
            <div class="right">
                <Minlin/>
                <Circle/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from "./Button.vue"
import GaugeChart from './GaugeChart.vue'

import PowerConsumptionChart from "./PowerConsumptionChart.vue"
import PowerDisplay from "./PowerDisplay.vue"
import SolarPowerChart from "./SolarPowerChart.vue"
import { onMounted, computed, ref, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import Minlin from './minlin.vue';

const scrollContainer = ref<HTMLElement | null>(null)
const scrollSpeed = 1 // Pixels per frame
let animationFrameId: number
const airIsOn = ref(false); // 空调开关状态  
const windSpeed = ref(3);
const temperature = ref(26);
const eleIsOn = ref(false);
const autoIsOn = ref(false);

const airToggle = () => {
    airIsOn.value = !airIsOn.value;
};

const increaseWind = () => {
    windSpeed.value++;
};
const decreaseWind = () => {
    if (windSpeed.value > 0) windSpeed.value--;
};

const increaseTemp = () => {
    temperature.value++;
};
const decreaseTemp = () => {
    temperature.value--;
};

const isCold = ref(true); // 默认为冷状态

const toggleSwitch = () => {
    isCold.value = !isCold.value; // 切换冷暖状态
};

const eleToggle = () => {
    eleIsOn.value = !eleIsOn.value;
};

const autoToggle = () => {
    autoIsOn.value = !autoIsOn.value;
}

const brokenChart = ref<HTMLDivElement | null>(null);

const headers = ref([
    "房间号",
    "温度",
    "湿度",
    "空调：开关，风速，温度，冷热",
    "电暖气开关",
    "传感器是否正常工作"
]);
const carData = ref([
    ["1", "17℃", "50%", "on 1m/s 26℃ 热", "off", "是"],
    ["2", "17℃", "50%", "on 1m/s 26℃ 热", "off", "是"],
    ["3", "17℃", "50%", "on 1m/s 26℃ 热", "off", "是"],
    ["4", "17℃", "50%", "on 1m/s 26℃ 热", "off", "是"],
    ["5", "17℃", "50%", "on 1m/s 26℃ 热", "off", "是"],
    ["6", "17℃", "50%", "on 1m/s 26℃ 热", "off", "是"],
]);

const displayedData = computed(() => {
    return [...carData.value, ...carData.value]
});
// 自动滚动逻辑
const scroll = () => {

    if (scrollContainer.value) {
        // 每次滚动增加 scrollSpeed 像素
        scrollContainer.value.scrollTop += scrollSpeed
        // console.log(scrollContainer.value.scrollTop)
        // 当滚动到复制的数据部分（即原始数据的长度）时，重置到顶部
        // scrollHeight / 2 表示原始数据的总高度
        if (scrollContainer.value.scrollTop >= scrollContainer.value.scrollHeight / 2) {
            scrollContainer.value.scrollTop = 0
        }
    }
    // 持续请求动画帧，实现平滑滚动
    animationFrameId = requestAnimationFrame(scroll)
}



onMounted(() => {
    if (brokenChart.value) {
        const myChart = echarts.init(brokenChart.value);

        const option = {
            title: {
                text: '温湿度折线图',
                left: 'left',
                textStyle: {
                    color: '#fff', // 文字颜色
                    fontSize: '1.3rem', // 字体大小
                    fontWeight: 400 // 字体粗细
                },
                padding: [1, 0, 0, 0], // 上、右、下、左间距
            },
            tooltip: {
                trigger: 'axis',
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
                axisLabel: {
                    color: '#fff', // 坐标轴标签颜色
                },
                axisLine: {
                    show: true, // 确保轴线显示
                    lineStyle: {
                        color: '#fff', // 设置轴线颜色为白色
                        width: 1, // 设置轴线宽度
                    },
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: '温度(°C)',
                    axisLabel: {
                        color: '#fff', // 坐标轴标签颜色
                        formatter: '{value} °C' // 添加温度单位
                    },
                    axisLine: {
                        show: true, // 确保轴线显示
                        lineStyle: {
                            color: '#fff', // 设置轴线颜色为白色
                            width: 1, // 设置轴线宽度
                        },
                    },
                    splitLine: {
                        show: false // 不显示分割线
                    }
                },
                {
                    type: 'value',
                    name: '湿度(%)',
                    axisLabel: {
                        color: '#fff', // 坐标轴标签颜色
                        formatter: '{value} %' // 添加湿度单位
                    },
                    axisLine: {
                        show: true, // 确保轴线显示
                        lineStyle: {
                            color: '#fff', // 设置轴线颜色为白色
                            width: 1, // 设置轴线宽度
                        },
                    },
                    splitLine: {
                        show: false // 显示Y轴的网格线
                    }
                }
            ],
            series: [
                {
                    name: '温度',
                    type: 'line',
                    data: [40, 45, 50, 55, 60, 65, 70],
                    lineStyle: {
                        color: '#ff0', // 线条颜色
                    },
                    symbol: 'circle', // 数据点形状
                    symbolSize: 5, // 数据点大小
                    yAxisIndex: 0
                },
                {
                    name: '湿度',
                    type: 'line',
                    data: [20, 22, 24, 26, 28, 30, 32],
                    lineStyle: {
                        color: '#00f', // 线条颜色
                    },
                    symbol: 'circle', // 数据点形状
                    symbolSize: 5, // 数据点大小
                    yAxisIndex: 1,
                },
            ],
        };

        myChart.setOption(option);
    }
    animationFrameId = requestAnimationFrame(scroll)

});
// 组件卸载时取消动画
onUnmounted(() => {
    cancelAnimationFrame(animationFrameId)
})
</script>

<style scoped lang="scss">
.dashboard-container {
    width: 100%;
    height: 100vh;
    padding: 20px 20px 0 20px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    background-color: #090f27;

    .title {
        color: #ffffff;
        text-align: center;
        font-size: 2rem;
        font-weight: 600;
        padding-bottom: 5px;
        width: 100%;
        height: 8%;
    }

    .underline {
        text-decoration: none;
        display: inline-block;
        /* 使容器可以使用伪元素 */
        position: relative;
        /* 用于定位伪元素 */
        border-bottom: 2px solid transparent;
        /* 初始时底部边框透明 */
    }

    .underline::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 30%;
        width: 0;
        /* 初始宽度为0 */
        height: 2px;
        /* 边框高度 */
        background-color: #01aae2;
        /* 边框颜色 */
        animation: slideLine 4s linear forwards;
        /* 动画效果 */
    }

    @keyframes slideLine {
        0% {
            width: 0;
        }

        100% {
            width: 40%;
        }
    }

    .main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 92%;
        padding: 20px 20px 0 20px;

        .left,
        .right {
            flex: 1;
            width: 100%;
            height: 100%;
            text-align: center;
        }

        .middle {
            flex: 2.5;
            width: 100%;
            height: 100%;
            text-align: center;
        }

        .left {
            color: #ffffff;
            font-size: 1.3rem;
            font-weight: 400;

            .left-top {
                width: 100%;
                height: 25%;
                padding: 5%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                .air-con {
                    display: flex;
                    align-items: center;

                    span {
                        margin-right: 20px;
                    }



                }

                .control-group {
                    display: flex;
                    align-items: center;

                    span {
                        margin-right: 20px;
                    }

                    .btn-group {
                        display: flex;

                        .btn {
                            border: none;
                            background: #fff;
                            color: #111;
                            width: 30px;
                            height: 30px;
                            margin-left: 7px;
                            border-radius: 4px;
                            line-height: 30px;
                            cursor: pointer;
                            font-weight: bold;
                        }
                    }
                }
            }

            .left-center {
                width: 100%;
                height: 35%;
                padding: 5%;


                .cold-warm {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 100%;
                    height: 50%;

                    .cold-warm-con {
                        display: flex;
                        align-items: center;


                    }
                }

                .ele-heater {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 25%;

                    span {
                        margin-right: 20px;
                    }



                }

                .auto-ven {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 25%;

                    span {
                        margin-right: 20px;
                    }



                }
            }

            .left-bottom {
                width: 100%;
                height: 40%;
                align-items: center;

                .broken-chart {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .middle {
            .middle-top {
                width: 100%;
                height: 25%;
                display: flex;

                .carousel-table {
                    width: 60%;
                    height: 100%;
                    margin: 0 auto;
                    background-color: #0e1a2b;
                    overflow: hidden;
                    position: relative;

                    .carousel-table-header {
                        display: flex;
                        background-color: #123456;
                        color: #fff;
                        font-size: 0.7rem;
                        width: 100%;
                        height: 25%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                    }

                    .header-item {
                        flex: 1;
                        padding: 5px;
                        margin: 0;
                    }

                    .carousel-table-body {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        font-size: 0.7rem;
                        overflow-y: auto;
                        max-height: 170px;
                        scroll-behavior: smooth;
                    }

                    /* 隐藏滚动条以获得更干净的外观 */
                    .carousel-table-body::-webkit-scrollbar {
                        display: none;
                    }

                    .carousel-table-body {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }

                    .row {
                        min-height: 50px;
                        display: flex;
                        background-color: #234567;
                        color: #fff;
                        overflow: hidden;
                        align-items: center;
                        border-bottom: 1px solid #123456;

                        .cell {
                            flex: 1;
                            text-align: center;
                            overflow: hidden;
                        }
                    }

                }

                .indoor-outdoor {
                    width: 40%;
                    height: 100%;
                    background-color: #ffffff;
                    display: flex;
                }
            }

            .middle-center {
                width: 100%;
                height: 35%;

            }

           .middle-bottom {
             width: 100%;
             height: 40%;  
           }

        }

        .right {
            .right-top {
                width: 100%;
                height: 25%;
            }

            .right-center {
                width: 100%;
                height: 40%;
            }

            .right-bottom {
                width: 100%;
                height: 35%;
            }
        }
    }
}
</style>
