<template>
    <div>

    <el-card class="box-card">
           <mavon-editor class="md" v-html="handbook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
           <el-card style="margin-top:20px;">
            <h3>基础用法:</h3>
            <span class="desc">适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。</span>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="复选框 A"></el-checkbox>
                        <el-checkbox label="复选框 B"></el-checkbox>
                        <el-checkbox label="复选框 C"></el-checkbox>
                        <el-checkbox label="复选框 D"></el-checkbox>
                        <el-checkbox label="复选框 E"></el-checkbox>
                    </el-checkbox-group>
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
            <h3>多选禁用以及带有边框线和按钮尺寸</h3>
            <span class="desc" style="margin-bottom:0px;">多选按钮禁用，边框线，尺寸需要配合isBorder使用</span>
            <span class="desc">按钮组可以全部禁用以及某个禁用，全部禁用需要使用isDisabled 单个禁用贼需要在按钮数据组数组对象中增加一个disabled:true</span>
                    <div>
                        <el-checkbox v-model="checked1" label="备选项1" border></el-checkbox>
                        <el-checkbox v-model="checked2" label="备选项2" border></el-checkbox>
                    </div>
                    <div style="margin-top: 20px">
                        <el-checkbox v-model="checked3" label="备选项1" border size="medium"></el-checkbox>
                        <el-checkbox v-model="checked4" label="备选项2" border size="medium"></el-checkbox>
                    </div>
                    <div style="margin-top: 20px">
                        <el-checkbox-group v-model="checkboxGroup1" size="small">
                        <el-checkbox label="备选项1" border></el-checkbox>
                        <el-checkbox label="备选项2" border disabled></el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div style="margin-top: 20px">
                        <el-checkbox-group v-model="checkboxGroup2" size="mini" disabled>
                        <el-checkbox label="备选项1" border></el-checkbox>
                        <el-checkbox label="备选项2" border></el-checkbox>
                        </el-checkbox-group>
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
import Check from '../../components/md/Check/Check.md'
import CheckBaseCode from '../../components/md/Check/CheckBaseCode.md'
import CheckBorderAndDs from '../../components/md/Check/CheckBorderAndDs.md'
export default {
    data(){
        return {
            handbook:Check,
            handBaseCode:CheckBaseCode,
            handBorderDsCode:CheckBorderAndDs,
            checkList:['复选框 E','复选框 A'],
            checked1: true,
            checked2: false,
            checked3: false,
            checked4: true,
            checkboxGroup1: [],
            checkboxGroup2: []
        }
    },
    components:{
        Check,
        CheckBaseCode,
        CheckBorderAndDs
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