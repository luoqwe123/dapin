
<template>
    <div class="scroll-list">
        <!-- 表头部分 -->
        <div class="scroll-list-header">
            <div v-for="(header, index) in headers" :key="index" class="header-item">
                {{ header }}
            </div>
        </div>
        <!-- 列表主体 -->
        <div ref="ListRef" class="scroll-list-body">
            <div v-for="(row, index) in listData" :key="index" class="row">
                <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell">
                    {{ cell }}
                </div>
            </div>
        </div>
    </div>
</template>



<script setup lang="ts">

import { onMounted, ref ,onUnmounted} from 'vue';

const props = defineProps<{
    headers:string[],
    data: Object[],
}>();
let animationFrameId: number
const listData = ref([...props.data,...props.data]) 
const ListRef = ref<HTMLElement|null>(null);
const scrollSpeed = 0.5;
let doSpeed = 0;
const scrool = ()=>{
    if(!ListRef.value) return;
    console.log(111)
    const containerHeight = ListRef.value.scrollHeight;
    // const contentHeight = ListRef.value.clientHeight;
    const scrollTop = ListRef.value.scrollTop;
    doSpeed = doSpeed+scrollSpeed
    console.log(doSpeed)
    if(doSpeed>=1){
        ListRef.value.scrollTop += Math.floor(doSpeed)
        doSpeed = 0
    }
    
    // return
    if(scrollTop >= Math.floor(containerHeight/2) ){
        requestAnimationFrame(()=>{
            ListRef.value!.scrollTop = 0
        })
    }
    animationFrameId = requestAnimationFrame(scrool)
}


onMounted(()=>{
    scrool()
})
onUnmounted(() => {
    cancelAnimationFrame(animationFrameId)
})
</script>


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