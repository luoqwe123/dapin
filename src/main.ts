import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore 
import zhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
import '@/styles/index.scss'
import '@/styles/font.scss'
import router from '@/router'

function setRem() {
    const baseWidth = 375; // 设计稿宽度
    const baseFontSize = 4; // 基础字体大小（px）
    const screenWidth = window.innerWidth; // 获取当前屏幕宽度
    
    // 计算新的 rem 值
    const rem = (screenWidth / baseWidth) * baseFontSize;
    document.documentElement.style.fontSize = rem + 'px'; // 设置根元素的字体大小
}

// 初次设置
setRem();

// 监听窗口大小变化
window.addEventListener('resize', setRem);

import pinia from './store'
createApp(App).use(ElementPlus,{ locale: zhCn }).use(globalComponent).use(router).use(pinia).mount('#app')
 