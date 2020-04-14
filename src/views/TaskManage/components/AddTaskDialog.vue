/*
 * @Author:李平勇
 * @Date: 2020-02-15 15:29:11
 * @desc:新增任务弹窗组件
 */
<template>
  <div>
    <el-dialog title="新增任务" :visible.sync="isAddTask" width="30%" :before-close="hideAddDialog">
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
            <el-input v-model="ruleForm.server" placeholder="请选择服务器"></el-input>
          </el-form-item>
           <el-form-item label="是否新增脚本">
               <el-radio-group v-model="ruleForm.radio" @change="HideParmeater()">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
               </el-radio-group>
          </el-form-item>
          <el-form-item label="Job文件夹">
             <el-select :disabled="selectBool"  @focus='GetJobFileList()' v-model="ruleForm.fileName" placeholder="请选择DLL或EXE">
                <el-option
                v-for="item in fileOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
               </el-select>
          </el-form-item>
          <el-form-item label="DLL或EXE" prop="dllExe">
            <el-select :disabled="selectBool" @focus='GetDllList()' v-model="ruleForm.dllExe" placeholder="请选择DLL或EXE">
              <el-option
                v-for="item in dllOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Class名称" prop="class">
             <el-select :disabled="selectBool" @focus='GetClassList()' v-model="ruleForm.class" placeholder="请选择class">
              <el-option
                v-for="item in classOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="函数名称">
            <el-select :disabled="selectBool" @focus='GetFunList()' v-model="ruleForm.fun" placeholder="请选择fun">
              <el-option
                v-for="item in funOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分组"  style="width:50%;float:left;">
            <el-input v-model="ruleForm.group" placeholder="请输入分组"></el-input>
          </el-form-item>
          <el-form-item label="名称" style="width:50%;float:left;">
            <el-input v-model="ruleForm.jobName "></el-input>
          </el-form-item>
          <el-form-item label="描述" style="clear: both;">
            <el-input v-model="ruleForm.describe"></el-input>
          </el-form-item>
          <el-form-item v-if="ruleForm.radio == 1"  label="Python路径" style="clear: both;">
            <el-input v-model="ruleForm.path"></el-input>
          </el-form-item>
          <el-form-item v-if="ruleForm.radio == 1" label="Python命令" style="clear: both;">
            <el-input v-model="ruleForm.order"></el-input>
          </el-form-item>
          <el-form-item
            v-for="(domain, index) in ruleForm.parameter"
            label="参数"
            :key="domain.key"
          >
            <el-input style="width:80%;margin-right:15px;" v-model="domain.value" @input="AddInput(domain)"></el-input><el-button style="margin-top:10px;" :disabled="ruleForm.parameter.length== 1" @click.prevent="removeDomain(domain)">删除</el-button>
          </el-form-item>
        </el-form>
      </fieldset>
      <fieldset class="execute-fieldset">
        <legend>执行频率</legend>
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane label="执行一次" name='first'>执行一次</el-tab-pane>
          <el-tab-pane label="重复执行" name='second'>
            <el-popover v-model="cronPopover">
              <cron @change="changeCron" @close="cronPopover=false"></cron>
              <el-input slot="reference" @click="cronPopover=true" v-model="cron" placeholder="请输入定时策略"></el-input>
            </el-popover>
          </el-tab-pane>
        </el-tabs>
      </fieldset>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideAddDialog">关 闭</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
 import {cron} from 'vue-cron';
 import TaskGroupSelectOption from './TaskGroupSelectOption'
 import {
  GetJobsChildDirectory,
  GetJobDirectoryDLLs,
  GetDLLClass,
  GetClassFuncs
} from "../../../api/TaskManage";
import axios from 'axios'
export default {
  components: {
    cron,
    TaskGroupSelectOption
  },
  data() {
    return {
      ruleForm: {   //弹窗表单
        server: "",
        fileName: "",
        dllExe: "",
        class: "",
        fun: "",
        group: "",
        jobName: "",
        describe: "",
        radio:'0',
        path:'',
        order:"",
        parameter :[]

      },
      rules: {  //弹窗表单输入验证
        dllExe: [
          { required: true, message: "请输入DLL或者EXE", trigger: "blur" }
        ],
        class: [
          { required: true, message: "请输入Class名称", trigger: "blur" }
        ]
      },
      cronPopover:false,  //隐藏显示popover 弹窗
      cron:'',   //前端生成的cron表达式
      activeTab:'second',//判断是单次执行还是多次执行
      activeGroup:'',
      fileName:'',
      fileOption:[],
      dllOptions:[],
      classOptions:[],
      funOptions:[],
      selectBool:false//当选择python脚本的时候禁用下拉框
    };
  },
  props: {
    isAddTask: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideAddDialog() {   //隐藏弹窗  向父组件传值false
      let _this = this;
      _this.$emit("hideAddDialog", false);
    },
    submitForm(formName) {   //提交
    let _this = this
    let paramArr =  _this.ruleForm.parameter.map(x => {
       return x.value
     })
     
      _this.$refs[formName].validate(valid => {
        if (valid) {
         let obj =  {
            IP: _this.ruleForm.server,
            JobDir: _this.ruleForm.fileName,
            JobKeyName: _this.ruleForm.jobName,
            JobKeyGroup: _this.ruleForm.group,
            JobDesc: "desc",
            TriggerKeyName: _this.ruleForm.jobName,
            TriggerKeyGroup: _this.ruleForm.group,
            TriggerDesc: "desc",
            TriggerPriority: 1,
            Cron: _this.cron,
            DLLFileName:_this.ruleForm.dllExe,
            DLLClassFullName:_this.ruleForm.class,
            JobFunctionName:_this.ruleForm.fun,
            PythonFilePath:_this.ruleForm.path,
            PythonCommand: _this.ruleForm.order,
            Parameter: JSON.stringify(paramArr.splice(0,paramArr.length-1)),
            Type: parseInt(_this.ruleForm.radio) 
          }
          console.log(obj)
          axios.post('/Utmel/Scheduler/AddJobTask',obj).then((res) => {
           if(res.data.code == 1000){
                 _this.$message({
                  type:'success',
                  message:'添加成功'
                })
                _this.ruleForm = {   //弹窗表单
                    server: "",
                    fileName: "",
                    dllExe: "",
                    class: "",
                    fun: "",
                    group: "",
                    jobName: "",
                    describe: "",
                    radio:'0',
                    path:'',
                    order:"",
                    parameter :[]
                  }
                _this.$emit("hideAddDialog", false);
            }else{
                _this.$message({
                  type:'warning',
                  message:res.data.msg
                })
            }
          }).catch((error) => {
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
    changeCron(val){     //根据用户选择改变事件生产cron表达式
         this.cron = val
    },
    GetJobFileList(){    //获取job文件夹
        let _this = this
        GetJobsChildDirectory(_this.ruleForm.server)
        .then(res => {
          
          if(res.code == 1000){
            let arr = res.data.map(x => {
              return {value:x,label:x}
            })
               _this.fileOption = arr
          }else{
               _this.$message({
                type:"error",
                message:res.meg
              })
          }
         
        })
        .catch(error => {
          _this.$message({
                type:"error",
                message:'请求出错'+error
              })
        })
    },
    GetDllList(){
       let _this = this
        GetJobDirectoryDLLs('?IP='+_this.ruleForm.server+'&JobDir='+_this.ruleForm.fileName) 
        .then(res => {
          if(res.code == 1000){
           let arr = res.data.map(x => {
            return {value:x,label:x}
          })
          _this.dllOptions = arr
          }else{
               _this.$message({
                type:"error",
                message:res.meg
              })
          }
          
        })
        .catch(error => {
          _this.$message({
                type:"error",
                message:'请求出错'+error
              })
        })
    },
    GetClassList(){
       let _this = this
       GetDLLClass('?IP='+_this.ruleForm.server+'&JobDir='+_this.ruleForm.fileName+'&DLLFileName='+_this.ruleForm.dllExe)
       .then(res => {
         if(res.code == 1000){
           let arr = res.data.map(x => {
            return {value:x,label:x}
         })
          _this.classOptions = arr
          }else{
               _this.$message({
                type:"error",
                message:res.meg
              })
          }
         
       })
       .catch(error => {
          _this.$message({
                type:"error",
                message:'请求出错'+error
              })
       })
    },
    GetFunList(){
      let _this = this
       GetClassFuncs('?IP='+_this.ruleForm.server+'&JobDir='+_this.ruleForm.fileName+'&DLLFileName='+_this.ruleForm.dllExe+'&DLLClassFullName='+_this.ruleForm.class)
       .then(res => {
         if(res.code == 1000){
           let arr = res.data.map(x => {
            return {value:x,label:x}
         })
          _this.funOptions = arr
          }else{
               _this.$message({
                type:"error",
                message:res.meg
              })
          }
         
       })
       .catch(error => {
         _this.$message({
                type:"error",
                message:'请求出错'+error
              })
       })
    },
    AddInput(data){ //添加参数输入框
    if(data.bool != true && data.value != ''){
        data.bool =true
        this.ruleForm.parameter.push({
          value: '',
          key: Date.now(),
          bool:false
        });
    }
        
    },
    removeDomain(data){   //删除参数输入框
      var index = this.ruleForm.parameter.indexOf(data)
        if (index !== -1) {
          if( this.ruleForm.parameter.length == 1){
            return
          }else{
            this.ruleForm.parameter.splice(index, 1)
          }
          
        }
    },
    HideParmeater(){  //通过按钮来控制参数输入的显示隐藏
            if(this.ruleForm.radio == 1){
                this.ruleForm.parameter = [{
                  value: '',
                  key:1,
                  bool:false
                }]
                this.ruleForm.fileName = 'JobDLL'
                this.ruleForm.dllExe = 'Utmel.Job.CommandLine.dll'
                this.ruleForm.class = 'Utmel.Job.CommandLine.Job.PythonGraspJob'
                this.ruleForm.fun = 'ExecutePythonJob'
                this.selectBool = !this.selectBool
            }else{
              this.ruleForm.parameter =  []
              this.ruleForm.fileName = ''
                this.ruleForm.dllExe = ''
                this.ruleForm.class = ''
                this.ruleForm.fun = ''
                 this.selectBool = !this.selectBool
            }
    } 
  },

  watch: {
  
  },
  created(){
    
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
/deep/ .el-cascader.el-cascader--medium{
  width: 100%;
}

</style>