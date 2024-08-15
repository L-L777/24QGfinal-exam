import React from 'react';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts for React
import * as echarts from 'echarts';

const BarChart = ({ domReady }) => {

    const option = {
        series: [
            {
                type: 'gauge',
                center: ['50%', '50%'],
                startAngle: 0,
                endAngle: 360,
                min: 0,
                max: 1200,
                radius: '70%',
                splitNumber: 12,
                itemStyle: {
                    color: '#FFAB91'
                },
                progress: {
                    show: true,
                    width: 30
                },
                pointer: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        width: 30
                    }
                },
                axisTick: {
                    distance: -45,
                    splitNumber: 5,
                    lineStyle: {
                        width: 2,
                        color: '#999'
                    }
                },
                splitLine: {
                    distance: -52,
                    length: 14,
                    lineStyle: {
                        width: 3,
                        color: '#999'
                    }
                },
                axisLabel: {
                    distance: -15,
                    color: '#999',
                    fontSize: 14,
                    show: true
                },
                anchor: {
                    show: false
                },
                title: {
                    show: false
                },
                detail: {
                    valueAnimation: true,
                    lineHeight: 40,
                    borderRadius: 8,
                    offsetCenter: [0, '0%'],
                    fontSize: 20,
                    fontWeight: 'bolder',
                    formatter: '{value} °C',
                    color: 'inherit'
                },
                data: [
                    {
                        value: domReady
                    }
                ]
            },

        ]
    };


    return (
        <ReactECharts option={option} style={{ height: '250px', paddingBottom: '0px' }} />
    );
};

export default BarChart;