```
import Table from './components/Table'

<template>
    <Table :TableData="TableData" 
        :header="tableHeader" 
        :option="tableOption" 
        @getEditData='getEditData' 
        @getCheckData='getCheckData'
        @getSearchData='getSearchData'>
        <el-table-column slot="fixed" align="center" fixed prop="check" label="多选"  width="50" type="selection"></el-table-column>
    </Table>
</template>


<script>
export default {
    data(){
        return{
            TableData:[{    //表格数据
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
          tableHeader:[{    //表头的prop对应表头数组对象的key值
          prop: "date",
          label: "日期",
          minWidth:'240',
          isEdit:false,  //点击单元格是否可以修改
          isSearch：'',//用户模糊查询时绑定
          isFiltersType:'time', //是否需要过滤 格式为时间格式过滤
          isSelect：true  //点击编辑的时候是否需要下拉菜单 需要传数组
          SelectArr:[]  //需要下拉菜单的话 传下拉菜单选项数组
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
        tableOption:{}  //表格设置 可以设置宽高
        }
    }
}

</script>
```