<template>
    <div>
        <el-card class="box-card">
             <mavon-editor class="md" v-html="handbook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
             <el-card style="margin-top:20px;">
            <h3>基础用法:</h3>
            <span class="desc">使用数组对象中的type定义标签类型以及使用数组对象中的size定义尺寸</span>
                <el-row>
                <el-tag closable>默认标签</el-tag>
                <el-tag size="medium" type='success' closable>成功中等标签</el-tag>
                <el-tag size="small"  type='info'  closable>信息小型标签</el-tag>
                <el-tag size="mini"   type='warning' closable>警告超小标签</el-tag>
                <el-tag size="mini"   type='danger' closable>危险超小标签</el-tag>
                </el-row>
            </el-card>
           <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <el-button type="text">查看代码</el-button>
                </template>
               <mavon-editor class="md" v-html="handBaseCode" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            </el-collapse-item>
            </el-collapse>

        </el-card>
    </div>
</template>

<script>
import Tag from '../../components/md/Tag/Tag.md'
import TagBaseCode from '../../components/md/Tag/TagBaseCode.md'
export default {
    data(){
        return {
             handbook:Tag,
             handBaseCode:TagBaseCode,
        }
    },
    components:{
        Tag,
        TagBaseCode
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