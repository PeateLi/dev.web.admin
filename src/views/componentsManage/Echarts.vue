<template>
    <div>
        <el-card class="box-card">
            <mavon-editor class="md" v-html="handbook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            <el-card style="margin-top:20px;">
            <h3>饼图:</h3>
            <span class="desc">饼图以扇区的形式显示每一个数值相对于总数值的大小。</span>
            <div id="pre" style="min-width:400px;height:400px"></div>
            </el-card>
           <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <el-button type="text">查看代码</el-button>
                </template>
               <mavon-editor class="md" v-html="handPreCodebook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            </el-collapse-item>
            </el-collapse>

            <el-card style="margin-top:20px;">
            <h3>柱形图:</h3>
            <span class="desc">柱状图是用竖直的柱子来展现数据，一般用于展现横向的数据变化及对比。</span>
            <div id="column" style="min-width:400px;height:400px"></div>
            </el-card>
           <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <el-button type="text">查看代码</el-button>
                </template>
               <mavon-editor class="md" v-html="handColumnCodebook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            </el-collapse-item>
            </el-collapse>


            <el-card style="margin-top:20px;">
            <h3>条形图:</h3>
            <span class="desc">条形图是用横向的柱子来展现数据，一般用于纵向的数据排名及对比。</span>
            <div id="bar" style="min-width:400px;height:400px"></div>
            </el-card>
           <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <el-button type="text">查看代码</el-button>
                </template>
               <mavon-editor class="md" v-html="handBarCodebook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            </el-collapse-item>
            </el-collapse>


            <el-card style="margin-top:20px;">
            <h3>环形图:</h3>
            <span class="desc">环形图可以让饼图展示多个系列的数据</span>
            <div id="doughnut" style="min-width:400px;height:400px"></div>
            </el-card>
           <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <el-button type="text">查看代码</el-button>
                </template>
               <mavon-editor class="md" v-html="handDoughnutCodebook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            </el-collapse-item>
            </el-collapse>

            <el-card style="margin-top:20px;">
            <h3>折线图:</h3>
            <span class="desc">折线图是用曲线将一系列的数据点连接的图表。</span>
            <div id="line" style="min-width:400px;height:400px"></div>
            </el-card>
           <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <el-button type="text">查看代码</el-button>
                </template>
               <mavon-editor class="md" v-html="handLineCodebook" :subfield="false" :toolbarsFlag="false" :boxShadow="false" :ishljs="true" />
            </el-collapse-item>
            </el-collapse>


        </el-card>
    </div>
</template>


