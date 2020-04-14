/*
 * @Author:李平勇
 * @Date: 2020-02-14 15:02:41
 * @desc:任务下拉下拉框选择器组件
 */
<template>
    <div>
            <el-select v-model="selectVal" @change='ActiveOption' clearable placeholder="请选择任务分组">
                <el-option
                v-for="item in GroupList"
                :key="item.jobGroupId"
                :label="item.jobGroupName"
                :value="item.jobGroupId">
                </el-option>
            </el-select>
    </div>
</template>

<script>
import {TaskGroupList} from '../../../api/TaskManage'

export default {
    data(){
        return {
            GroupList:[],
            selectVal:this.value
        }
    },
    props:{
            value:{
                type:String,
                default:''
            }
    },
    methods:{
        ActiveOption(){
            let _this = this
            _this.$emit('GetActiveOption',_this.selectVal)
        },
        GetTaskGroup(){
                let _this = this
                TaskGroupList(
                {page:1,limit:10}
                )
                .then((res) => {
                    _this.GroupList = res.data
                }).catch((error) => {
                     _this.$message({
                            type:"error",
                            message:'请求出错'+error
                    })
                })
        }
    },
    mounted(){
        let _this = this
        _this.GetTaskGroup()
    }
}
</script>


<style lang="less" scoped>
.el-select-dropdown__item.selected{
  color: #ebb563 !important;
}
</style>