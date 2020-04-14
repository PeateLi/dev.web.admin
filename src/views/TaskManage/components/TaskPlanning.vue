/*
 * @Author: 李平勇
 * @Date: 2020-02-15 14:36:12 
 * @desc:任务执行计划组件
 */
<template>
  <div>
    <div class="tp-navbar">
      <ul class="tp-list">
        <li>
          <i class="round"></i> 任务-执行计划
        </li>
      </ul>
      <ul class="tp-operation">
        <li @click="AddTask()">新增任务</li>
        <li @click="DeleteTask()">删除</li>
        <li @click="ExecuteJob()">立即执行</li>
        <li @click='PauseJob()'>挂起</li>
        <li @click='ResumeJob()'>恢复</li>
      </ul>
      <i class="el-icon-refresh" @click="GetTaskList()"></i>
    </div>

      <Table :TableData="plannningData" 
      :header="tableHeader" 
      :option="tableOption" 
      @getEditData='getEditData' 
      @getCheckData='getCheckData'
      @getSearchData='getSearchData'>
        <el-table-column slot="fixed" align="center" fixed prop="check" label="多选"  width="50" type="selection"></el-table-column>
      </Table>
        <AddTaskDialog :isAddTask='addTask' @hideAddDialog='hideAddDialog'/>
      <div style="text-align:center;margin-top:15px;margin-bottom:15px;">
        <Pagination
          @getChangeSize='getChangeSize'
          @getChangePage="getChangePage"
          :nowPage="NowPageSize"
          :ShowList="showPageSize"
          :total="total"
          :showPageSizeArr='showPageSizeArr'
        />
        
      </div>
    </div>
      
  </div>
</template>

<script>
import {
  GetTaskLists,
  DeleteTasks,
  StartTasks,
  StopTasks,
  ResumeTasks
} from "../../../api/TaskManage";

