<template>
  <div class="row" @click.prevent="toggle">
    <div class="btn-switch" >
      <input type="checkbox" :id="name" v-model="isChecked" >
      <label :for="name" >
        <span></span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
const uniqueId  = ref()
// 定义 props

const props = withDefaults(
  defineProps<{
    key: string
    name:string
  }>(),
  {
    key: '1',
    name:'aa'

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

onMounted(()=>{
  uniqueId.value = `switch-${props.name}`
})
</script>

<style scoped lang="scss">
.btn-switch *,
.btn-switch *:before,
.btn-switch *:after {
  box-sizing: border-box;
}

.btn-switch {
  display: inline-block;
  position: relative;
  line-height: 25px;
  height: 28px;
  width: 84px;
  border-radius: 12.5px;
  background: linear-gradient(WhiteSmoke, DarkGray);
  box-shadow: 0 0 2.5px rgba(0, 0, 0, 0.4),
    0.5px 0.5px 4px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
}

.btn-switch input {
  display: none;
}

.btn-switch label {
  position: absolute;
  top: 3px;
  left: 5px;
  width: 75px;
  height: 22px;
  line-height: 22px;
  border-radius: 10px;
  background: darkGray;
  box-shadow: inset 0 1.5px 4px 0.5px rgba(0, 0, 0, 0.4),
    0 0.5px 0 0 rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.btn-switch span::before {
  content: ' ';
  position: absolute;
  width: 45px;
  height: 23px;
  background: linear-gradient(#F7F2F6, #B2AC9E);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3), 0 2.5px 2.5px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  left: -1px;
  top: -0.5px;
  transition: left 0.3s ease;
}

.btn-switch span::after {
  content: ' ';
  position: absolute;
  width: 33px;
  height: 12px;
  left: 5px;
  top: 5px;
  border-radius: 6px;
  background: linear-gradient(#CBC7BC, #D2CBC3);
  transition: left 0.3s ease;
}

.btn-switch label::before {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 0 -0.5px 0 rgba(0, 0, 0, 0.7),
    0 0.5px 0 rgba(255, 255, 255, 0.8);
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
  right: -1px;
  left: auto;
}

.btn-switch input:checked+label span::after {
  right: 5px;
  left: auto;
}

.btn-switch input:checked+label::before {
  content: 'on';
  color: rgba(46, 139, 87, 0.8);
  right: auto;
  left: 5%;
}
</style>