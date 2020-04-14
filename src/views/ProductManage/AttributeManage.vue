<template>
    <div>
        <attribute-table></attribute-table>
    </div>
</template>


<script>
export default {
    data(){
        return {

        }
    },
    components:{
         AttributeTable:() => import("./components/Attribute/AttributeTable"),//属性数据表格
    }
}
</script>


<style lang="less" scoped>

</style>