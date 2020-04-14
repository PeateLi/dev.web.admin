<template>
    <div>
        <el-card class="box-card">
            
           <mavon-editor class="md" v-html="handbook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
           <el-card style="margin-top:20px;">
           
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>

            </el-card>
           <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <el-button type="text">查看代码</el-button>
                </template>
               <mavon-editor class="md" v-html="handCode" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            </el-collapse-item>
            </el-collapse>
        </el-card>
       
    </div>
</template>


<script>
import Breadcrumb from '../../components/md/Breadcrumb/Breadcrumb.md'
import BreadcrumbCode from '../../components/md/Breadcrumb/BreadcrumbCode.md'
export default {
    data(){
        return {
        markdownOption: {
            bold: true, // 粗体
        },
        handbook: Breadcrumb,
        handCode:BreadcrumbCode
        }
    },
    components:{
        Breadcrumb,
        BreadcrumbCode
    }
}
</script>


<style scoped>
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
</style>