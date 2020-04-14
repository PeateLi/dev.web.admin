<template>
    <div>
        <el-card class="box-card">
            <mavon-editor class="md" v-html="handbook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
           <el-card style="margin-top:20px;">
            <h3>基础用法:</h3>
            <span class="desc">基础的表格展示用法。</span>
                    <Table :TableData="TableData" 
                    :header="tableHeader" 
                    :option="tableOption" 
                    @getEditData='getEditData' 
                    @getCheckData='getCheckData'
                    @getSearchData='getSearchData'>
                        <el-table-column slot="fixed" align="center" fixed prop="check" label="多选"  width="50" type="selection"></el-table-column>
                    </Table>
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
import TableBook from '../../components/md/Table/Table.md'
import TableBaseCode from '../../components/md/Table/TableBaseCode.md'
export default {
    data(){
        return{
            TableData:[{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          tableHeader:[{
          prop: "date",
          label: "日期",
          minWidth:'240',
          isEdit:false,  //是否可以修改
        },
        {
          prop: "name",
          label: "姓名",
          minWidth:'240',
          isEdit:false,  //是否可以修改
        },
        {
          prop: "address",
          label: "地址",
          minWidth:'240',
          isEdit:false,  //是否可以修改
        }],
        handbook:TableBook,
        handBaseCode:TableBaseCode,
        tableOption:{}
        }
    },
    components:{
        Table:() => import('../../components/Table/Table'),
        TableBook,
        TableBaseCode
    },
    methods:{
        getEditData(){

        },
        getCheckData(){

        },
        getSearchData(){

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
/deep/ td .cell {
  padding: 0px;
  line-height: 40px;
  text-indent: 10px;
}
/deep/ td:first-child .cell {
  text-indent: 0px;
  padding-left: 0px !important;
}
/deep/ .el-table__row td {
  padding: 0px !important;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ebb563 !important;
  border-color: #ebb563 !important;
}
</style>
