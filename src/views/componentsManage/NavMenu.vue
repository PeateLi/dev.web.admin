<template>
    <div>
        <el-card class="box-card">
            <mavon-editor class="md" v-html="handbook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            <el-card style="margin-top:20px;">
            <h3>路由配置示例</h3>
            <!-- <span class="desc">饼图以扇区的形式显示每一个数值相对于总数值的大小。</span> -->
            
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
import NavMenu from '../../components/md/NavMenu/NavMenu.md'
import NavMenuCode from '../../components/md/NavMenu/NavMenuCode.md'
export default {
    data(){
        return{
            handbook:NavMenu,
            handCodebook:NavMenuCode
        }
    },
    components:{
        NavMenu,
        NavMenuCode
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
