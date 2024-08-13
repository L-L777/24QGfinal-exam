import React from 'react';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts for React
import * as echarts from 'echarts';

const BarChart = () => {
    // ECharts 配置
    const data = [["6-05", 36], ["6-06", 98], ["6-07", 22], ["6-08", 16], ["6-09", 39], ["6-10", 78], ["6-11", 16]];
    const dateList = data.map(function (item) {
        return item[0];
    });
    const valueList = data.map(function (item) {
        return item[1];
    });
    const option = {
        // Make gradient line here
        visualMap: [
            {
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400
            },
            {
                show: false,
                type: 'continuous',
                seriesIndex: 1,
                dimension: 0,
                min: 0,
                max: dateList.length - 1
            }
        ],
        title: [
            {
                left: 'left',
                text: '近七日报错率'
            },

        ],
        tooltip: {
            trigger: 'axis'
        },
        xAxis:
        {
            data: dateList,
            axisLabel: {
                inside: false,
                color: 'black'
            },
            axisTick: {
                show: false
            },
            boundaryGap: false, // This ensures that the line starts from the origin
        }
        ,
        yAxis: {
            max: 100 // 设置 y 轴的最大值为 100
        },
        grid: {
            left: 0,
            right: 20,
            bottom: 0, // Adjust the bottom margin
            top: 40, // Adjust the top margin
            containLabel: true // Ensure labels are contained within grid
        },
        series: [
            {
                type: 'line',
                showSymbol: false,
                data: valueList,
                symbol: 'none',
                sampling: 'lttb',

                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0, // 渐变的起始点（顶部）
                            color: 'rgb(255, 70, 139)' // 上部分颜色，特别深
                        },
                        {
                            offset: 0.2, // 渐变的过渡点
                            color: 'rgb(255, 70, 139)' // 保持较深的颜色
                        },
                        {
                            offset: 1, // 渐变的结束点（底部）
                            color: 'rgb(255, 158, 68)' // 下部分颜色，较浅
                        }
                    ])
                }
            }
        ]
    };

    return (
        <ReactECharts option={option} style={{ height: '310px', paddingTop: 10, paddingLeft: 5 }} />
    );
};

export default BarChart;