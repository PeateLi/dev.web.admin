<template>
    <div>
            <el-dialog title="制造商品牌属性" :visible.sync="dialogTableVisible" @close='isHide'>
                <el-table :data="gridData" border @cell-click='EditData'>
                    <el-table-column property="pid" label="ID" align="center" width="60"></el-table-column>
                    <el-table-column property="attributeName" label="属性名" >
                    <template slot-scope="scope">
                        <div>
                             <span v-if="scope.row.attributeID === tabClickIndex && tabClickLabel === '属性名'">
                                <el-input v-focus v-model="scope.row.attributeName" size="mini" @blur="inputBlur"/>
                            </span>
                            <span v-else>{{scope.row.attributeName }}</span>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column property="attributeValue" label="属性值">
                         <template slot-scope="scope">
                        <div>
                             <span v-if="scope.row.attributeID === tabClickIndex && tabClickLabel === '属性值'">
                                <el-input v-focus v-model="scope.row.attributeValue" size="mini" @blur="inputBlur(scope.row)"/>
                            </span>
                            <span v-else>{{scope.row.attributeValue }}</span>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column property="attributeID" label="属性ID"></el-table-column>
                </el-table>
            </el-dialog>
    </div>
</template>


<script>
import { GetAttributeByMFG } from '../../../../api/ProductManage'
import axios from 'axios'
export default {
    data(){
        return {
            dialogTableVisible:this.isDialog,
            gridData:[],
            tabClickIndex: null, // 点击的单元格
            tabClickLabel: '', // 当前点击的列名Label
        }
    },
    props:{
        active:{},
        isDialog:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        GetAttribute(){
            let _this = this
            GetAttributeByMFG({
                MFGPartNo:_this.active.mfgPartNo
            })
            .then(res => {
                _this.gridData =  res.data
            })
            .catch(error => {
                console.log(error)
            })

        },
        isHide(){  //弹窗关闭事件
                let _this = this
                _this.$emit('isHide',false)
        },
        EditData(row, column, cell, event){  //单击单元格修改数据
             switch (column.label) {
                case '属性名':
                this.tabClickIndex = row.attributeID
                this.tabClickLabel = column.label
                break
                case '属性值':
                this.tabClickIndex = row.attributeID
                this.tabClickLabel = column.label
                break
                default: return
            }
            // console.log('添加明细原因', this.tabClickIndex, row, column, cell, event)
            },
             inputBlur(row, event, column) {// 失去焦点初始化进行编辑
             let _this = this
            let arr = [row]

                axios.post('/Utmel/Product/EditAttributeById',arr)
                .then(res => {
                    if(res.data.code == 1000){
                         _this.$message({
                            type:'success',
                            message:res.data.msg
                        })
                        _this.tabClickIndex = null
                        _this.tabClickLabel = ''
                    }else{
                        _this.$message({
                            type:'warning',
                            message:res.data.msg
                        })
                    }
                })
                .catch(error => {
                      _this.$message.error('请求出错'+error)
                })
             }
    },
    mounted(){
        let _this = this
        
    },
    watch:{
        isDialog(val){
            if(val == true){
                this.GetAttribute()
                this.dialogTableVisible = true
            }
        }
    },
    directives:{
    focus:{
      inserted:function(el){
        // console.log(el)
        el.getElementsByClassName('el-input__inner')[0].focus()
      }
    }
  }
    
}
</script>


<style lang="less" scoped>
</style>