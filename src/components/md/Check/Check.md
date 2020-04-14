### Checkbox 多选按钮租

<font face="黑体" color=#5E6D82 size=2>适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。</font>

#### 用法
<font face="黑体" color=red size=2>checkbox-group元素能把多个 checkbox 管理为一组，只需要在 Group 中使用v-model绑定Array类型的变量即可。 checkbox 的 label属性是该 checkbox 对应的值，若该标签中无内容，则该属性也充当 checkbox 按钮后的介绍。label与数组中的元素值相对应，如果存在指定的值则为选中状态，否则为不选中。</font>

#### Checkbox Attributes
| 参数 | 说明 | 类型	 | 可选值 | 默认值 |
| :-----| :----: | :----: | :----: | :----: |
| CheckOption | 多选按钮组数据 | Array | — | [] |
| isDisabled | 是否禁用 | Boolean | — | false |
| checkList | 选中数据或者也可以理解为父组件传过来的默认选中值 | Array | — | [] |
| isBorder | 多选按钮是否有边框线 | Boolean | — | false |
| checkSize | 多选按钮尺寸 | String | medium / small / mini | — |

#### Checkbox Events
| 事件名称 | 说明 | 回调参数 |
| :-----| :----: | :----: |
| GetChangeCheck| 当绑定值变化时触发的事件 | 更新后的值 |


<font face="黑体" color=black size=4>Checkbox 示例</font>
