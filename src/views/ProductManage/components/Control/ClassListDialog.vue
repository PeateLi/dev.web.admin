<template>
    <div>
        <el-dialog title="分类" :visible.sync="dialogTableVisible" @close="setClassInfo()">
        <el-collapse accordion>
            <el-collapse-item v-for="item in parentData" :key="item.categoryID" @click.native="ActiveRow(item)">
                <template  slot="title">
                <span  >{{item.categoryName}}</span>
                </template>
                <div>
                    <el-table
                    :data="childData"
                    style="width: 100%"
                    border>
                     <el-table-column label="选择" width="65" align="center">
                        <template slot-scope="scope">
                        <el-radio :label="scope.row.categoryID" v-model="radio" @change.native="getCurrentRow(scope.row)">&nbsp;</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="categoryID"
                        label="ID"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="categoryName"
                        label="姓名">
                    </el-table-column>
                    </el-table>
                </div>
                   <div  class="page">
                     <Pagination
                        @getChangeSize='getChildChangeSize'
                        @getChangePage="getChildChangePage"
                        :nowPage="childPage"
                        :ShowList="childShowPageSize"
                        :total="childCount"
                        :showPageSizeArr='showPageSizeArr'
                        />
                </div>
            </el-collapse-item>
          
        </el-collapse>
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
import { GetParentCategory , GetChildCategory } from '../../../../api/ProductManage'
import axios from 'axios'
export default {
    data(){
        return {
            dialogTableVisible:this.isShowClass,
            childData:[{}],
            parentData:[],
             total:0,  //数据总量
            showPageSize:10,//每页显示多少数据
            NowPageSize:1, //当前第几页+
            showPageSizeArr:[5,10,15,20,25],
            childPage:1,
            childShowPageSize:5,
            childCount:0,
            active:"",
             templateSelection: [],  //单选选中
             radio:''
        }
    },
    props:{
        classData:{

        },
        isShowClass:{
            type:Boolean,
            default:false
        },
    },
    components:{
         Pagination:() => import("../../../../components/Pagination/Pagination"),//分页组件
    },
    methods:{
        
        GetChildClass(row){
             let _this = this

             GetChildCategory('page='+_this.childPage+'&limit='+_this.childShowPageSize+"&CategoryID="+row.categoryID)
            .then(res => {
              _this.childData = res.data.resultList
              _this.childCount = res.count
            })
            .catch(error => {
              _this.$message.error('请求出错'+error)
            })
        },
        GetParentClass(){
            let _this = this
            GetParentCategory({
                page:_this.NowPageSize,
                limit:_this.showPageSize
            })
            .then(res => {
              _this.parentData = res.data.resultList
              _this.total = res.count
            })
            .catch(error => {
               _this.$message.error('请求出错'+error)
            })
        },
         getChangePage(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.NowPageSize = val
            _this.GetParentClass()
        },
        getChangeSize(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.showPageSize = val
            _this.GetParentClass()
        },
         getChildChangePage(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.childPage = val
            _this.GetChildClass(_this.active)
        },
        getChildChangeSize(val){   //接收分页子组件传过来的页数
            let _this = this
            _this.childShowPageSize = val
            _this.GetChildClass(_this.active)
        },

        ActiveRow(row){
            let _this = this
            if(_this.active.categoryID != row.categoryID){
                _this.childPage = 1
                _this.childData = []
            }
            _this.active = row
            _this.GetChildClass(row)
        },
        getCurrentRow(row){ //获取选中数据
        this.templateSelection = row;
        },
        setClassInfo(){
            let _this = this
             if(this.templateSelection == null || this.templateSelection == ''){
                 _this.$emit('hideClassdialog',false)
                return
            }
            _this.classData.categoryID = this.templateSelection.categoryID
            _this.classData.category = this.templateSelection.categoryName
            axios.post('/Utmel/Product/EditProCategory',_this.classData)
            .then(res => {
                if(res.data.code == 1000){
                    _this.$message({
                        type:'success',
                        message:res.data.msg
                    })
                    _this.templateSelection = []
                    _this.radio = ''
                    _this.parentData = []
                     _this.childData = []
                    _this.$emit('hideClassdialog',false)
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
        isShowClass(val){
           if(val == true){
               this.dialogTableVisible = true
               this. GetParentClass()
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