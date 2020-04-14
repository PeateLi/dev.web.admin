<template>
    <div>

    <el-card class="box-card">
           <mavon-editor class="md" v-html="handbook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
           <el-card style="margin-top:20px;">
            <h3>基础用法:</h3>
            <span class="desc">由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。</span>
                     <el-radio v-model="radio" label="1">备选项 1</el-radio>
                     <el-radio v-model="radio" label="2">备选项 2</el-radio>
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
            <h3>单选禁用以及带有边框线和按钮尺寸</h3>
            <span class="desc" style="margin-bottom:0px;">单选按钮禁用，边框线，尺寸需要配合isBorder使用</span>
            <span class="desc">按钮组可以全部禁用以及某个禁用，全部禁用需要使用isDisabled 单个禁用贼需要在按钮数据组数组对象中增加一个disabled:true</span>
                    <div>
                        <el-radio v-model="radio1" label="1" border>备选项1</el-radio>
                        <el-radio v-model="radio1" label="2" border>备选项2</el-radio>
                    </div>
                    <div style="margin-top: 20px">
                        <el-radio v-model="radio2" label="1" border size="medium">备选项1</el-radio>
                        <el-radio v-model="radio2" label="2" border size="medium">备选项2</el-radio>
                    </div>
                    <div style="margin-top: 20px">
                        <el-radio-group v-model="radio3" size="small">
                        <el-radio label="1" border>备选项1</el-radio>
                        <el-radio label="2" border disabled>备选项2</el-radio>
                        </el-radio-group>
                    </div>
                    <div style="margin-top: 20px">
                        <el-radio-group v-model="radio4" size="mini" disabled>
                        <el-radio label="1" border>备选项1</el-radio>
                        <el-radio label="2" border>备选项2</el-radio>
                        </el-radio-group>
                    </div>
            </el-card>
           <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <el-button type="text">查看代码</el-button>
                </template>
               <mavon-editor class="md" v-html="handBorderDsCode" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            </el-collapse-item>
            </el-collapse>

        </el-card>

        
    </div>
</template>

<script>
import Radio from '../../components/md/Radio/Radio.md'
import RadioBaseCode from '../../components/md/Radio/RadioBaseCode.md'
import RadioBorderAndDs from '../../components/md/Radio/RadioBorderAndDs.md'
export default {
    data(){
        return {
            handbook:Radio,
            handBaseCode:RadioBaseCode,
            handBorderDsCode:RadioBorderAndDs,
            radio: '',
            radio1: '1',
            radio2: '1',
            radio3: '1',
            radio4: '1'
        }
    },
    components:{
        Radio,
        RadioBaseCode,
        RadioBorderAndDs
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