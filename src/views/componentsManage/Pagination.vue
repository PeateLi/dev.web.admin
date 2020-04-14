<template>
    <div>
        <el-card class="box-card">
            <mavon-editor class="md" v-html="handbook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            <el-card style="margin-top:20px;">
            <h3>示例</h3>
            <!-- <span class="desc">饼图以扇区的形式显示每一个数值相对于总数值的大小。</span> -->
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
                </el-pagination>
            </el-card>
           <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <el-button type="text">查看代码</el-button>
                </template>
               <mavon-editor class="md" v-html="handCodebook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>


<script>
import Pagination from '../../components/md/Pagination/Pagination.md'
import PaginationBaseCode from '../../components/md/Pagination/PaginationBaseCode.md'
export default {
    data(){
        return {
            handbook: Pagination,
            handCodebook:PaginationBaseCode,
            currentPage4: 4
        }
    },
    components:{
        Pagination,
        PaginationBaseCode
    },
    methods:{
        handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
}
</script>


<style lang="less" scoped>
.md{
    border: 0px;
}
.box-card{
    margin: 20px;
}
.el-collapse{
    text-align: center;
    border-top: 0px;
    border-left: 1px solid #E6EBF5;
    border-right: 1px solid #E6EBF5;
    padding-left: 20px;
}
.el-row{
    margin-bottom: 15px;
}
h3{
    margin-top: 0px;
    margin-bottom: 5px;
}
.desc{
    color: red;
    font-size: 12px;
    display: block;
    margin-bottom: 20px;
    
}
</style>