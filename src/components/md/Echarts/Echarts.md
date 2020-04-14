### Echarts 可视化图标

<font face="黑体" color=#5E6D82 size=2>使用HighCharts进行二次封装</font>

#### 用法
<font face="黑体" color=red size=2>配置option以及传输id</font>

#### Dropdown Attributes
| 参数 | 说明 | 类型	 | 可选值 | 默认值 |
| :-----| :----: | :----: | :----: | :----: |
| id | 图表唯一Id | String | — | — |
| option | 配置图表选项 | Object | — | — |
| time |  time是用来动态更新子组件的。比如options的参数很多都是通过数据交互从后台取回来的，或者按钮之间来回切换显示不同的图表。如果没有加time监听只会显示第一次加载的图标。所以通过定义time着参数，当数据有变化时，可以通过props传递一个时间戳就会更新。 | String | — | — |



<font face="黑体" color=black size=4>Dropdown 示例</font>