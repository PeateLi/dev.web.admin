<template>
  <div>
    <el-dialog title="设置别名" :visible.sync="isShow" @close="setMfgAlias">
      <el-table
        :data="gridData"
        border
        :header-cell-style="{background:'#525A67',color:'#fff'}"
        v-loading="loadingTable"
        @row-dblclick="ActiveRow"
        @cell-click="EditData"
        :row-class-name="tableRowClassName"
        @selection-change="TableIsCheck"
        ref="multipleTable"
      >
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column prop="mfgID" label="ID">
          <template slot-scope="scope">
            <div :class="scope.row.isChecked? 'active-row' :''">{{scope.row.mfgID }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="mfgName" label="别名名称">
          <template slot-scope="scope">
            <div :class="scope.row.isChecked? 'active-row' :''">
              <span v-if="scope.row.index === tabClickIndex && tabClickLabel === '别名名称'">
                <el-input v-model="scope.row.mfgName" size="mini" @blur="inputBlur" />
              </span>
              <span v-else>{{scope.row.mfgName }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <Pagination
          @getChangeSize="getChangeSize"
          @getChangePage="getChangePage"
          :nowPage="NowPageSize"
          :ShowList="showPageSize"
          :total="total"
          :showPageSizeArr="showPageSizeArr"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GetMFGOctopart } from "../../../../api/ProductManage";
import axios from "axios";
export default {
  components: {
    Pagination: () => import("../../../../components/Pagination/Pagination") //分页组件
  },
  data() {
    return {
      gridData: [],
      total: 0, //数据总量
      showPageSize: 10, //每页显示多少数据
      NowPageSize: 1, //当前第几页+
      showPageSizeArr: [5, 10, 15, 20, 25],
      loadingTable: true, //表格loading
      isShow: this.isDialog,
      tabClickIndex: null, // 点击的单元格
      tabClickLabel: "", // 当前点击的列名Label
      checkActiveDataRow: [], //多选表格列数据
      activeDataRow: []
    };
  },
  props: {
    isDialog: {
      type: Boolean,
      default: false
    },
    AddNameRow: {}
  },
  methods: {
    getChangePage(val) {
      //接收分页子组件传过来的页数
      let _this = this;
      _this.NowPageSize = val;
      _this.GetDbControl();
    },
    getChangeSize(val) {
      //接收分页子组件传过来的页数
      let _this = this;
      _this.showPageSize = val;
      _this.GetDbControl();
    },
    GetMFGOctoparts() {
      //获取所有别名
      let _this = this;
      GetMFGOctopart({
        page: _this.NowPageSize,
        limit: _this.showPageSize
      })
        .then(res => {
          _this.total = res.count;
          _this.gridData = res.data.resultList;
          _this.loadingTable = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      // debugger;  //进入debugger
      row.index = rowIndex;
    },
    ActiveRow(row) {
      //表格选中行通过isChecked动态切换class
      let _this = this;
      _this.activeDataRow = row; //因为前面的方法把每个下标都加进了row  所以只是row有分别每行的下标
      if (_this.gridData[row.index].isChecked == true) {
        //点击行通过下标改变样式
        _this.gridData[row.index].isChecked = false;
      } else {
        _this.gridData[row.index].isChecked = true;
      }
      this.$refs.multipleTable.toggleRowSelection(_this.activeDataRow);
    },
    TableIsCheck(val) {
      //表格多选选中事件   通过isChecked动态切换class
      let _this = this;
      _this.checkActiveDataRow = val;
      let indexArr = []; //用于存放多选按钮选中行的下标
      for (let index = 0; index < _this.gridData.length; index++) {
        //把所有的isCheck初始值设为false 为了避免多选取消选中后 行还持续高亮
        _this.gridData[index].isChecked = false;
      }
      for (let index = 0; index < val.length; index++) {
        //循环表里多选选中的
        const element = val[index];
        let i = _this.gridData.findIndex(x => {
          //通过每个对象的index查找到在gridData所属位置然后将下标放进数组
          return x.index == element.index;
        });
        indexArr.push(i);
      }
      indexArr.forEach(e => {
        //遍历放下标的数组然后修改isCheck
        _this.gridData[e].isChecked = true;
      });
    },
    EditData(row, column, cell, event) {
      //双击单元格修改数据
      switch (column.label) {
        case "ID":
          this.tabClickIndex = row.index;
          this.tabClickLabel = column.label;
          break;
        case "别名名称":
          this.tabClickIndex = row.index;
          this.tabClickLabel = column.label;
          break;
        default:
          return;
      }
    },
    inputBlur(row, event, column) {
      // 失去焦点初始化
      let _this = this;
      this.tabClickIndex = null;
      this.tabClickLabel = "";
    },
    setMfgAlias() {
      let _this = this;
      let activeName = _this.checkActiveDataRow.map(x => {
        return x.mfgName;
      });
      let str = "";
      for (let i = 0; i < activeName.length; i++) {
        const element = activeName[i];
        str += element + ";";
      }
      _this.AddNameRow.mfgAlias = str.substring(0, str.length - 1);
      _this.$emit("hideDialog", false, _this.AddNameRow);
      _this.$refs.multipleTable.clearSelection();
    }
  },
  mounted() {
    let _this = this;
    _this.GetMFGOctoparts();
  },
  watch: {
    isDialog(val) {
      let _this = this;
      if (val == true) {
        _this.$nextTick(function() {
          //通过监听 默认选中 表格别名
          if (this.AddNameRow.mfgAlias.indexOf("[") != -1) {
            this.AddNameRow.mfgAlias = JSON.parse(this.AddNameRow.mfgAlias)
              .join()
              .replace(/,/g, ";");
          }
          for (
            let index = 0;
            index < this.AddNameRow.mfgAlias.split(";").length;
            index++
          ) {
            const element = this.AddNameRow.mfgAlias.split(";")[index];
            this.gridData.forEach((e, i) => {
              if (e.mfgName == element) {
                this.gridData[i].isChecked = true;
                console.log(this.gridData[i]);
                _this.$refs.multipleTable.toggleRowSelection(this.gridData[i]);
              }
            });
          }
        });
        this.isShow = true;
      }
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.getElementsByClassName("el-input__inner")[0].focus();
      }
    }
  }
};
</script>


<style lang="less" scoped>
.page {
  text-align: center;
  margin: 15px 0px;
}
.active-row {
  background-color: #ebb563 !important;
  color: #fff;
}
</style>