import { cron } from "vue-cron";
import axios from "axios";
export default {
  components: {
    AddTaskDialog: () => import("./AddTaskDialog"), //新增任务弹窗
    UpdataTask: () => import("./UpdataTaskDialog"), //编辑任务弹窗
    Pagination: () => import("../../../components/Pagination/Pagination"), //分页组件
    SelectOption: () => import("./StateSelectOption"), //下拉选择器
    TaskGroupSelectOption: () => import("./TaskGroupSelectOption"), //下拉任务分组选择器
    Table: () => import("@/components/Table/Table"), //表格组件
    cron
  },
  data() {
    return {
      jobName: "", //任务分组搜索框内容
      plannningData: [], //任务计划表格数据
      total: 0, //数据总量
      showPageSize: 10, //每页显示多少数据
      NowPageSize: 1, //当前第几页
      showPageSizeArr:[5,10,15,20,25],
       addTask:false,  //新增任务弹窗隐藏出现
      tableHeader: [    //给表格组件传过去的表头信息
        {
          prop: "ip",
          label: "服务器地址",
          minWidth:'240',
          sortable: true,
          sortMethod: this.handleNameSort,
          isEdit:false,  //是否可以修改
        },
        {
          prop: "state",
          label: "状态",
          minWidth:'200',
          isSearch:'',   //用户模糊查询时绑定
          isEdit:false,
        },
        {
          prop: "jobGroup",
          label: "任务分组",
           minWidth:'240',
           isSearch:'',
           isEdit:false,
        },
        {
          prop: "jobName",
          label: "任务名称",
           minWidth:'200',
           isSearch:'',
           isEdit:false,
        },
        {
          prop: "previousFireDate",
          label: "上次执行时间",
          minWidth:'260',
          isSelectType:'time',
          isFiltersType:'time',
          isSearch:'',
          isEdit:false,
        },
        {
          prop: "previousSuccessStr",
          label: "上次执行状态",
          minWidth:'200',
          isSearch:'',
          isEdit:false,
        },
        {
          prop: "nextFireDate",
          label: "下次执行时间",
          minWidth:'260',
          isSelectType:'time',
          isFiltersType:'time',
          isSearch:'',
          isEdit:false,
        },
        {
          prop: "priority",
          label: "优先等级",
          minWidth:'200',
          isSearch:'',
          isEdit:false,
        },
        {
          prop: "cronExpressionString",
          label: "计划规则",
          minWidth:'200',
          isSelectType:'cron',
          isSearch:'',
          isEdit:true,
        },
        
      ],
      tableOption: {   //表格选项
        border: true,   //是否有边框
        isSort:true,      //是否有多选
        isSearch:true 
      },
      axiosInfo:''
    };
  },
  
  methods: {
    GetTaskList(SearchData) {
      //获取任务列表
      let _this = this;
       let SearchJobGrounp = 0
       let SearchJobName = 0
      if(SearchData == undefined){
          SearchJobGrounp = 0
          SearchJobName = 0
      }else{
        if(SearchData.SearchJobGrounp == ''){
           SearchJobGrounp = 0
        }else{
            SearchJobGrounp = SearchData.SearchJobGrounp
        }
        if(SearchData.SearchJobName == ''){
             SearchJobName = 0
        }else{
            SearchJobName = SearchData.SearchJobName
        }
      }
      GetTaskLists({
        page: _this.NowPageSize,
        limit: _this.showPageSize,
        JobName:SearchJobName,
        JobGroup:SearchJobGrounp
      })
        .then(res => {
          _this.loadingTable = false;
          _this.plannningData = res.data.resultList;
          _this.plannningData = _this.plannningData.map(x => {
            //因为要多行高亮 所以只能添加一个属性isChecked判断样式
            return Object.assign(x, { isChecked: false });
          });
          _this.total = res.data.totalCount;
        })
        .catch(error => {
          _this.$message({
            type: "error",
            message: "请求出错" + error
          });
        });
    },
    AddTask(){   //显示新增弹窗
      let _this = this
      _this.addTask = true
    },
    hideAddDialog(val){  //隐藏新增弹窗
      let _this = this
      _this.addTask = val
       _this.GetTaskList();
    },
    getChangePage(val) {
      //接收分页子组件传过来的页数
      let _this = this;
      _this.NowPageSize = val;
      _this.GetTaskList();
    },
    getChangeSize(val){
      let _this = this;
      _this.showPageSize = val;
      _this.GetTaskList();
    },
    handleNameSort() {
      console.log("handleNameSort");
    },
    EditJob(row){
      let _this = this
        axios.post('/Utmel/Scheduler/EditJobCron',row)
        .then(res => {
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
        })
        .catch(error => {
           _this.$message({
                type:"error",
                message:'请求出错'+error
              })
        })
    },

    DeleteTask(){  //删除任务
        let _this = this
        if(_this.checkActiveDataRow == '' || _this.checkActiveDataRow == null || _this.checkActiveDataRow == undefined){
              _this.$message({
                type:"info",
                message:'还未选择删除项'
              })
        }else{
          DeleteTasks(_this.axiosInfo).then((res) => {
              if(res.code == 1000){
                _this.$message({
                  type:'success',
                  message:'删除成功'
                })
                _this.GetTaskList()
              }else{
                _this.$message({
                  type:'warning',
                  message:'删除失败'
                })
              }
          }).catch((error) => {
              _this.$message({
                type:"error",
                message:'请求出错'+error
              })
          })
        }
    },
    ExecuteJob(){   //立即执行任务
        let _this = this
        if(_this.checkActiveDataRow == '' || _this.checkActiveDataRow == null || _this.checkActiveDataRow == undefined){
              _this.$message({
                type:"info",
                message:'还未选择执行项'
              })
              return
        }
        StartTasks(_this.axiosInfo)
        .then(res => {
          if(res.code == 1000){
              _this.$message({
                  type:'success',
                  message:'执行成功'
                })
                _this.GetTaskList();
              _this.$emit("hideUpDialog", false,_this.ruleForm,_this.cron);
          }else{
             _this.$message({
                  type:'warning',
                  message:'执行失败'+res.meg
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
    PauseJob(){    //挂起任务
        let _this = this
         if(_this.checkActiveDataRow == '' || _this.checkActiveDataRow == null || _this.checkActiveDataRow == undefined){
              _this.$message({
                type:"info",
                message:'还未选择挂起项'
              })
              return
        }
        StopTasks(_this.axiosInfo)
        .then(res => {
          if(res.code == 1000){
              _this.$message({
                  type:'success',
                  message:'挂起成功'
                })
                _this.GetTaskList();
              _this.$emit("hideUpDialog", false,_this.ruleForm,_this.cron);
          }else{
             _this.$message({
                  type:'warning',
                  message:'挂起失败'+res.meg
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
    ResumeJob(){   //恢复任务
        let _this = this
        if(_this.checkActiveDataRow == '' || _this.checkActiveDataRow == null || _this.checkActiveDataRow == undefined){
              _this.$message({
                type:"info",
                message:'还未选择恢复项'
              })
              return
        }
        ResumeTasks(_this.axiosInfo)
        .then(res => {
          if(res.code == 1000){
              _this.$message({
                  type:'success',
                  message:'恢复成功'
                })
                _this.GetTaskList();
              _this.$emit("hideUpDialog", false,_this.ruleForm,_this.cron);
          }else{
             _this.$message({
                  type:'warning',
                  message:'恢复失败'+res.meg
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
    getEditData(data,row){   //表格传过来的最新编辑数据
      let _this = this
      _this.plannningData = data
      row(data)
      let obj = {
        IP:row.ip,
        NewIP:row.ip,
        JobKeyName:row.jobName,
        JobKeyGroup:row.jobGroup,
        TriggerKeyName:row.triggerName,
        TriggerKeyGroup:row.triggerGroup,
        TriggerPriority:row.priority,
        Cron:row.cronExpressionString
      }
      _this.EditJob(obj)
    },
    getCheckData(data){  //表格传过来的选中数据
        if(data[0] == undefined){
          return
        }
        this.checkActiveDataRow = data
        this.axiosInfo = '?IP='+this.checkActiveDataRow[0].ip+'&JobKeyName='+this.checkActiveDataRow[0].jobName+'&JobKeyGroup='+this.checkActiveDataRow[0].jobGroup
    },
    getSearchData(data){
      let jobGrounp = ''
      let jobName = ''
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
          if(element.label == '任务分组'){
              jobGrounp = element.search
          }else if(element.label == '任务名称'){
              jobName = element.search
          }
      }
      this.GetTaskList({SearchJobName:jobName,SearchJobGrounp:jobGrounp})
    }
  },
  mounted() {
    let _this = this;
    _this.GetTaskList();
  },
};
</script>

<style lang="less" scoped>
.task-planning {
  .tp-navbar {
    height: 50px;
  }
  .tp-list {
    float: left;
    margin-bottom: 0px;
    padding-left: 20px;
    li {
      font-size: 14px;
      color: #585c5f;
      border-bottom: 2px solid #656565;
      padding-bottom: 4px;
      list-style: none;
      padding-right: 20px;
      font-weight: bold;
      .round {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #585c5f;
        margin-right: 5px;
      }
    }
  }
  .tp-operation {
    float: left;
    li {
      float: left;
      list-style: none;
      padding: 0px 10px;
      font-size: 13px;
      cursor: pointer;
    }
    li:hover {
      text-decoration: underline;
    }
  }
  .tp-search {
    padding-left: 20px;
  }
  .el-select {
    // padding: 0px 10px;
  }
  .tp-table {
    margin-top: 15px;
    padding-left: 20px;
    padding-right: 20px;
    // height: 355px;
    border-bottom: 1px solid #ccc;
  }
}

/* 用来设置当前页面element全局table的内间距 */
/deep/ .el-table__row td {
  padding: 10px 0px !important;
}
/* 用来设置当前页面element全局table 选中某行时的背景色*/
/deep/ .el-table__body tr.current-row > td {
  background-color: #ebb563 !important;
  color: #fff; /* 设置文字颜色，可以选择不设置 */
}

.el-select-dropdown__item.selected {
  color: #ebb563 !important;
}
@media (max-width: 768px) {
  //超小屏幕
  .tp-operation {
    padding-left: 10px;
  }
  .tp-search {
    padding-right: 20px;
  }
  .tp-search div {
    clear: both;
    width: 100%;
    margin: 0px !important;
    margin-bottom: 5px !important;
  }
  .tp-search div:last-child {
  }
  /deep/ .el-select.el-select--medium {
    width: 100%;
  }
  /deep/ .el-button.el-button--warning.el-button--medium {
    width: 100%;
  }
}
/deep/ .el-select .el-input__inner:focus {
  border-color: #ebb563 !important;
}
/deep/ .el-input__inner:focus {
  border-color: #ebb563 !important;
}
/deep/ .el-table__fixed {
  height: 100% !important;
}
/deep/ .el-checkbox__inner:hover {
  border-color: #ebb563 !important;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ebb563 !important;
  border-color: #ebb563 !important;
}
/deep/ .el-icon-refresh {
  margin-top: 14px;
  float: right;
  margin-right: 20px;
  cursor: pointer;
}
/deep/ .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ebb563 !important;
  border-color: #ebb563 !important;
}
/deep/ td .cell div {
  padding-right: 20px;
}
.active-row {
  background-color: #ebb563 !important;
  color: #fff;
}
/deep/ td .cell {
  padding: 0px;
  line-height: 40px;
  text-indent: 10px;
}
/deep/ td:first-child .cell {
  text-indent: 0px;
  padding-left: 0px !important;
}
/deep/ .el-table__row td {
  padding: 0px !important;
}
.input-box{
  display: flex;
}
</style>

