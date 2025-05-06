<template>
  <div class="btn-container" @click.prevent="toggle">
    <div class="btn-switch">
      <input type="checkbox" :id="name" v-model="isChecked">
      <label :for="name">
        <span></span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
const uniqueId = ref()
// 定义 props

const props = withDefaults(
  defineProps<{
    key: string
    name: string
  }>(),
  {
    key: '1',
    name: 'aa'
  }
)

// 定义响应式状态管理开关
const isChecked = ref(false)

// 切换事件，触发父组件的点击事件
const emit = defineEmits(['click'])
const toggle = () => {
  isChecked.value = !isChecked.value
  emit('click', isChecked.value)
}

onMounted(() => {
  uniqueId.value = `switch-${props.name}`
})
</script>

<style scoped lang="scss">
.btn-container {
  /* 容器无需固定尺寸，依赖内部元素 */
}

.btn-switch *,
.btn-switch *:before,
.btn-switch *:after {
  box-sizing: border-box;
}

.btn-switch {
  display: inline-block;
  position: relative;
  line-height: 2.315vh; /* 25px / 1080 ≈ 2.315vh */
  height: 2.593vh; /* 28px / 1080 ≈ 2.593vh */
  width: 4.375vw; /* 84px / 1920 ≈ 4.375vw */
  border-radius: 0.651vw; /* 12.5px / 1920 ≈ 0.651vw */
  background: linear-gradient(WhiteSmoke, DarkGray);
  box-shadow: 0 0 0.130vw rgba(0, 0, 0, 0.4), /* 2.5px / 1920 ≈ 0.130vw */
    0.026vw 0.026vw 0.208vw rgba(0, 0, 0, 0.3); /* 0.5px / 1920 ≈ 0.026vw, 4px / 1920 ≈ 0.208vw */
  margin: 0 auto;
}

.btn-switch input {
  display: none;
}

.btn-switch label {
  position: absolute;
  top: 0.278vh; /* 3px / 1080 ≈ 0.278vh */
  left: 0.260vw; /* 5px / 1920 ≈ 0.260vw */
  width: 3.906vw; /* 75px / 1920 ≈ 3.906vw */
  height: 2.037vh; /* 22px / 1080 ≈ 2.037vh */
  line-height: 2.037vh; /* 22px / 1080 ≈ 2.037vh */
  border-radius: 0.521vw; /* 10px / 1920 ≈ 0.521vw */
  background: red;
  box-shadow: inset 0 0.139vh 0.370vh 0.046vh rgba(0, 0, 0, 0.4), /* 1.5px / 1080 ≈ 0.139vh, 4px / 1080 ≈ 0.370vh, 0.5px / 1080 ≈ 0.046vh */
    0 0.046vh 0 0 rgba(255, 255, 255, 0.5); /* 0.5px / 1080 ≈ 0.046vh */
  cursor: pointer;
}

.btn-switch span::before {
  content: ' ';
  position: absolute;
  width: 2.344vw; /* 45px / 1920 ≈ 2.344vw */
  height: 2.130vh; /* 23px / 1080 ≈ 2.130vh */
  background: linear-gradient(#F7F2F6, #B2AC9E);
  box-shadow: 0 0 0.208vw rgba(0, 0, 0, 0.3), /* 4px / 1920 ≈ 0.208vw */
    0 0.231vh 0.231vh rgba(0, 0, 0, 0.2); /* 2.5px / 1080 ≈ 0.231vh */
  border-radius: 0.625vw; /* 12px / 1920 ≈ 0.625vw */
  left: -0.052vw; /* -1px / 1920 ≈ -0.052vw */
  top: -0.046vh; /* -0.5px / 1080 ≈ -0.046vh */
  transition: left 0.3s ease;
}

.btn-switch span::after {
  content: ' ';
  position: absolute;
  width: 1.719vw; /* 33px / 1920 ≈ 1.719vw */
  height: 1.111vh; /* 12px / 1080 ≈ 1.111vh */
  left: 0.260vw; /* 5px / 1920 ≈ 0.260vw */
  top: 0.463vh; /* 5px / 1080 ≈ 0.463vh */
  border-radius: 0.313vw; /* 6px / 1920 ≈ 0.313vw */
  background: linear-gradient(#CBC7BC, #D2CBC3);
  transition: left 0.3s ease;
}

.btn-switch label::before {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 0.573vw; /* 11px / 1920 ≈ 0.573vw */
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 0 -0.046vh 0 rgba(0, 0, 0, 0.7), /* -0.5px / 1080 ≈ -0.046vh */
    0 0.046vh 0 rgba(255, 255, 255, 0.8); /* 0.5px / 1080 ≈ 0.046vh */
  position: absolute;
  content: 'off';
  color: dimgrey;
  left: auto;
  right: 5%;
  transition: left 0.3s ease, right 0.3s ease;
}

.btn-switch input:checked+label {
  background: rgba(144, 238, 144, 0.8);
}

.btn-switch input:checked+label span::before {
  right: -0.052vw; /* -1px / 1920 ≈ -0.052vw */
  left: auto;
}

.btn-switch input:checked+label span::after {
  right: 0.260vw; /* 5px / 1920 ≈ 0.260vw */
  left: auto;
}

.btn-switch input:checked+label::before {
  content: 'on';
  color: rgba(46, 139, 87, 0.8);
  right: auto;
  left: 5%;
}
</style>