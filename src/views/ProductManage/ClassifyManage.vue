<template>
    <div>
         <classify-table></classify-table>
    </div>
</template>


<script>
export default {
    data(){
        return {

        }
    },
    components:{
         ClassifyTable:() => import("./components/Classify/ClassifyTable"),//分类数据表格
    }
}
</script>

<style lang="less" scoped>

</style>