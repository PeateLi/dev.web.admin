### Radio  单选框

<font face="黑体" color=#5E6D82 size=2>在一组备选项中进行单选</font>

#### 用法
<font face="黑体" color=red size=2>结合el-radio-group元素和子元素el-radio可以实现单选组，在el-radio-group中绑定v-model，在el-radio中设置好label即可，无需再给每一个el-radio绑定变量，另外，还提供了change事件来响应变化，它会传入一个参数value。</font>

#### Radio Attributes
| 参数 | 说明 | 类型	 | 可选值 | 默认值 |
| :-----| :----: | :----: | :----: | :----: |
| RadioOptions | 单选按钮组数据 | Array | — | [] |
| isDisabled | 是否禁用 | Boolean | — | false |
| activeRadio | 选中数据或者也可以理解为父组件传过来的默认选中值 | Array | — | [] |
| isBorder | 单选按钮是否有边框线 | Boolean | — | false |
| RadioSize | 单选按钮尺寸 | String | medium / small / mini | — |

#### Radio Events
| 事件名称 | 说明 | 回调参数 |
| :-----| :----: | :----: |
| GetChangeRadio| 当绑定值变化时触发的事件 | 更新后的值 |


<font face="黑体" color=black size=4>Radio 示例</font>
