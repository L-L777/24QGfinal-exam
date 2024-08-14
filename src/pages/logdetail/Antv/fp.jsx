import React from 'react';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts for React
import * as echarts from 'echarts';

const BarChart = ({ fp }) => {
    // 处理数据
    // 生成过去七天的日期



    // 生成接近 data 的随机数据


    // 原始数据


    // 生成几条新线的数据



    const option = {

        series: [
            {
                type: 'gauge',
                radius: '100%', // 调整仪表盘半径百分比
                min: 0, // 设置仪表盘最小值
                max: 1000, // 设置仪表盘最大值
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
                    fontSize: 14
                },
                detail: {
                    valueAnimation: true,
                    formatter: fp,
                    color: 'inherit',
                    fontSize: '28px'
                },
                data: [
                    {
                        value: fp
                    }
                ]
            }
        ]
    };


    return (
        <ReactECharts option={option} style={{ height: '250px', paddingBottom: '0px' }} />
    );
};

export default BarChart;