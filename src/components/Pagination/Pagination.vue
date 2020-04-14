/*
 * @Author:李平勇
 * @Date: 2020-02-14 15:00:32
 * @desc:分页组件
 */
<template>
    <div>
         <el-pagination
        :current-page="nowPage"
        :page-size="ShowList"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
        background
        :hide-on-single-page='isHidePage'
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-sizes="showPageSizeArr">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props:{
        total:{
            type:Number,
            default : 0
        },
        ShowList:{
            type:Number,
            default : 10
        },
        nowPage:{
             type:Number,
            default : 1
        },
        showPageSizeArr:{
            type:Array,
            default:() => {
                return [5,10,15,20,25]
            }
                
        }
    },
    data(){
        return {
            isHidePage:true
        }
    },
    methods:{
        handleCurrentChange(val){
            let _this = this
            _this.$emit('getChangePage',val)
        },
        handleSizeChange(val){
             let _this = this
             _this.$emit('getChangeSize',val)
        }
    }
}
</script>

<style lang="less" scoped>
/*设置当前页码的样式，及鼠标移上其他页码时的样式,以及左右箭头鼠标移上的样式*/
/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #EBB563 !important;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover{
  color:#EBB563  !important;
}
/deep/ .el-pagination.is-background .el-pager .number.active:not(.disabled):hover{
  color:#fff  !important;
}
/deep/ .el-pagination__sizes .el-input .el-input__inner:hover{
    border-color: #EBB563  !important;
}
/deeo/ .el-select-dropdown__item.selected span{
    color:#EBB563  !important;
}
@media (max-width: 768px) { 
    /deep/ .el-pagination__total{
        display: none !important;
    }
    /deep/ .el-pagination__sizes{
        display: none !important;
    }
    /deep/ .el-pagination__jump{
        display: block !important;
    text-align: left !important;
    margin-top: 10px !important;
    }
}
</style>