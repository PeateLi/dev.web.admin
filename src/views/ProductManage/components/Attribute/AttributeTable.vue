<template>
    <div>
        <div class="attr-navbar">
            <ul class="attr-list">
                <li>
                <i class="round"></i> 属性-属性管理
                </li>
            </ul>
            <i class="el-icon-refresh" @click="GetAttributeList()"></i>
        </div>

        <div class="attr-search">
            <div class="search-left">
                <div class="search-input">
                        <el-button type="danger" @click="DelectAttribute()">删除</el-button>
                </div>
            </div>
        </div>

        <div class="attr-table">
                    <Table 
                    :TableData="AttrTableData" 
                    :header="tableHeader" 
                    :option="tableOption"
                     @getEditData='getEditData' 
                     @getCheckData='getCheckData'
                     @getSearchData='getSearchData'>
                        <el-table-column slot="fixed" align="center" fixed prop="check" label="多选"  width="50" type="selection"></el-table-column>
                    </Table>

        </div>
         <div class="page">
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
</template>


<script>
import { GetAttrList , EditAttrList , DelectAttrList} from '../../../../api/ProductManage'
import axios from 'axios'
export default {
    components:{
          Pagination:() => import("../../../../components/Pagination/Pagination"),//分页组件
          Table: () => import("@/components/Table/Table"), //表格组件
    },
    data(){
        return {
            AttrTableData: [],   //属性数据列表
            total:0,  //数据总量
            showPageSize:10,//每页显示多少数据
            NowPageSize:1, //当前第几页
             showPageSizeArr:[5,10,15,20,25],
            loadingTable:true,  //表格loading
             activeDataRow:{},  //选中表格行
            checkActiveDataRow:[],//多选表格列数据
            tableHeader: [    //给表格组件传过去的表头信息
                {
                prop: "attributeId",
                label: "ID",
                minWidth:'60',
                sortable: true,
                sortMethod: this.handleNameSort,
                isSearch:'',
                isEdit:false,
                },
                {
                prop: "attributeName",
                label: "属性名",
                minWidth:'200',
                isSearch:''   //用户模糊查询时绑定
                },
                {
                prop: "attributeAlias",
                label: "属性别名",
                minWidth:'240',
                isSearch:''
                },
                {
                prop: "createTime",
                label: "创建时间",
                minWidth:'260',
                isSelectType:'time',
                isFiltersType:'time',
                isSearch:'',
                 isEdit:false,
                },
                {
                prop: "updateTime",
                label: "修改时间",
                minWidth:'260',
                isSelectType:'time',
                isFiltersType:'time',
                isSearch:'',
                 isEdit:false,
                },
                
            ],
            tableOption: {   //表格选项
                border: true,
                isSort:true,
                isSearch:true 
            },
        }
    },
    methods:{
        GetAttributeList(){
            let _this = this
            GetAttrList({
                page:_this.NowPageSize,
                limit:_this.showPageSize,
                AttributeName:_this.AttributeName
            })
            .then(res => {
                  _this.loadingTable = false
                _this.AttrTableData = res.data.resultList
                _this.total = res.count
            })
            .catch(error => {
                console.log(error)
            })
        },
        DelectAttribute(){
            let _this = this
            
            DelectAttrList(JSON.stringify(_this.checkActiveDataRow))
            .then(res => {
                if(res.code == 1000){
                     _this.$message({
                        type:'success',
                        message:res.msg
                    })
                    _this.GetAttributeList()
                }else{
                     _this.$message({
                        type:'warning',
                         message:res.msg
                    })
                }
            })
            .catch(error => {
                _this.$message.error('请求出错'+error)
            })
        },
        getChangeSize(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.showPageSize = val
            _this.GetAttributeList()

        },
         getChangePage(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.NowPageSize = val
            _this.GetAttributeList()
        },
             EditData(newData,oldData) {
                  let _this = this
                  axios.post('/Utmel/Attribute/EditAttStandardName',[JSON.parse(oldData),newData])
                  .then(res => {
                      if(res.data.code == 1000){
                            _this.$message({
                                type:'success',
                                message:res.data.msg
                            })
                      }else{
                           _this.$message({
                                type:'warning',
                                message:res.data.msg
                            })
                      }
                  })
                  .catch(error => {
                      _this.$message.error('请求出错'+error)
                  })
                  _this.tabClickIndex = null
                 _this.tabClickLabel = ''
             },// 失去焦点初始化进行编辑()
             getEditData(data,row,old){   //表格传过来的最新编辑数据  
                let _this = this
                _this.EditData(row,old)
            },
            getCheckData(data){  //表格传过来的选中数据
                this.checkActiveDataRow = data
            },
            getSearchData(val){   //表格传过来的筛选条件
                    console.log(val)
            }
    },
    mounted(){
        let _this = this
        _this.GetAttributeList()
    },
    directives:{
    focus:{
      inserted:function(el){
        // console.log(el)
        el.getElementsByClassName('el-input__inner')[0].focus()
      }
    }
  }
}
</script>


<style lang="less" scoped>
.attr-navbar {
      height: 50px;
    }
    .attr-list {
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
    .search-input{
    float: left;
    margin: 0px 20px;
}
.search-left{
 float: left;
 margin-bottom: 15px;
}
.search-right{
 float: right;
 margin-right: 5%;
}
.attr-table{
    margin: 0px 20px;
}
/deep/ .el-checkbox__inner:hover{
  border-color: #ebb563 !important;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: #ebb563 !important;
  border-color: #ebb563 !important;
}
/deep/  .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: #ebb563 !important;
  border-color: #ebb563 !important;
}
/deep/ td .cell div{
  padding-right: 20px;
}
.active-row{
   background-color: #ebb563 !important;
   color: #fff;
}
/deep/ td .cell{
  padding: 0px;
  line-height: 40px;
  text-indent: 10px ;
  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/deep/ td:first-child .cell{
  text-indent: 0px;
  padding-left: 0px !important;

}
/deep/ .el-table__row td {
  padding: 0px !important;
  
}
.page{
    text-align: center;
    margin: 15px 0px;
}
  /deep/ .el-icon-refresh{
      margin-top: 14px;
    float: right;
    margin-right: 20px;
    cursor: pointer;
}
 @media (max-width: 768px) {  
     .search-input{
         width: 72%;
         margin-left: 0px;
     }
     /deep/ .el-button.el-button--danger.el-button--medium{
         width: 100%;
         margin: 5px 0px;
     }
     .search-left{
         padding: 0px 20px;
     }
     /deep/ .number{
       margin: 0px 1px  !important;
   }
 }
</style>
