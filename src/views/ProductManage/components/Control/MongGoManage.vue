<template>
    <div>
         <div class="mg-navbar">
            <ul class="mg-list">
                <li>
                <i class="round"></i> Monggo-库存信息
                </li>
            </ul>
            <i class="el-icon-refresh" @click="GetControlList()"></i>
        </div>
        <div class="br-search">

            <div class="search-left">
                <div class="search-input">
                        <el-input v-model="MFGPartNo" @input="InquireData" clearable placeholder="请输入型号"/>
                </div>
                <div class="search-input">
                        <el-input v-model="BrandName" @input="InquireData" clearable placeholder="请输入品牌"/>
                </div>
                <el-button type="warning">搜索</el-button>
            </div>

        
        </div>

        <div class="mg-table">
                <el-table
                :data="tableData"
                style="width: 100%"
                border
                v-loading="loadingTable">
                <el-table-column
                    prop="pid"
                    label="ID">
                </el-table-column>
                <el-table-column
                    prop="mfgPartNo"
                    label="库存原厂型号"
                    width="230">
                    <template slot-scope="scope">
                        <div @click="GetAttributeList(scope.row)">
                            {{scope.row.mfgPartNo}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="mfgid"
                    label="原厂ID">
                </el-table-column>
                <el-table-column
                    prop="mfg"
                    label="原厂">
                </el-table-column>
                <el-table-column
                    prop="mfgUrl"
                    label="原厂Url">
                </el-table-column>
                <el-table-column
                    prop="mfgid"
                    label="原厂ID">
                </el-table-column>
                <el-table-column
                    prop="category"
                    label="种类">
                </el-table-column>
                <el-table-column
                    prop="categoryID"
                    label="种类ID">
                </el-table-column>
                <el-table-column
                    prop="description"
                    label="描述">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="修改时间">
                </el-table-column>
                </el-table>

           <div class="page">
                <Pagination @getChangeSize='getChangeSize' :nowPage='NowPageSize' :ShowList='showPageSize' :total='total'/>
           </div>     
        </div>
    </div>
</template>

<script>
import { GetMongoDbControlInfo } from '../../../../api/ProductManage'
export default {
    data(){
        return {
            tableData:[],
            total:0,  //数据总量
            showPageSize:10,//每页显示多少数据
            NowPageSize:1, //当前第几页
            MFGPartNo:"", //原厂型号
            BrandName:'', //品牌名
            loadingTable:true,  //表格loading
        }
    },
    components:{
         Pagination:() => import("../../../../components/Pagination/Pagination"),//分页组件
    },
    methods:{
        GetMonggoControl(){
            let _this = this
            GetMongoDbControlInfo({
                 page:_this.NowPageSize,
                 limit:_this.showPageSize,
                 MFGPartNo:_this.MFGPartNo,
                 MFG:_this.BrandName
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
        getChangeSize(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.NowPageSize = val
            _this.GetMonggoControl()
        
        },
        InquireData() {  //品牌名模糊查询
           let _this = this
           _this.GetMonggoControl()
        },
    },
    mounted(){
        let _this = this
       _this.GetMonggoControl()
    }
}
</script>


<style lang="less" scoped>
.mg-navbar {
      height: 50px;
    }
    .mg-list {
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
    .mg-operation{
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
</style>