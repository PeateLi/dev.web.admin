### Table 表格

<font face="黑体" color=#5E6D82 size=2>用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。</font>

#### 用法
<font face="黑体" color=red size=2>使用SelectOption定义下拉菜单的选项。以及activeSelect设置默认选中值</font>

#### Table Attributes
| 参数 | 说明 | 类型	 | 可选值 | 默认值 |
| :-----| :----: | :----: | :----: | :----: |
| TableData | 表格数据 | Array | — | [] |
| header | 表格头部 | Array | — | [] |
| option |  表格选项 | Object | — | {} |

#### Table Events
| 事件名称 | 说明 | 回调参数 |
| :-----| :----: | :----: |
| getEditData| 表格单元格发生修改后 | 返回修改前，修改后，修改行的下标 |
| getCheckData| 表格行选中 | 返回选中行以及选中行的下标 |
| getSearchData| 表格模糊查询 | 返回查询字段 |



<font face="黑体" color=black size=4>Table 示例</font>