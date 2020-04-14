<template>
    <div>
        <el-dialog title="设置ID" :visible.sync="dialogTableVisible" @close='setId'	>
            <el-table :data="gridData" border  v-loading="loadingTable">
                <el-table-column
                    prop=""
                    label="单选"
                    width="60"
                    align="center">
                    <template  slot-scope="scope">
                        <el-radio v-model="id" :label="scope.row.categoryID">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column property="categoryID" width="60" align="center" label="ID" ></el-table-column>
                <el-table-column property="categoryName" label="分类"></el-table-column>
                <el-table-column property="parentName" label="父分类名"></el-table-column>
            </el-table>
            <div class="page">
                <Pagination @getChangeSize='getChangeSize' :nowPage='NowPageSize' :ShowList='showPageSize' :total='total'/>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import { GetCategoryById } from '../../../../api/ProductManage'
import axios from 'axios'
export default {
    data(){
        return {
        gridData: [],
        dialogTableVisible:false,
        showPageSize:10,//每页显示多少数据
        NowPageSize:1, //当前第几页
        loadingTable:true,  //表格loading
        total:0,  //数据总量
        id:''
        }
    },
    props:{
        isShow:{
            type:Boolean,
            default:false
        },
        isEdit:{
           
        }
    },
    components:{
        Pagination:() => import("../../../../components/Pagination/Pagination"),//分页组件
    },
    methods:{
        GetIdList(){
            let _this = this
            GetCategoryById({
               page:_this.NowPageSize,
               limit:_this.showPageSize,
            })
            .then(res => {
                _this.loadingTable = false
                _this.gridData = res.data
                _this.total = res.count
            })
            .catch(error => {
                console.log(error)
            })
        },
        getChangeSize(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.NowPageSize = val
            _this.GetIdList()

        },
        setId(){
            let _this = this
            _this.isEdit.utmel_CategoryID = _this.id
            console.log(this.isEdit)
            axios.post('/Utmel/Category/EditCategoryID', _this.isEdit)
            .then(res => {
                if(res.data.code == 1000){
                     _this.$message({
                                type:'success',
                                message:res.data.msg
                            })
                    _this.id = ''
                    _this.$emit('isHide',false)
                }else{
                     _this.$message({
                                type:'success',
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
        _this.GetIdList()
    },
    watch:{
        isShow(val){
                if(val == true){
                    this.dialogTableVisible = true
                    if(this.isEdit.utmel_CategoryID != '' && this.isEdit.utmel_CategoryID != null){
                        this.id = this.isEdit.utmel_CategoryID
                    }
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