<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

// 定义表格行的接口，允许动态键值对


// 定义组件的 props
const props = defineProps<{
    headers: string[] // 表头数组
    data: string[][] // 数据数组
}>()

// 引用滚动容器
const scrollContainer = ref<HTMLElement | null>(null)
// 滚动速度（每帧像素）
const scrollSpeed = 0.4 // 始终向下滚动
// 动画帧 ID
let animationFrameId: number
// 可视区域行数（默认显示4行）
const visibleRows = 4
// 触发数据扩展的阈值（接近底部时）
const thresholdToExtend = 100 // 距离底部 100px 时触发扩展

// 使用 ref 管理动态数据
const dynamicData = ref<string[][]>([...props.data])

// 动态计算行高（基于容器高度和可见行数）
const rowHeight = computed(() => {
    if (scrollContainer.value) {
        const containerHeight = scrollContainer.value.clientHeight
        return containerHeight / visibleRows
    }
    return 50 // 默认值，防止初次渲染出错
})

// 改进的滚动函数
const scroll = () => {
    if (!scrollContainer.value) return

    // 1. 批量读取布局属性
    const currentScrollTop = scrollContainer.value.scrollTop
    const containerHeight = scrollContainer.value.clientHeight
    const contentHeight = scrollContainer.value.scrollHeight

    // 2. 应用滚动
    scrollContainer.value.scrollTop = currentScrollTop + scrollSpeed
    console.log(scrollContainer.value.scrollTop)
    // 3. 数据扩展与清理（批处理）
    if (contentHeight - (currentScrollTop + containerHeight) < thresholdToExtend) {
        const newData = [...dynamicData.value, ...props.data]
        const firstVisibleRow = Math.floor(currentScrollTop / rowHeight.value)

        // 计算需要保留的行数（至少保留2屏数据）
        const rowsToKeep = Math.max(
            Math.ceil(containerHeight / rowHeight.value) * 2,
            newData.length - firstVisibleRow
        )

        // 单次更新数据
        dynamicData.value = newData.slice(-rowsToKeep)

        // 精确补偿滚动位置
        requestAnimationFrame(() => {
            scrollContainer.value!.scrollTop = currentScrollTop -
                ((newData.length - dynamicData.value.length) * rowHeight.value)
        })
    }

    // 4. 继续滚动（限制帧率）
    animationFrameId = requestAnimationFrame(scroll)
}

onMounted(() => {
    if (scrollContainer.value) {
        // 初始填充足够的数据
        // while (scrollContainer.value.scrollHeight < scrollContainer.value.clientHeight * 2) {
        //     dynamicData.value.push(...props.data)
        // }
        // console.log(111)
        dynamicData.value.push(...props.data)
        requestAnimationFrame(scroll)
    }
})

onUnmounted(() => {
    cancelAnimationFrame(animationFrameId)
})
</script>

<template>
    <div class="scroll-list">
        <!-- 表头部分 -->
        <div class="scroll-list-header">
            <div v-for="(header, index) in headers" :key="index" class="header-item">
                {{ header }}
            </div>
        </div>
        <!-- 列表主体 -->
        <div ref="scrollContainer" class="scroll-list-body">
            <div v-for="(row, index) in dynamicData" :key="index" class="row">
                <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell">
                    {{ cell }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.scroll-list {
    width: 100%;
    /* 视口宽度的80% */
    height: 100%;
    /* 视口高度的50% */
    position: relative;
}

.scroll-list-header {
    display: flex;
    width: 100%;
    height: 25%;
    background-color: #123456;
    // font-weight: bold;
    color: #fff;
    font-size: 0.7rem;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    // position: sticky;
    // top: 0;
    // z-index: 1;
}

.header-item {
    flex: 1;
    padding: 2%;
    margin: 0;
    
}

.scroll-list-body {
    width: 100%;
    height: 75%;
    /* 占剩余高度 */
    overflow-y: hidden;
    position: relative;
}

.row {
    display: flex;
    width: 100%;
    height: calc(100% / 4);
    /* 动态均分高度，显示4行 */
    border-bottom: 1px solid #123456;
    box-sizing: border-box;
    background-color: #234567;
    color: #fff;
    overflow: hidden;
    align-items: center;
}

.cell {
    flex: 1;
    // height: 100%;
    // padding: 2%;
    text-align: center;
    overflow: hidden;
    font-size: 0.7rem;
}
</style>