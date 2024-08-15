import React from 'react';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts for React
import * as echarts from 'echarts';

const BarChart = ({ excdata }) => {
    // 处理数据
    let value = 80
    console.log(excdata)
    if (excdata) {
        const maxValue = Math.max(...excdata);

        // 2. 计算最大值在数组中的出现次数
        const maxCount = excdata.filter(value => value === maxValue).length;

        // 3. 计算最大值的占比
        const totalCount = excdata.length;
        const maxPercentage = (maxCount / totalCount) * 100;

        value = maxPercentage.toFixed(2)
    }
    // 生成过去七天的日期



    // 生成接近 data 的随机数据


    // 原始数据


    // 生成几条新线的数据



    const option = {
        series: [
            {
                type: 'gauge',
                radius: '100%', // 调整仪表盘半径百分比

                axisLine: {
                    lineStyle: {
                        width: 30,
                        color: [
                            [0.3, '#67e0e3'],
                            [0.7, '#37a2da'],
                            [1, '#fd666d']
                        ],
                    }
                },
                pointer: {
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    distance: -30,
                    length: 8,
                    lineStyle: {
                        color: '#fff',
                        width: 2
                    }
                },
                splitLine: {
                    distance: -30,
                    length: 30,
                    lineStyle: {
                        color: '#fff',
                        width: 4
                    }
                },
                axisLabel: {
                    color: 'inherit',
                    distance: 40,
                    fontSize: 20
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}%',
                    color: 'inherit',
                    fontSize: '28px'
                },
                data: [
                    {
                        value: value
                    }
                ]
            }
        ]
    };


    return (
        <ReactECharts option={option} style={{ width: '700px', height: '400px', paddingBottom: '0px' }} />
    );
};

export default BarChart;