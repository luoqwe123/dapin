<template>
    <div class="Minlin-container">
        <div class="title" style="color: white;background-color: #073a5d;">{{ title }}</div>
        <div class="tabel" v-for="(item,index) in data" :key="index" :style="{backgroundColor:index%2===0?'#09162a':'#061c33',color:'white',textAlign:'left'}">

            {{ item }}
        </div>
    </div>
</template>

<script setup lang='ts'>

let title = "命令流"
let data = [
    '空调工作数0/6','电暖气工作数0/6','温度报警','监控报警'
]


</script>

<style lang="scss" scoped>

</style>