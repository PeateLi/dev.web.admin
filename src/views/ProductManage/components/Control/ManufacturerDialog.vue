<template>
    <div>
        <el-dialog title="制作商信息" :visible.sync="dialogTableVisible" @close="setMfgInfo()">
        <el-table :data="gridData">
            <el-table-column label="选择" width="65" align="center">
                        <template slot-scope="scope">
                        <el-radio :label="scope.row.mfgID" v-model="radio" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
                        </template>
           </el-table-column>
            <el-table-column align="center" property="mfgID" label="ID" ></el-table-column>
            <el-table-column property="mfgName" label="制作商"></el-table-column>
            <el-table-column property="mfgUrl" label="制作商地址"></el-table-column>
        </el-table>
        <div  class="page">
           <Pagination
                @getChangeSize='getChangeSize'
                @getChangePage="getChangePage"
                :nowPage="NowPageSize"
                :ShowList="showPageSize"
                :total="total"
                :showPageSizeArr='showPageSizeArr'
                />
        </div>
        </el-dialog>
    </div>
</template>

<script>
import { GetMfg } from '../../../../api/ProductManage'
import axios from 'axios'
export default {
    data(){
        return {
        gridData: [],
        dialogTableVisible: this.isShowMfg,
         total:0,  //数据总量
            showPageSize:10,//每页显示多少数据
            NowPageSize:1, //当前第几页+
            showPageSizeArr:[5,10,15,20,25],
        templateSelection: [],  //单选选中
        radio:''
        }
    },
     components:{
         Pagination:() => import("../../../../components/Pagination/Pagination"),//分页组件
    },
    props:{
        isShowMfg:{
            type:Boolean,
            default:false
        },
        isData:{

        }
    },
    methods:{
        GetMfgs(){
             let _this = this
            GetMfg({
                 page:_this.NowPageSize,
                limit:_this.showPageSize
            })
            .then(res => {
                _this.gridData = res.data.resultList
              _this.total = res.count
            })
            .catch(error => {
               _this.$message.error('请求出错'+error)
            })
        },
         getChangePage(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.NowPageSize = val
            _this.GetMfgs()
        },
        getChangeSize(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.showPageSize = val
            _this.GetMfgs()
        },
       getCurrentRow(row){ //获取选中数据
        this.templateSelection = row;
        console.log(row)
        },
        setMfgInfo(){
            let _this = this
            if(this.templateSelection == null || this.templateSelection == ''){
                 _this.$emit('hideMfgdialog',false)
                return
            }
            _this.isData.mfg = this.templateSelection.mfgName
            _this.isData.mfgid = this.templateSelection.mfgID
            _this.isData.mfgUrl = this.templateSelection.mfgUrl
             axios.post('/Utmel/Product/EditMfg',_this.isData)
             .then(res => {
                 console.log(res)
                 if(res.data.code == 1000){
                    _this.$message({
                        type:'success',
                        message:res.data.msg
                    })
                    _this.templateSelection = []
                    _this.radio = ''
                    _this.$emit('hideMfgdialog',false)
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
             
        }
    },
    mounted(){
        let _this = this
    },
    watch:{
        isShowMfg(val){
           if(val == true){
               this.dialogTableVisible = true
               this. GetMfgs()
               this.radio =  this.isData.mfgid
           }
        }
    }
}
</script>


<style lang="less" scoped>
.page{
    text-align: center;
    margin: 15px 0px;
}
</style>