### Pagination 分页

<font face="黑体" color=#5E6D82 size=2>当数据量过多时，使用分页分解数据。</font>

#### 用法
<font face="黑体" color=red size=2>使用了GetChangeSize和GetChangePage事件来处理页码大小和当前页变动时候触发的事件。showSizeArr接受一个整型数组，数组元素为展示的选择每页显示个数的选项，[100, 200, 300, 400]表示四个选项，每页显示 100 个，200 个，300 个或者 400 个。total表示总条目数，showSize用于设置每页显示的页码数量。</font>

#### Pagination Attributes
| 参数 | 说明 | 类型	 | 可选值 | 默认值 |
| :-----| :----: | :----: | :----: | :----: |
| page | 单前页数 | Number | — | 1 |
| showSizeArr | 每页显示数量选项 | Array | — | [5, 10, 15, 20,25] |
| showSize |  每页显示数量 | Number | — | 5 |
| showLayout |  分页显示功能 | String | — | 'total, sizes, prev, pager, next, jumper' |
| total |  总数量 | Number | — | 0 |

#### Pagination Events
| 事件名称 | 说明 | 回调参数 |
| :-----| :----: | :----: |
| GetChangeSize| 当每页显示多少条的数量改变时 | 返回新的显示数量条数 |
| GetChangePage| 当跳转页数的时候触发的事件 | 返回新的页数 |



<font face="黑体" color=black size=4>Pagination 示例</font>