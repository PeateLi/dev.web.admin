<template>
  <div>
    <el-table :data="AddTableData" border style="width: 100%" :show-header="false"  
    @selection-change="TableIsCheck"
     ref="multipleTable">
      <el-table-column width="50" align="center" type="selection"></el-table-column>
      <el-table-column prop="mfgID" width="135">
        <template slot-scope="scope">
     
        </template>
      </el-table-column>
      <el-table-column prop="mfgName" width="170">
        <template slot-scope="scope">
          <div>
            <el-input v-model="scope.row.mfgName" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="mfgAlias" width="175" align="center">
        <template slot-scope="scope">
          <div>
              <el-button 
              v-if='scope.row.mfgAlias =="" || scope.row.mfgAlias == null' 
              type="primary" 
              size="mini" 
              round 
              @click="setMfgAlias(scope.row)">设置别名</el-button>
             <el-popover
                v-else
                placement="top-start"
                width="200"
                trigger="hover">
                  <el-tag 
                  style="margin:1px 1px;" 
                  :key="item"  v-for="item in scope.row.mfgAlias.split(';')"
                  size="small" 
                  @click="setMfgAlias(scope.row)" >{{item}}</el-tag>
                  <el-tag slot="reference" :key="item"  v-for="item in scope.row.mfgAlias.split(';')" size="small" @click="setMfgAlias(scope.row)" >{{item}}</el-tag>
            </el-popover>
          
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="mfgIconPath" width="175">
        <template slot-scope="scope">
          <div>
            <el-input v-model="scope.row.mfgIconPath" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="mfgUrl" width="210">
        <template slot-scope="scope">
          <div>
            <el-input v-model="scope.row.mfgUrl" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="description">
        <template slot-scope="scope">
          <div>
            <el-input v-model="scope.row.description" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" width="180">
        
      </el-table-column>
      <el-table-column prop="updateTime" width="180">
        
      </el-table-column>
    </el-table>
    <div class="right">
      <el-button  type="primary" @click="submitAdd" round>保存</el-button>
      <el-button  @click="resetAdd" round>取消</el-button>
      
    </div>
    <AddMfgOctiparts :AddNameRow='isAddNameArr' :isDialog='isDialog' @hideDialog='hideDialog' />
  </div>
</template>

<script>
import { AddBrands} from '../../../../api/ProductManage'
import axios from 'axios'
export default {
  data() {
    return {
        sumbitData:[],
        isDialog:false,
        isAddNameArr:[]
    };
  },
  
  props: {
    AddTableData: {
      type: Array,
      default: []
    }
  },
  components:{
    AddMfgOctiparts:() => import('./AddMfgOctipart')
  },
  methods: {
    setMfgAlias(row){  //设置别名显示别名弹窗
           let _this = this
           _this.isDialog = true
           _this.isAddNameArr = row
    },
    TableIsCheck(val){  //选中需要提交的
        this.sumbitData = val
    },
    submitAdd(){   //提交
        let _this = this
        console.log(JSON.stringify(this.sumbitData))
       AddBrands(JSON.stringify(this.sumbitData))
       .then(res => {
           if(res.code == 1000){
               _this.$message({
                   type:'success',
                   message:res.msg
               })
               _this.$emit('hideAdd',false)
               
           }else{

                _this.$message({
                   type:'warning',
                   message:'还未选择新增项'+res.msg
               })
           }
       })
       .catch(error => {
            _this.$message.error('请求出错'+error)
       })
    },
    resetAdd(){
        let _this = this
        _this.$emit('hideAdd',false)
    },
    hideDialog(val,data){   //隐藏别名弹窗
            let _this = this
            _this.isDialog = val
            _this.sumbitData[ _this.isAddNameArr.index] = data
            _this.isAddNameArr = ''
        }
  },
};
</script>

<style lang="less" scoped>
.right {
  padding: 5px 0px;
  text-align: center;
  border: 1px solid #ccc;
  border-top: 0px;
}
/deep/ .cell {
  padding: 5px 0px !important;
}
</style>