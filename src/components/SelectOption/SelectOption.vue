/*
 * @Author:李平勇
 * @Date: 2020-02-14 15:02:41
 * @desc:下拉框选择器组件
 */
<template>
    <div>
            <el-select v-model="value" @change='ActiveOption' clearable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
    </div>
</template>

<script>
export default {
    data(){
        return {
            value: '选项5'
        }
    },
    props:{
        options:{
        }
    },
    methods:{
        ActiveOption(){
            let _this = this
            _this.$emit('GetActiveOption',_this.value)
        }
    }
}
</script>


<style lang="less" scoped>
.el-select-dropdown__item.selected{
  color: #ebb563 !important;
}
</style>