<template>
    <div>
        <brand-table></brand-table>
    </div>
</template>


<script>
export default {
    data(){
        return {

        }
    },
    components:{
         BrandTable:() => import("./components/Brand/BrandTable"),//品牌数据表格
    }
}
</script>


<style lang="less" scoped>

</style>