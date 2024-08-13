import React from 'react';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts for React
import * as echarts from 'echarts';

const BarChart = () => {
    // ECharts 配置
    let dataAxis = ['第一天', '第二天', '第三天', '第四天', '第五天', '第六天', '第七天'];
    // prettier-ignore
    let data = [120, 25, 191, 24, 20, 30, 30, 23]


    const option = {
        title: {
            text: '近七天的访问量',
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return params.name + '<br/>访问量为：' + params.value;
            }
        },
        xAxis: {
            data: dataAxis,
            type: 'category',
            axisLabel: {

                inside: false,
                color: 'black'
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            position: 'bottom', // Ensure xAxis is at the bottom
            z: 10,
            splitLine: {
                show: false // 隐藏分隔线
            },
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                inside: true,
                show: false,
                color: '#999'
            },
            splitLine: {
                show: false // 隐藏分隔线
            },

        },
        grid: {
            left: 0,
            right: 0,
            bottom: 0, // Adjust the bottom margin
            top: 40, // Adjust the top margin
            containLabel: true // Ensure labels are contained within grid
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            {
                type: 'bar',
                showBackground: true,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ])
                    }
                },
                data: data,
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff'
                }
            }
        ]
    };
    // Enable data zoom when user click bar.
    const zoomSize = 6;

    return (

        <ReactECharts option={option} style={{ height: '220px', padding: '0px' }} />

    );
};

export default BarChart;