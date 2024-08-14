import React from 'react';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts for React
import * as echarts from 'echarts';

const BarChart = ({ weekData }) => {

    // ECharts 配置
    let data = [0, 0, 0, 0, 0, 0, 0]

    const visits = weekData.map(item => item.visits);

    // 获取 weekData 数组的最后七个 visits 值
    const lastSevenVisits = visits.slice(-7);

    // 替代 data 数组的最后七个值
    data = [...Array(7 - lastSevenVisits.length).fill(0), ...lastSevenVisits];




    const generateDateArray = () => {
        const today = new Date(); // 当前时间
        const dates = [];
        // 从昨天开始
        today.setDate(today.getDate() - 1);

        // 生成过去七天的日期
        for (let i = 0; i < 7; i++) {
            // 创建日期副本并格式化为 MM-DD
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            dates.push(formatDate(date)); // 使用格式化函数
        }

        return dates.reverse(); // 反转数组使其从昨天到七天前
    };

    // 格式化函数，仅保留 MM-DD
    const formatDate = (date) => {
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 获取月份并补零
        const day = String(date.getDate()).padStart(2, '0'); // 获取日期并补零
        return `${month}-${day}`;
    };
    const dataAxis = generateDateArray();

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
        <ReactECharts option={option} style={{ height: '200px', paddingTop: 10, paddingLeft: 5 }} />

    );
};

export default BarChart;