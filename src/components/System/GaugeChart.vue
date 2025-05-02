<template>
  <div class="gauge-chart-container">
    <div class="gauge-chart" v-for="(item, index) in gaugeData" :key="index">
      <div class="gauge-title">{{ item.title }}</div>
      <v-chart :options="item.option" autoresize />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VChart from 'vue-echarts';
import * as echarts from 'echarts';

export default defineComponent({
  components: {
    VChart
  },
  setup() {
    const gaugeData = ref([
      {
        title: '室内',
        option: {
          title: {
            text: '25°C',
            subtext: '温度',
            left: 'center',
            top: '30%',
            textStyle: {
              color: '#fff',
              fontSize: 20
            },
            subtextStyle: {
              color: '#fff',
              fontSize: 12
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
                width: 10
              },
              axisLine: {
                lineStyle: {
                  width: 10
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
                formatter: '{value}°C',
                color: '#fff',
                fontSize: 20,
                offsetCenter: [0, '70%']
              },
              data: [{ value: 25 }]
            }
          ]
        }
      },
      {
        title: '室外',
        option: {
          title: {
            text: '30°C',
            subtext: '温度',
            left: 'center',
            top: '30%',
            textStyle: {
              color: '#fff',
              fontSize: 20
            },
            subtextStyle: {
              color: '#fff',
              fontSize: 12
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
                width: 10
              },
              axisLine: {
                lineStyle: {
                  width: 10
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
                formatter: '{value}°C',
                color: '#fff',
                fontSize: 20,
                offsetCenter: [0, '70%']
              },
              data: [{ value: 30 }]
            }
          ]
        }
      }
    ]);

    return {
      gaugeData
    };
  }
});
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
  padding: 10px;
}

.gauge-title {
  color: #fff;
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px;
}
</style>