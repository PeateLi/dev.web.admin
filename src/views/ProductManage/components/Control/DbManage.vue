<template>
    <div>
         <div class="db-navbar">
            <ul class="db-list">
                <li>
                <i class="round"></i> 数据库-库存信息
                </li>
            </ul>
            <i class="el-icon-refresh" @click="GetControlList()"></i>
        </div>

        <div class="db-table">
               
                <Table 
                    :TableData="tableData" 
                    :header="tableHeader" 
                    :option="tableOption"
                     @getEditData='getEditData' 
                     @getCheckData='getCheckData'
                     @getSearchData='getSearchData'
                     @showDiaLog='showDiaLog'>
                    </Table>
           <AttributeListDialog :active="ActiveMfg" :isDialog="isAttriButeDialog" @isHide="isHide"></AttributeListDialog>
            <ClassListDialog :isShowClass='isClassDialog' :classData='isClassData' @hideClassdialog='hideClassdialog'></ClassListDialog>
            <ManufacturerDialog :isShowMfg='isMfgDialog' :isData='isMfgData'  @hideMfgdialog='hideMfgdialog'></ManufacturerDialog>
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
import { GetDbControlInfo } from '../../../../api/ProductManage'
export default {
    data(){
        return {
            tableData:[],
            total:0,  //数据总量
            showPageSize:10,//每页显示多少数据
            NowPageSize:1, //当前第几页+
            showPageSizeArr:[5,10,15,20,25],
            MFGPartNo:"", //原厂型号
            BrandName:'', //品牌名
            loadingTable:true,  //表格loading
            ActiveMfg:'',  //点击制造商显示的属性所应有的那一列数据
            isAttriButeDialog:false,
            isClassDialog:false,
            isClassData:'',
            isMfgDialog:false,
            isMfgData:'',
            tableHeader: [    //给表格组件传过去的表头信息
                {
                prop: "pid",
                label: "ID",
                minWidth:'60',
                sortable: true,
                sortMethod: this.handleNameSort,
                isSearch:'',
                isEdit:false,
                isCanSearch:false
                },
                {
                prop: "mfgPartNo",
                label: "库存品牌型号",
                minWidth:'230',
                isSearch:'',//用户模糊查询时绑定
                isShowDialog:true   
                },
                {
                prop: "mfgid",
                label: "品牌ID",
                minWidth:'100',
                isSearch:'',
                isEdit:false,
                },
                {
                prop: "mfg",
                label: "原厂",
                minWidth:'200',
                isSearch:'',   //用户模糊查询时绑定
                isShowDialog:true
                },
                {
                prop: "mfgUrl",
                label: "原厂Url",
                minWidth:'200',
                isSearch:''
                },
                {
                prop: "category",
                label: "种类",
                minWidth:'200',
                isSearch:'',   //用户模糊查询时绑定
                isShowDialog:true
                },
                {
                prop: "categoryID",
                label: "种类ID",
                minWidth:'200',
                isSearch:'',
                isEdit:false,
                },
                {
                prop: "description",
                label: "描述",
                minWidth:'200',
                isSearch:''   //用户模糊查询时绑定
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
    components:{
         Pagination:() => import("../../../../components/Pagination/Pagination"),//分页组件
         AttributeListDialog:() =>import('./AttributeListDialog'),   //根据制造商型号获取属性集合
         ClassListDialog:() =>import('./ClassListDialog'),   //分类集合
         ManufacturerDialog:() =>import('./ManufacturerDialog'),   //制造商信息
          Table: () => import("@/components/Table/Table"), //表格组件
    },
    methods:{
        GetDbControl(){
            let _this = this
            GetDbControlInfo({
                 page:_this.NowPageSize,
                 limit:_this.showPageSize,
                 MFGPartNo:_this.BrandName,
                 MFG:_this.MFGPartNo
            })
            .then(res => {
               _this.loadingTable = false,
               _this.total = res.count
               _this.tableData = res.data.resultList
            })
            .catch(error => {
                console.log(error)
            })
        },
        getChangePage(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.NowPageSize = val
            _this.GetDbControl()
        },
        getChangeSize(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.showPageSize = val
            _this.GetDbControl()
        },
        GetAttributeInfo(data){
            let _this = this
            _this.ActiveMfg =  data
            _this.isAttriButeDialog = true
        },
        InquireData() {  //品牌名模糊查询
            this.GetDbControl()
        },
        isHide(val){  //子组件自定义事件
             let _this = this
            _this.ActiveMfg =  ''
            _this.isAttriButeDialog = false
        },
        GetCategory(data){
            let _this = this
            _this.isClassDialog = true
            _this.isClassData = data

        },
        GetMfgsInfo(data){
             let _this = this
             _this.isMfgDialog = true
             console.log(data)
            _this.isMfgData = data
        },
        hideClassdialog(val){
            let _this = this
            _this.isClassDialog = val
        },
        hideMfgdialog(val){
             let _this = this
             _this.isMfgDialog = val
        },
         showDiaLog(row,col){    //当需要显示弹窗表格组件传过来的行跟列
            let _this = this
            if(col.prop == 'mfgPartNo'){
                _this.ActiveMfg = row
                _this.isAttriButeDialog = true
            }else if(col.prop == 'mfg'){
                    _this.isMfgDialog = true
                _this.isMfgData = row
                console.log( _this.isMfgData)
            }else{
                _this.isClassDialog = true
                _this.isClassData = row
            }
          },
           getEditData(data,row,old){   //表格传过来的最新编辑数据  
                let _this = this
                

            },
            getCheckData(data){  //表格传过来的选中数据
                this.checkActiveDataRow = data
            },
            getSearchData(data){   //表格传过来的筛选条件
                  
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        if(element.label == "原厂"){
                            this.MFGPartNo = element.search
                        }else if(element.label == "库存品牌型号"){
                            this.BrandName = element.search
                        }
                    }
                    this.GetDbControl()
            }
        
    },
    mounted(){
        let _this = this
        _this.GetDbControl()
    }
}
</script>


<style lang="less" scoped>
.db-navbar {
      height: 50px;
    }
    .db-list {
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
    .db-operation{
        float: left;
        li{
            float: left;
            list-style: none;
            padding: 0px 10px;
            font-size: 13px;
            cursor: pointer;
        }
        li:hover{
           text-decoration: underline; 
        }
    }
    /deep/ .el-icon-refresh{
      margin-top: 14px;
    float: right;
    margin-right: 20px;
    cursor: pointer;
}
.search-input:first-child{
    margin-right: 0px
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
.page{
    text-align: center;
    margin: 15px 0px;
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
/deep/ .el-select .el-input.is-focus .el-input__inner{
     border-color: #ebb563 !important;
}
/deep/ .el-input__inner:focus{
     border-color: #ebb563 !important;
}
 @media (max-width: 768px) {  
   
   .search-left{
       width: 100%;
       padding: 0px 20px;
   }
   .search-input{
       clear: both;
       width: 100%;
       margin: 5px 0px;
   }
   /deep/ .el-button.el-button--warning.el-button--medium{
       width: 100%;
   }
   .db-table{
       padding: 0px 20px;
   }
   .page{
       width: 100%;
   }
   /deep/ .number{
       margin: 0px 1px  !important;
   }
 }
  @media (max-width: 768px) {  
         /deep/ .el-dialog{
            width: 100%;
        }
  }

</style>