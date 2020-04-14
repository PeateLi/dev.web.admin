```
import Pagination from './components/Pagination'


<template>
    <div>
        <Pagination
          @getChangeSize='getChangeSize'
          @getChangePage="getChangePage"
          :nowPage="NowPageSize"
          :ShowList="showPageSize"
          :total="total"
          :showPageSizeArr='showPageSizeArr'
        />
    </div>
</template>

<script>
export default {
    data(){
        return {
            total: 0, //数据总量
                showPageSize: 10, //每页显示多少数据
                NowPageSize: 1, //当前第几页
                showPageSizeArr:[5,10,15,20,25],
           }
    },
    methods:{
        getChangePage(val) {
        //接收分页子组件传过来的页数
        let _this = this;
        _this.NowPageSize = val;
        },
        getChangeSize(val){
        let _this = this;
        _this.showPageSize = val;
        },
    }
}
</script>

</style>
```
