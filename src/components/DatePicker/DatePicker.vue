/*
 * @Author:李平勇
 * @Date: 2020-02-14 15:05:37
 * @desc:日期选择器组件
 */

<template>
    <div>
        <el-date-picker
        v-model="timeValue"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="chooseTimeRange">
        </el-date-picker>
    </div>
</template>

<script>
export default {
    data(){
        return {
            timeValue:'',
          pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
 
        }
    },
    methods:{
        chooseTimeRange(val){
            let _this = this
            _this.$emit('GetChooseTimeRange',val)

        }
    }
}
</script>

<style lang='less' scoped>

</style>