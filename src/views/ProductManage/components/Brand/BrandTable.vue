<template>
    <div>
         <div class="br-navbar">
            <ul class="br-list">
                <li>
                <i class="round"></i> 品牌-品牌管理
                </li>
            </ul>
            <i class="el-icon-refresh" @click="GetBrandList()"></i>
        </div>

        <div class="br-search">

            <div class="search-left">
                <div class="search-input">
                <el-button type="primary" @click="AddBrand">新增品牌</el-button>
               <el-button type="danger" @click="DelectBrand()">删除</el-button>
                </div>
            </div>
        </div>

        <div class="br-table">
                <Table 
                    :TableData="brandTableData" 
                    :header="tableHeader" 
                    :option="tableOption"
                     @getEditData='getEditData' 
                     @getCheckData='getCheckData'
                     @getSearchData='getSearchData'
                     @showDiaLog='showDiaLog'>
                        <el-table-column slot="fixed" align="center" fixed prop="check" label="多选"  width="50" type="selection"></el-table-column>
                    </Table>

                <add-brand v-if="isShowAdd" @hideAdd='hideAdd' :AddTableData="AddTableData"></add-brand>
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
            <mfg-octopart :AddNameRow='isAddNameArr' :isDialog='isDialog' @hideDialog='hideDialog'></mfg-octopart>
    </div>
</template>


<script>

