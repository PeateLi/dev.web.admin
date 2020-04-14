/*
 * @Author:李平勇
 * @Date: 2020-02-15 14:02:21 
 * @desc:执行日志组件
 */
<template>
    <div>
            <div class="log-title">
                <ul>
                  <li> <i class="round"></i> 执行日志</li>
                </ul>
            </div>
            <div class="log-search">
              
                    <div class="block">
                      <el-input
                        placeholder="请输入任务名称"
                        v-model="InfoInput"
                        clearable
                        style="width:10%;"
                        @input="getInfoData()"
                        >
                      </el-input>
                      <el-input
                        placeholder="请输入任务分组"
                        v-model="InfoGroup"
                        clearable
                        style="width:10%;"
                         @input="getInfoData()">
                      </el-input>
                      <el-select v-model="InfoType" @change="getInfoData()" placeholder="请选择日志类型">
                        <el-option
                          v-for="item in InfoTypeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
            </div>
            <div class="log-table">
                    <Table :TableData="logData" 
                      :header="tableHeader" 
                      :option="tableOption" 
                     >
                      </Table>
                      <div style="text-align:center;margin-top:10px">
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
GetExecuteLog
} from "../../../api/TaskManage";
export default {
    data(){
        return {
          logData: [],
         total: 0, //数据总量
        showPageSize: 5, //每页显示多少数据
        NowPageSize: 1, //当前第几页
        showPageSizeArr:[5,10,15,20,25],
         tableHeader: [    //给表格组件传过去的表头信息
            {
              prop: "macAddress",
              label: "Mac地址",
              isEdit:false,  //是否可以修改
            },
            {
              prop: "logType",
              label: "日志类型",
              //isSearch:'',   //用户模糊查询时绑定
              isEdit:false,
            },
            {
              prop: "message",
              label: "日志信息",
              isEdit:false,
            },
            {
              prop: "jobGroup",
              label: "任务分组",
              isEdit:false,
            },
            {
              prop: "jobName",
              label: "任务名称",
              isEdit:false,
            },
            {
              prop: "className",
              label: "类名",
              minWidth:'300',
              isEdit:false,
            },
            {
              prop: "methodName",
              label: "方法名",
              isEdit:false,
            },
            {
              prop: "logIP",
              label: "日志IP",
              isEdit:false,
            },
            {
              prop: "logTime",
              label: "时间",
              isFiltersType:'time',
              isEdit:false,
            },
          ],
      tableOption: {   //表格选项
        border: true,   //是否有边框
        isSort:true ,     //是否有多选
        isSearch:false,
      },
      InfoTypeOptions: [{
          value: 'Info',
          label: 'Info'
        }, {
          value: 'Warn',
          label: 'Warn'
        }, {
          value: 'Debug',
          label: 'Debug'
        }, {
          value: 'Error',
          label: 'Error'
        }],
        InfoType: '',
        InfoInput:'',
        InfoGroup:''
      }
       
    },
    components:{
      Pagination: () => import("../../../components/Pagination/Pagination"), //分页组件
      Table: () => import("@/components/Table/Table"), //表格组件
    },
    methods:{
      getChangePage(val) {
      //接收分页子组件传过来的页数
      let _this = this;
      _this.NowPageSize = val;
      _this.getInfoData();
      },
      getChangeSize(val){
        let _this = this;
        _this.showPageSize = val;
        _this.getInfoData();
      },
      getInfoData(){
        let _this = this
        GetExecuteLog({
          page:_this.NowPageSize,
          limit:_this.showPageSize,
          JobName:_this.InfoInput,
          JobGroup:_this.InfoGroup,
          LogType:_this.InfoType
        })
        .then(res => {
          if(res.data.resultList){
              _this.logData = res.data.resultList
              _this.total = res.data.totalCount
          }else{
            _this.$message({
                  type:'warning',
                  message:'数据为空'
                })
          }
        })
        .catch(error =>{
          _this.$message({
            type: "error",
            message: "请求出错" + error
          });
        })
      }
    },
    mounted(){
      this.getInfoData()
    }
}
</script>

<style lang="less" scoped>
 .log-title li {
        font-size: 14px;
        color: #585c5f;
        border-bottom: 2px solid #656565;
        padding-bottom: 4px;
        list-style: none;
        padding-right: 20px;
        font-weight: bold;
        width: 90px;
        
        .round {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #585c5f;
          margin-right: 5px;
        }
      }
        ul{
          list-style: none;
          padding-left: 20px;
        }
        .log-table{
          padding-left: 20px;
        }
        .log-search{
          padding-left: 20px;
          margin-bottom: 10px;
          height: 40px;
          .block{
            
          }
          .block div {
            float: left;
            margin-right: 10px;
            /deep/ .el-select.el-select--medium{
              
            }
          }
        }
         /deep/ .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange{
          margin-right: 15px;
        }
        /deep/ .el-checkbox__input.is-checked+.el-checkbox__label{
          color: #EBB563 !important;
        }
        /deep/ .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
          border-color: #EBB563 !important;
          background-color: #EBB563 !important;
        }
        @media (max-width: 768px) {  
           /deep/ .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange.el-range-editor--medium{
             width: 100%;
           }
           /deep/ .el-button.el-button--warning.el-button--medium{
             margin-top: 10px;
           }
         }
</style>