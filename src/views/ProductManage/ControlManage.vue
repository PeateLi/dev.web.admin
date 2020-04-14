<template>
    <div>
        <div class="db-manage">
            <db-manage></db-manage> 
        </div>
        <div class="monggo-manage">
            <!-- <mong-go-manage></mong-go-manage> -->
           
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
          
        }
    },
    components:{
         DbManage:() => import("./components/Control/DbManage"),//数据库库存
         MongGoManage:() => import("./components/Control/MongGoManage"),//Monggo库存
    },
    data () {
    return {
      tableOption: {
        border: true,
        maxHeight: 500
      },
      tableHeader: [{
        prop: 'name',
        label: '姓名',
        sortable: true,
        sortMethod: this.handleNameSort
      }, {
        prop: 'province',
        label: '省份',
        minWidth: '120'
      }, {
        prop: 'city',
        label: '市区',
        minWidth: '120'
      }, {
        prop: 'address',
        label: '地区',
        minWidth: '150'
      }, {
        prop: 'zip',
        label: '邮编',
        minWidth: '120'
      }],

      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
       
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    handleNameSort () {
      console.log('handleNameSort')
    }
  },
}
</script>

<style lang="less" scoped>

</style>