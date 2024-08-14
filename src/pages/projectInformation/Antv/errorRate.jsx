import React from 'react';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts for React
import * as echarts from 'echarts';

const BarChart = ({ weekData }) => {
    // ECharts 配置
    let data = [0, 0, 0, 0, 0, 0, 0]

    const visits = weekData.map(item => item.errorRate * 100);

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
                max: dataAxis.length - 1
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
            data: dataAxis,
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
                data: data,
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