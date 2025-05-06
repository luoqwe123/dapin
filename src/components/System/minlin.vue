<template>
    <div class="Minlin-container">
        <div class="title" style="color: white;background-color: #073a5d;font-size: 1.2rem;">{{ title }}</div>
        <div class="minlin-data">
            <div class="tabel" v-for="(item, index) in data" :key="index"
                :style="{ backgroundColor: index % 2 === 0 ? '#09162a' : '#061c33', color: 'white', textAlign: 'left' }">
                {{ item }}
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>

let title = "命令流"
let data = [
    '空调工作数0/6', '电暖气工作数0/6', '温度报警', '监控报警','命令','命令1','命令2','命令3'
]


</script>

<style lang="scss" scoped>
.Minlin-container {
    width: 100%;
    height: 100%;
    
   
    .title {
        height: 18%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    .minlin-data {
        height: 82%;
        display: flex;
        flex-direction: column;
        
        .tabel {
            flex: 1;
            display: flex;
            align-items: center;
            font-size: 0.7rem;
            padding: 0 3%;
        }
    }

}
</style>