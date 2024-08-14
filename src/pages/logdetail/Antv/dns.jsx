import React from 'react';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts for React
import * as echarts from 'echarts';

const BarChart = ({ dns }) => {
    // 处理数据
    // 生成过去七天的日期



    // 生成接近 data 的随机数据


    // 原始数据


    // 生成几条新线的数据

    const option = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                center: ['50%', '80%'],
                radius: '120%',
                min: 0,
                max: 1,
                splitNumber: 8,
                axisLine: {
                    lineStyle: {
                        width: 6,
                        color: [
                            [0.25, '#7CFFB2'],
                            [0.5, '#58D9F9'],
                            [0.75, '#FDDD60'],
                            [1, '#FF6E76']
                        ]
                    }
                },
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '12%',
                    width: 20,
                    offsetCenter: [0, '-60%'],
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    length: 12,
                    lineStyle: {
                        color: 'auto',
                        width: 2
                    }
                },
                splitLine: {
                    length: 20,
                    lineStyle: {
                        color: 'auto',
                        width: 5
                    }
                },
                axisLabel: {
                    color: '#464646',
                    fontSize: 20,
                    distance: -60,
                    rotate: 'tangential',
                    formatter: function (value) {
                        if (value === 0.875) {
                            return 'Grade D';
                        } else if (value === 0.625) {
                            return 'Grade B';
                        } else if (value === 0.375) {
                            return 'Grade C';
                        } else if (value === 0.125) {
                            return 'Grade A';
                        }
                        return '';
                    }
                },
                title: {
                    offsetCenter: [0, '-10%'],
                    fontSize: 20
                },
                detail: {
                    fontSize: 30,
                    offsetCenter: [0, '-35%'],
                    valueAnimation: true,
                    formatter: function (value) {
                        return Math.round(value * 1000) + '';
                    },
                    color: 'inherit'
                },
                data: [
                    {
                        value: dns / 1000,
                        name: 'Grade Rating'
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