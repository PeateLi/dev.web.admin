
<template>
  <div class="db-log">
    <div class="task-container">
      <div class="task-planning">
        <task-planning></task-planning>
        <!-- 任务执行计划 -->
      </div>
    </div>

    <div class="log-container">
      <div class="log-info">
        <log-info></log-info>
        <!-- 日志信息 -->
      </div>
      <div class="execute-log">
        <execute-log></execute-log>
        <!-- 执行日志 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    LogInfo:() => import("@/views/TaskManage/components/LogInfo"),  //日志信息
    ExecuteLog:() => import("@/views/TaskManage/components/ExecuteLog"),   //执行日志
    TaskPlanning:() => import("@/views/TaskManage/components/TaskPlanning"),  //任务计划
  },
  data() {
    return {
      restaurants: [], //任务分组数据
      state: "", //任务分组搜索框内容
      timeout: null, //查询是需要的定时器
      nowPage: 1, //页数
      showSize: 10, // 每页显示多少数据
      total: 0 //数据总数
    };
  },
  methods: {
    /**
     * 子组件传参给父组件的属性 父组件接收的自定义方法
     * @param {Number} val [切换页数后子组件给父组件的页数]
     */
    getChangeTaskList(val) {
      let _this = this;
      _this.nowPage = val;
      // _this.GetTaskList();
    },
   
  },
  mounted() {
    let _this = this;
    // _this.GetTaskList();
  }
};
</script>


<style lang="less" scoped>
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: scroll;
  padding-left: 20px;
  margin-left: 0px;
  height: 350px;
}
.task-container {
  width: 100%;
  // height: 520px;
  .task-allocation {
    width: 30%;
    float: left;
    .ta-navbar {
      height: 50px;
    }
    .ta-list {
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
    .el-icon-refresh {
      float: right;
      line-height: 50px;
      margin-right: 10px;
      cursor: pointer;
    }
    .ta-search {
      margin-top: 5px;
      margin-bottom: 10px;
      padding-left: 20px;
      /deep/ .el-autocomplete {
        margin-right: 1%;
      }
    }
  }
  .task-planning {
    float: left;
    width: 100%;
  }
}
/deep/ .el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #ebb563 !important;
}
/deep/ .has-gutter tr th {
  text-align: center;
}
/deep/ .el-scrollbar {
  height: 355px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.log-info {
  width: 100%;
}
.execute-log {
  width: 100%;
}
.page-box {
  width: 80%;
  text-align: center;
  margin: 10px 0px;
}
 @media (max-width: 768px) {  
   .log-info,.execute-log{
     clear: both;
     width: 100%;
      padding-right: 20px;
   }
 }
</style>