import { GetManufacturer , DelBrands ,EditBrands} from '../../../../api/ProductManage'
import axios from 'axios';
export default {
    components:{
         Pagination:() => import("../../../../components/Pagination/Pagination"),//分页组件
         MfgOctopart:() => import("./GetMFGOctopart"),//品牌别名
         AddBrand:() => import("./AddBrand"),//添加品牌
         Table: () => import("@/components/Table/Table"), //表格组件
    },
    data(){
        return {
            brandTableData:[],
            loading: false,  //搜索loading
            loadingTable:true,  //表格loading
            activeDataRow:{},  //选中表格行
            checkActiveDataRow:[],//多选表格列数据
            total:0,  //数据总量
            showPageSize:10,//每页显示多少数据
            NowPageSize:1, //当前第几页
            showPageSizeArr:[5,10,15,20,25],
            BrandName:'',
            tabClickIndex: null, // 点击的单元格
            tabClickLabel: '', // 当前点击的列名Label
            AddBrandName:{},   //新增时候的字段
            isDialog:false, //控制别名表格弹窗隐藏还是出现
            AddTableData:[],  //添加品牌的时候
            isShowAdd:false,   //控制新增表格显示隐藏
            isAddNameIndex:0,   //点击添加别名行下标
            isAddNameArr:[],  //点击添加别名那行的数据
            tableHeader: [    //给表格组件传过去的表头信息
                {
                prop: "mfgID",
                label: "ID",
                minWidth:'60',
                sortable: true,
                sortMethod: this.handleNameSort,
                isSearch:'',
                isEdit:false,
                },
                {
                prop: "mfgName",
                label: "品牌名称",
                minWidth:'80',
                isSearch:'',   //用户模糊查询时绑定
                },
                {
                prop: "mfgAlias",
                label: "品牌别名",
                minWidth:'80',
                isSearch:'',
                isShowDialog:true,
                isTag:1
                },
                {
                prop: "mfgIconPath",
                label: "品牌图标",
                minWidth:'80',
                isSearch:''   //用户模糊查询时绑定
                },
                {
                prop: "mfgUrl",
                label: "品牌地址",
                minWidth:'100',
                isSearch:''
                },
                {
                prop: "description",
                label: "品牌详情",
                minWidth:'400',
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
                isSort:true,
                isSearch:true 
            },
        }
    },
    methods:{
        GetBrandList(){
            let _this = this
            GetManufacturer({
                page:_this.NowPageSize,
                limit:_this.showPageSize,
                MfgName:_this.BrandName
            })
            .then(res => {
                _this.loadingTable = false
                _this.total = res.count
                _this.brandTableData =  res.data.resultList
                for (let i = 0; i < _this.brandTableData.length; i++) {
                    const element = _this.brandTableData[i];
                    if(element.mfgAlias != '' && element.mfgAlias != null){
                        if(element.mfgAlias.indexOf(';') != -1){
                              _this.brandTableData[i].mfgAlias = JSON.stringify(element.mfgAlias.split(';')) 
                        }
                    }
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
         getChangeSize(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.showPageSize = val
            _this.GetBrandList()

        },
         getChangePage(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.NowPageSize = val
            _this.GetBrandList()

        },
        EditBand(row) {// 失去焦点初始化进行编辑
            let _this = this
           axios.post('/Utmel/Manufacturer/EditManufacturer',row)
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
        },
        DelectBrand(){   //删除品牌
            let _this = this
            DelBrands(JSON.stringify(_this.checkActiveDataRow) )
            .then(res => {
                if(res.code == 1000){
                    _this.$message({
                        type:'success',
                        message:res.msg
                    })
                    _this.GetBrandList()
                }else{
                    _this.$message({
                        type:'warning',
                         message:res.msg
                    })
                }
            }).catch(error => {
                _this.$message.error('请求出错'+error)
            })
        },
        AddBrand(){  //新增品牌
        let _this = this
        _this.isShowAdd = true
           let AddObj = {
               mfgID:0,
               mfgName:"",
               mfgAlias:"",
               mfgIconPath:"",
               mfgUrl:"",
               description:"",
               createTime:"",
               updateTime:''
           }
           _this.AddTableData.unshift(AddObj)
        },
        hideAdd(val){   //隐藏新增表格
             let _this = this
              _this.GetBrandList()
            _this.isShowAdd = val
            _this.AddTableData = []
        },
        setMfgAlias(row){  //设置别名显示别名弹窗
            let _this = this
            _this.isAddNameArr = row
            _this.isDialog = true
        },
        hideDialog(val,data){   //隐藏别名弹窗
            let _this = this
            _this.isDialog = val
            console.log(data)
        },
         showDiaLog(row,col){    //当需要显示弹窗表格组件传过来的行跟列
          let _this = this
              _this.isDialog = true
              _this.isAddNameArr = row

          },
           getEditData(data,row,old){   //表格传过来的最新编辑数据  
                let _this = this
                _this.EditBand(row)

            },
            getCheckData(data){  //表格传过来的选中数据
                this.checkActiveDataRow = data
            },
            getSearchData(data){   //表格传过来的筛选条件
                    for (let index = 0; index < data.length; index++) {
                        const element = data[index];
                        if(element.label == "品牌名称"){
                            this.BrandName = element.search
                        }
                    }
                    this.GetBrandList()
            }
        
    },
     mounted(){
         let _this = this
          _this.GetBrandList()
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
.br-navbar {
      height: 50px;
    }
    .br-list {
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
    .br-operation{
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
.br-table{
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
/deep/ .el-select .el-input.is-focus .el-input__inner{
     border-color: #ebb563 !important;
}
/deep/ .el-input__inner:focus{
     border-color: #ebb563 !important;
}
/deep/ .el-table.el-table--fit.el-table--border.el-table--enable-row-hover.el-table--medium{
    border-top: 0px;
}
/deep/ .el-tag.el-tag--small.el-tag--light{
    margin: 0px 5px;
}
 @media (max-width: 768px) {  
   
   .search-left{
       clear: both;
       width: 100%;
   }

   .search-right{
       clear: both !important;
       width: 100%;
       margin-bottom: 20px;
       .el-button.el-button--primary.el-button--medium{
           margin-left:40px;
       }
   }
   /deep/ .number{
       margin: 0px 1px  !important;
   }
    /deep/ .el-dialog{
     width: 100%;
 }
 }

</style>