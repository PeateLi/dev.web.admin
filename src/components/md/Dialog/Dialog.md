### Dialog 对话框

<font face="黑体" color=#5E6D82 size=2>在保留当前页面状态的情况下，告知用户并承载相关操作。</font>

#### 用法
<font face="黑体" color=red size=2>通过事件触发修改bool值控制弹窗隐藏显示</font>

#### Dialog Attributes
| 参数 | 说明 | 类型	 | 可选值 | 默认值 |
| :-----| :----: | :----: | :----: | :----: |
| DialogTitle | 弹窗标题设置 | String | — | '' |
| isShowDialog | 控制弹窗显示隐藏 | Boolean | — | false |
| isCenter | 弹窗内容是否居中 | Boolean | — | false |
| DialogWidth | 弹窗宽度 | String | — | '' |
| isShowClosse | 是否显示关闭 | Boolean | — | false |
| closeOnModal | 点击背景是否可以关闭 | Boolean | — | true |
| closeOnEscape | 按esc是否可以关闭 | Boolean | — | true |

#### Dialog Events
| 事件名称 | 说明 | 回调参数 |
| :-----| :----: | :----: |
| CloseDialog| 当弹窗关闭触发的事件 | 返回false |


<font face="黑体" color=black size=4>Dialog 示例</font>