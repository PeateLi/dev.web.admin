/*
 * @Author:李平勇
 * @Date: 2020-02-15 18:00:44 
 * @desc:新增编辑任务cron组件
 */

<template>
    <div>
        <fieldset class="execute-fieldset">
            <legend>执行频率</legend>
            <el-tabs type="border-card">
                <el-tab-pane label="执行一次">执行一次</el-tab-pane>
                <el-tab-pane label="重复执行">
                    <div>

                            最小执行间隔单位：
                            <el-radio-group v-model="timeRadio">
                                <el-radio :label="1">秒</el-radio>
                                <el-radio :label="2">分钟</el-radio>
                                <el-radio :label="3">小时</el-radio>
                                <el-radio :label="4">日</el-radio>
                                <el-radio :label="5">周</el-radio>
                                <el-radio :label="6">月</el-radio>
                                <el-radio :label="7">年</el-radio>
                                </el-radio-group>

                                <p>
                                <el-radio-group v-model="timeRadio">
                                <el-radio style="margin-top:5px;" :label="8">从
                                    <el-input-number size="mini" v-model="firstNum"></el-input-number>
                                    第秒开始，每
                                     <el-input-number size="mini" v-model="lastNum"></el-input-number>
                                    秒执行一次</el-radio>
                                </el-radio-group>
                                </p>

                                <p>
                                    <el-radio-group  v-model="timeRadio">
                                        <el-radio :label="9">指定</el-radio>
                                    </el-radio-group>
                                </p>

                                <p>
                                    <el-checkbox-group v-model="checkList">
                                        <el-checkbox :disabled="isCheckDisabled" v-for="item in 59" :label="item" :key="item">{{ item | numFormat}}</el-checkbox>
                                    </el-checkbox-group>
                                </p>

                                <p style="margin-top:70px;">
                                   cron表达式： <el-input disabled style="width:80%;" v-model="cron"></el-input>
                                </p>
                                
                    </div>


                </el-tab-pane>
            </el-tabs>
        </fieldset>
    </div>
</template>

<script>
export default {
    data(){
        return {
            timeRadio:'',
            firstNum:'',
            lastNum:'',
            checkList:'',
            cron:'',
            isCheckDisabled:true
            
        }
    },
    filters:{
        numFormat(val){
            if(val<10){
                return '0'+val
            }else{
                return val
            }
        }
    },
    watch: {
        timeRadio(val){
            let _this = this
            if(val == 9){
                _this.isCheckDisabled = false
            }else{
                 _this.isCheckDisabled = true
            }
        }
    }
}
</script>


<style lang="less" scoped>
/deep/ .el-tabs--border-card{
    border: 0px;
    box-shadow: none;
    webkit-box-shadow:none;
}
/deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    color: #ebb563 !important;
    font-weight: bold;
}
/deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
 color: #ebb563 !important;
}
/deep/ .el-tabs__item.is-top{
    font-weight: bold;
}
/deep/ .el-radio.is-checked span{
    color: #ebb563;
    
}
/deep/ .el-radio__input.is-checked .el-radio__inner{
        border-color: #ebb563;
        background: #ebb563;
    }
    /deep/ .el-radio__inner:hover{
         border-color: #ebb563;
    }
</style>