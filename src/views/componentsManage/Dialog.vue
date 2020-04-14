<template>
    <div>
       <el-card class="box-card">
              <mavon-editor class="md" v-html="handbook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            <el-card style="margin-top:20px;">
            <h3>基础用法:</h3>
            <span class="desc">Dialog 弹出一个对话框，适合需要定制性更大的场景。</span>
                <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

                <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <span>这是一段信息</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
                </el-dialog>
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
import Dialog from '../../components/md/Dialog/Dialog.md'
import DialogBaseCode from '../../components/md/Dialog/DialogBaseCode.md'
export default {
    data(){
        return {
            handbook:Dialog,
            handBaseCode:DialogBaseCode,
            dialogVisible: false
        }
    },
    components:{
        Dialog,
        DialogBaseCode
    },
    methods:{
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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