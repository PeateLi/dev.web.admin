### Select 选择器

<font face="黑体" color=#5E6D82 size=2>当选项过多时，使用下拉菜单展示并选择内容。</font>

#### 用法
<font face="黑体" color=red size=2>使用SelectOption定义下拉菜单的选项。以及activeSelect设置默认选中值</font>

#### Select Attributes
| 参数 | 说明 | 类型	 | 可选值 | 默认值 |
| :-----| :----: | :----: | :----: | :----: |
| SelectOption | 下拉菜单选择项 | Array | — | [] |
| isDisabled | 是否禁用下拉菜单 | Boolean | — | false |
| isClearable |  是否带清空 | Boolean | — | false |
| isFilterable |  是否可模糊查询 | Boolean | — | false |
| isMultiple |  是否可以多选 | Boolean | — | false |
| activeSelect |  多选默认值 | String | — | '' |

#### Select Events
| 事件名称 | 说明 | 回调参数 |
| :-----| :----: | :----: |
| ChangeSelect| 下拉菜单发生改变选中时返回自定义方法 | 返回选中选项 |



<font face="黑体" color=black size=4>Select 示例</font>