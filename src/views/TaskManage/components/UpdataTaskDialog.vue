/*
 * @Author:李平勇
 * @Date: 2020-02-15 19:12:36 
 * @desc:修改任务弹窗组件
 */

<template>
  <div>
    <el-dialog title="编辑任务" :visible.sync="isUpTask" width="30%" :before-close="hideUpDialog">
      <fieldset class="task-fieldset">
        <legend>任务</legend>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="服务器">
            <el-input v-model="ruleForm.ip" placeholder="请选择服务器"></el-input>
          </el-form-item>
          <el-form-item label="Job文件夹">
            <el-input v-model="ruleForm.job" placeholder="请选择文件夹"></el-input>
          </el-form-item>
          <el-form-item label="DLL或EXE" prop="dllExe">
            <el-input v-model="ruleForm.dllExe" placeholder="DLL或EXE"></el-input>
          </el-form-item>
          <el-form-item label="Class名称" prop="class">
            <el-input v-model="ruleForm.class" placeholder="请选择class"></el-input>
          </el-form-item>
          <el-form-item label="函数名称">
            <el-input v-model="ruleForm.fun" placeholder="请选择fun"></el-input>
          </el-form-item>
          <el-form-item label="分组" style="width:50%;float:left;">
            <task-group-select-option :value='upTaskData.jobGroup'  @GetActiveOption='GetActiveOption'></task-group-select-option>
          </el-form-item>
          <el-form-item label="名称" style="width:50%;float:left;">
            <el-input v-model="ruleForm.jobName"></el-input>
          </el-form-item>
          <el-form-item label="描述" style="clear: both;">
            <el-input v-model="ruleForm.describe"></el-input>
          </el-form-item>
        </el-form>
      </fieldset>
      <fieldset class="execute-fieldset">
        <legend>执行频率</legend>
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane name="first" label="执行一次">执行一次</el-tab-pane>
          <el-tab-pane name="sencend" label="重复执行">
            <el-popover v-model="cronPopover">
              <cron @change="changeCron" @close="cronPopover=false"></cron>
              <el-input slot="reference" @click="cronPopover=true" v-model="cron" placeholder="请输入定时策略"></el-input>
            </el-popover>
          </el-tab-pane>
        </el-tabs>
      </fieldset>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideUpDialog">关 闭</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
 import TaskGroupSelectOption from './TaskGroupSelectOption'
 import {cron} from 'vue-cron';
 import axios from 'axios'
export default {
  components: {
    cron,
    TaskGroupSelectOption
  },
  data() {
    return {
      ruleForm: {
        server: "",
        job: "",
        dllExe: "",
        class: "",
        fun: "",
        group: "",
        jobName: "",
        describe: ""
      },
      rules: {
        dllExe: [
          { required: true, message: "请输入DLL或者EXE", trigger: "blur" }
        ],
        class: [
          { required: true, message: "请输入Class名称", trigger: "blur" }
        ]
      },
      cronPopover:false,
      cron:'',
      activeTab:'sencend',
    };
  },
  props: {
    isUpTask: {  //控制 弹窗显示隐藏
      type: Boolean,
      default: false
    },
    upTaskData:{
       type: Object,
      default: {}
    }
  },
  methods: {
    hideUpDialog() {
      let _this = this;
      _this.$emit("hideUpDialog", false);
    },
    submitForm(formName) {   //提交
    let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
         axios.post('/Utmel/Scheduler/EditJobCron',{
          JobId:_this.upTaskData.jobId, //主键Id
          JobName:_this.ruleForm.jobName, //任务名
          JobGroup:_this.ruleForm.group, //任务分组
          Cron:_this.cron, //(Cron表达式)
          Remark:_this.ruleForm.describe, //描述
          IntervalSecond:1, //执行时间间隔
         }).then((res) => {
          if(res.data.code == 1000){
              _this.$message({
                  type:'success',
                  message:'编辑成功'
                })
              _this.$emit("hideUpDialog", false,_this.ruleForm,_this.cron);
          }else{
             _this.$message({
                  type:'warning',
                  message:'编辑失败'
                })
          }
         }).catch((error) =>{
            _this.$message({
                type:"error",
                message:'请求出错'+error
              })
         })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {  //取消
      this.$refs[formName].resetFields();
    },
    changeCron(val){
         this.cron = val
    },
    GetActiveOption(val){
      let _this = this
      _this.ruleForm.group =  val
    }
  },
  filters: {
   
  },
  watch: {
    isUpTask(val){
      let _this = this
     if(val == true){
       if(_this.upTaskData.cron == '执行单次'){
          _this.activeTab = 'first'
       }else{
         _this.activeTab = 'sencend'
         _this.cron = _this.upTaskData.cron
       }
       _this.ruleForm = {
          server: "",
          job: "",
          dllExe: _this.upTaskData.assemblyName,
          class:_this.upTaskData.className,
          fun: "",
          group: _this.upTaskData.jobGroup,
          jobName:_this.upTaskData. jobName,
          describe:_this.upTaskData.remark
       }
     }
    }
  },
  mounted(){
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-button--primary {
  background-color: #ebb563;
  border-color: #ebb563;
}
.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #ebb563 !important;
  color: white !important;
  border-color: #ebb563 !important;
}
/deep/ .el-button:focus,
.el-button:hover {
  background-color: #fff;
  border-color: #ccc;
  color: #606266;
}
/deep/ .el-dialog__title {
  font-size: 15px;
  font-weight: bold;
}
.task-fieldset {
  padding-left: 10px;
  padding-right: 40px;
}
/deep/ .el-dialog {
  margin-top: 5vh !important;
}
/deep/ .el-tabs--border-card {
  border: 0px;
  box-shadow: none;
  webkit-box-shadow: none;
}
/deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #ebb563 !important;
  font-weight: bold;
}
/deep/
  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item:not(.is-disabled):hover {
  color: #ebb563 !important;
}
/deep/ .el-tabs__item.is-top {
  font-weight: bold;
}
/deep/ .el-radio.is-checked span {
  color: #ebb563;
}
/deep/ .el-radio__input.is-checked .el-radio__inner {
  border-color: #ebb563;
  background: #ebb563;
}
/deep/ .el-radio__inner:hover {
  border-color: #ebb563;
}
@media (max-width: 768px) {  
  /deep/ .el-dialog{
    width: 90%  !important;
  }
  /deep/ .el-form-item.el-form-item--medium{
    clear: both;
    width: 100% !important;
    margin-bottom: 5px;
  }
}
</style>