<script>
import Highcharts from "highcharts"
import Echarts from '../../components/md/Echarts/Echarts.md'
import EchartsBarCode from '../../components/md/Echarts/EchartsBarCode.md'
import EchartsColumnCode from '../../components/md/Echarts/EchartsColumnCode.md'
import EchartsDoughnutCode from '../../components/md/Echarts/EchartsDoughnutCode.md'
import EchartsLineCode from '../../components/md/Echarts/EchartsLineCode.md'
import EchartsPreCode from '../../components/md/Echarts/EchartsPreCode.md'
export default {
    data(){
        return {
            handbook:Echarts,
            handPreCodebook:EchartsPreCode,
            handColumnCodebook:EchartsColumnCode,
            handBarCodebook:EchartsBarCode,
            handDoughnutCodebook:EchartsDoughnutCode,
            handLineCodebook:EchartsLineCode
        }
    },
    methods:{
        pre(){
            Highcharts.chart('pre', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: '2018年1月浏览器市场份额'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: 'Chrome',
                        y: 61.41,
                        // sliced: true,
                        // selected: true
                    }, {
                        name: 'Internet Explorer',
                        y: 11.84
                    }, {
                        name: 'Firefox',
                        y: 10.85
                    }, {
                        name: 'Edge',
                        y: 4.67
                    }, {
                        name: 'Safari',
                        y: 4.18
                    }, {
                        name: 'Sogou Explorer',
                        y: 1.64
                    }, {
                        name: 'Opera',
                        y: 1.6
                    }, {
                        name: 'QQ',
                        y: 1.2
                    }, {
                        name: 'Other',
                        y: 2.61
                    }]
                }]
            });
        },
        column(){
            var chart = Highcharts.chart('column',{
                chart: {
                    type: 'column'
                },
                title: {
                    text: '月平均降雨量'
                },
                subtitle: {
                    text: '数据来源: WorldClimate.com'
                },
                xAxis: {
                    categories: [
                        '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '降雨量 (mm)'
                    }
                },
                tooltip: {
                    // head + 每个 point + footer 拼接成完整的 table
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        borderWidth: 0
                    }
                },
                series: [{
                    name: '东京',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                }, {
                    name: '纽约',
                    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
                }, {
                    name: '伦敦',
                    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
                }, {
                    name: '柏林',
                    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
                }]
            });
        },
        bar(){
            var chart = Highcharts.chart('bar', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: '各洲不同时间的人口条形图'
                    },
                    subtitle: {
                        text: '数据来源: Wikipedia.org'
                    },
                    xAxis: {
                        categories: ['非洲', '美洲', '亚洲', '欧洲', '大洋洲'],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '人口总量 (百万)',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' 百万'
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true,
                                allowOverlap: true // 允许数据标签重叠
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 100,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                        shadow: true
                    },
                    series: [{
                        name: '1800 年',
                        data: [107, 31, 635, 203, 2]
                    }, {
                        name: '1900 年',
                        data: [133, 156, 947, 408, 6]
                    }, {
                        name: '2008 年',
                        data: [973, 914, 4054, 732, 34]
                    }]
                });
        },
        doughnuts(){
            var chart = Highcharts.chart('doughnut', {
                chart: {
                    spacing : [40, 0 , 40, 0]
                },
                title: {
                    floating:true,
                    text: '圆心显示的标题'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        },
                        point: {
                            events: {
                                mouseOver: function(e) {  // 鼠标滑过时动态更新标题
                                    // 标题更新函数，API 地址：https://api.hcharts.cn/highcharts#Chart.setTitle
                                    chart.setTitle({
                                        text: e.target.name+ '\t'+ e.target.y + ' %'
                                    });
                                }
                                //, 
                                // click: function(e) { // 同样的可以在点击事件里处理
                                //     chart.setTitle({
                                //         text: e.point.name+ '\t'+ e.point.y + ' %'
                                //     });
                                // }
                            }
                        },
                    }
                },
                series: [{
                    type: 'pie',
                    innerSize: '80%',
                    name: '市场份额',
                    data: [
                        {name:'Firefox',   y: 45.0, url : 'http://bbs.hcharts.cn'},
                        ['IE',       26.8],
                        {
                            name: 'Chrome',
                            y: 12.8,
                            // sliced: true,
                            // selected: true,
                            url: 'http://www.hcharts.cn'
                        },
                        ['Safari',    8.5],
                        ['Opera',     6.2],
                        ['其他',   0.7]
                    ]
                }]
            }, function(c) { // 图表初始化完毕后的会掉函数
                // 环形图圆心
                var centerY = c.series[0].center[1],
                    titleHeight = parseInt(c.title.styles.fontSize);
                // 动态设置标题位置
                c.setTitle({
                    y:centerY + titleHeight/2
                });
            });
        },
        line(){
            var chart = Highcharts.chart('line', {
                title: {
                    text: '2010 ~ 2016 年太阳能行业就业人员发展情况'
                },
                subtitle: {
                    text: '数据来源：thesolarfoundation.com'
                },
                yAxis: {
                    title: {
                        text: '就业人数'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                series: [{
                    name: '安装，实施人员',
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                }, {
                    name: '工人',
                    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                }, {
                    name: '销售',
                    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                }, {
                    name: '项目开发',
                    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                }, {
                    name: '其他',
                    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            });
        }
    },
    components:{
        Echarts,
        EchartsBarCode,
        EchartsColumnCode,
        EchartsDoughnutCode,
        EchartsLineCode,
        EchartsPreCode
    },
    mounted(){
        let _this = this
        _this.pre()
        _this.column()
        _this.bar()
        _this.doughnuts()
         _this.line()
    }
}
</script>


<style lang="less" scoped>
.md{
    border: 0px;
}
.box-card{
    margin: 20px;
}
.el-collapse{
    text-align: center;
    border-top: 0px;
    border-left: 1px solid #E6EBF5;
    border-right: 1px solid #E6EBF5;
    padding-left: 20px;
}
.el-row{
    margin-bottom: 15px;
}
h3{
    margin-top: 0px;
    margin-bottom: 5px;
}
.desc{
    color: red;
    font-size: 12px;
    display: block;
    margin-bottom: 20px;
    
}
</style>