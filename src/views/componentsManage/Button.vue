<template>
    <div>
         <el-card class="box-card">
           <mavon-editor class="md" v-html="handbook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
           <el-card style="margin-top:20px;">
            <h3>基础用法:</h3>
            <span class="desc">基础的按钮用法。使用type、plain、round和circle属性来定义 Button 的样式。</span>
                <el-row>
                <el-button>默认按钮</el-button>
                <el-button type="primary">主要按钮</el-button>
                <el-button type="success">成功按钮</el-button>
                <el-button type="info">信息按钮</el-button>
                <el-button type="warning">警告按钮</el-button>
                <el-button type="danger">危险按钮</el-button>
                </el-row>

                <el-row>
                <el-button plain>朴素按钮</el-button>
                <el-button type="primary" plain>主要按钮</el-button>
                <el-button type="success" plain>成功按钮</el-button>
                <el-button type="info" plain>信息按钮</el-button>
                <el-button type="warning" plain>警告按钮</el-button>
                <el-button type="danger" plain>危险按钮</el-button>
                </el-row>

                <el-row>
                <el-button round>圆角按钮</el-button>
                <el-button type="primary" round>主要按钮</el-button>
                <el-button type="success" round>成功按钮</el-button>
                <el-button type="info" round>信息按钮</el-button>
                <el-button type="warning" round>警告按钮</el-button>
                <el-button type="danger" round>危险按钮</el-button>
                </el-row>

                <el-row>
                <el-button icon="el-icon-search" circle></el-button>
                <el-button type="primary" icon="el-icon-edit" circle></el-button>
                <el-button type="success" icon="el-icon-check" circle></el-button>
                <el-button type="info" icon="el-icon-message" circle></el-button>
                <el-button type="warning" icon="el-icon-star-off" circle></el-button>
                <el-button type="danger" icon="el-icon-delete" circle></el-button>
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

            <el-card style="margin-top:20px;">
            <h3>禁用状态:</h3>
            <span class="desc">按钮不可用状态。</span>
                <el-row>
                <el-button disabled>默认按钮</el-button>
                <el-button type="primary" disabled>主要按钮</el-button>
                <el-button type="success" disabled>成功按钮</el-button>
                <el-button type="info" disabled>信息按钮</el-button>
                <el-button type="warning" disabled>警告按钮</el-button>
                <el-button type="danger" disabled>危险按钮</el-button>
                </el-row>

                <el-row>
                <el-button plain disabled>朴素按钮</el-button>
                <el-button type="primary" plain disabled>主要按钮</el-button>
                <el-button type="success" plain disabled>成功按钮</el-button>
                <el-button type="info" plain disabled>信息按钮</el-button>
                <el-button type="warning" plain disabled>警告按钮</el-button>
                <el-button type="danger" plain disabled>危险按钮</el-button>
                </el-row>

            </el-card>
           <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <el-button type="text">查看代码</el-button>
                </template>
               <mavon-editor class="md" v-html="handDisabledCode" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            </el-collapse-item>
            </el-collapse>

            <el-card style="margin-top:20px;">
            <h3>文字按钮:</h3>
            <span class="desc">没有边框和背景色的按钮。</span>
                <el-button type="text" >文字按钮</el-button>
                <el-button  type="text" disabled>文字按钮</el-button>
            </el-card>
           <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <el-button type="text">查看代码</el-button>
                </template>
               <mavon-editor class="md" v-html="handTextCode" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            </el-collapse-item>
            </el-collapse>

            <el-card style="margin-top:20px;">
            <h3>图标按钮:</h3>
            <span class="desc">带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。</span>
                <el-button type="primary" icon="el-icon-edit"></el-button>
                <el-button type="primary" icon="el-icon-share"></el-button>
                <el-button type="primary" icon="el-icon-delete"></el-button>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
            </el-card>
           <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <el-button type="text">查看代码</el-button>
                </template>
               <mavon-editor class="md" v-html="handIconCode" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            </el-collapse-item>
            </el-collapse>

            <el-card style="margin-top:20px;">
            <h3>不同尺寸:</h3>
            <span class="desc">Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。</span>
               <el-row>
                <el-button>默认按钮</el-button>
                <el-button size="medium">中等按钮</el-button>
                <el-button size="small">小型按钮</el-button>
                <el-button size="mini">超小按钮</el-button>
                </el-row>
                <el-row>
                <el-button round>默认按钮</el-button>
                <el-button size="medium" round>中等按钮</el-button>
                <el-button size="small" round>小型按钮</el-button>
                <el-button size="mini" round>超小按钮</el-button>
                </el-row>
            </el-card>
           <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <el-button type="text">查看代码</el-button>
                </template>
               <mavon-editor class="md" v-html="handSizeCode" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>

<script>
import Button from '../../components/md/Button/Button.md'
import ButtonBaseCode from '../../components/md/Button/ButtonBaseCode.md'
import ButtonDisabledCode from '../../components/md/Button/ButtonDisabledCode.md'
import ButtonTextCode from '../../components/md/Button/ButtonTextCode.md'
import ButtonIconCode from '../../components/md/Button/ButtonIconCode.md'
import ButtonSizeCode from '../../components/md/Button/ButtonSizeCode.md'
export default {
    data(){
        return {
        handbook: Button,
        handBaseCode:ButtonBaseCode,
        handDisabledCode:ButtonDisabledCode,
        handTextCode:ButtonTextCode,
        handIconCode:ButtonIconCode,
        handSizeCode:ButtonSizeCode
        }
    },
    components:{
        Button,
        ButtonBaseCode,
        ButtonDisabledCode,
        ButtonTextCode,
        ButtonIconCode,
        ButtonSizeCode
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
