<template>
    <div>
        <div class="class-navbar">
            <ul class="class-list">
                <li>
                <i class="round"></i> 分类-分类管理
                </li>
            </ul>
            <i class="el-icon-refresh" @click="GetClassList()"></i>
        </div>

        <div class="class-search">
        </div>

        <div class="class-table">
                    <Table 
                    :TableData="ClassTableData" 
                    :header="tableHeader" 
                    :option="tableOption"
                     @getEditData='getEditData' 
                     @getCheckData='getCheckData'
                     @getSearchData='getSearchData'
                     @showDiaLog='showDiaLog'>
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
        <ClassifyDialog :isShow='isShowDialog' @isHide="isHide" :isEdit="isEditRow" />

    </div>
</template>


<script>
import { GetClassLists , EditClassList , DelectClassList} from '../../../../api/ProductManage'
import axios from 'axios'
export default {
    components:{
          Pagination:() => import("../../../../components/Pagination/Pagination"),//分页组件
          ClassifyDialog:() => import("./ClassifyDialog"),//弹窗组件
          Table: () => import("@/components/Table/Table"), //表格组件
    },
    data(){
        return {
            ClassName:'',   //模糊查询属性名
            ClassTableData: [],   //属性数据列表
            total:0,  //数据总量
            showPageSize:10,//每页显示多少数据
            NowPageSize:1, //当前第几页
            showPageSizeArr:[5,10,15,20,25],
            loadingTable:true,  //表格loading
            isShowDialog:false,
            isEditRow:'',
             tableHeader: [    //给表格组件传过去的表头信息
                {
                prop: "categoryID",
                label: "ID",
                minWidth:'60',
                sortable: true,
                sortMethod: this.handleNameSort,
                isSearch:'',
                isEdit:false,
                },
                {
                prop: "categoryName",
                label: "分类名",
                minWidth:'200',
                isSearch:''   //用户模糊查询时绑定
                },
                {
                prop: "head_description",
                label: "头像描述",
                minWidth:'350',
                isSearch:''
                },
                {
                prop: "long_description",
                label: "详细说明",
                minWidth:'400',
                isSearch:''   //用户模糊查询时绑定
                },
                {
                prop: "parentName",
                label: "父分类名",
                minWidth:'120',
                isSearch:''
                },
                {
                prop: "parentID",
                label: "父分类ID",
                minWidth:'100',
                isSearch:''   //用户模糊查询时绑定
                },
                {
                prop: "utmel_CategoryID",
                label: "UTMEL分类ID",
                minWidth:'100',
                isSearch:'',
                isShowDialog:true
                },
                {
                prop: "createTime",
                label: "创建时间",
                minWidth:'120',
                isSelectType:'time',
                isFiltersType:'time',
                isSearch:'',
                 isEdit:false,
                },
                {
                prop: "updateTime",
                label: "修改时间",
                minWidth:'120',
                isSelectType:'time',
                isFiltersType:'time',
                isSearch:'',
                 isEdit:false,
                },
            ],
            tableOption: {   //表格选项
                border: true,
                isSort:false,
                isSearch:true 
            },
        }
    },
    methods:{
        GetClassList(){
            let _this = this
            GetClassLists({
                page:_this.NowPageSize,
                limit:_this.showPageSize,
                CategoryName:_this.ClassName
            })
            .then(res => {
                  _this.loadingTable = false
                _this.ClassTableData = res.data.resultList
                _this.total = res.count
            })
            .catch(error => {
                 _this.$message.error('请求出错'+error)
            })
        },
        EditClass(row){
          let _this = this
          axios.post('/Utmel/Category/EditCategoryID',row)
          .then(res => {
            if(res.data.code == 1000){
                     _this.$message({
                        type:'success',
                        message:res.data.msg
                    })
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
            _this.GetClassList()

        },
        getChangePage(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.NowPageSize = val
            _this.GetClassList()

        },
           isHide(val){   //弹窗隐藏事件
                    let _this = this
                  _this.isShowDialog = val
             },
          showDiaLog(row,col){    //当需要显示弹窗表格组件传过来的行跟列
          let _this = this
              _this.isShowDialog = true
              _this.isEditRow = row

          },
           getEditData(data,row,old){   //表格传过来的最新编辑数据  
                let _this = this
                _this.EditClass(row)

            },
            getCheckData(data){  //表格传过来的选中数据
                 console.log(data)
            },
            getSearchData(data){   //表格传过来的筛选条件
                    console.log(data)
            }
    },
    mounted(){
        let _this = this
        _this.GetClassList()
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
.class-navbar {
      height: 50px;
    }
    .class-list {
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
.class-table{
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
     /deep/ .number{
       margin: 0px 1px  !important;
   }
   /deep/ .el-dialog{
     width: 100%;
 }
  }

</style>
