import React from 'react';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts for React


const BarChart = ({ excdata }) => {
    // 处理数据
    let data = [50, 30, 10, 40, 50, 420, 0];
    if (excdata)
        data = excdata.map((item) => {
            return item.total
        })
    // 生成过去七天的日期
    const generateDateArray = () => {
        const today = new Date(); // 当前时间
        const dates = [];
        // 从昨天开始
        today.setDate(today.getDate());

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

    // 生成接近 data 的随机数据
    const generateRandomData = (baseData, power) => {
        let noise;
        return baseData.map(value => {
            if (value != 0)
            // Determine the amount of noise based on the power
            {
                if (power === 1)
                    noise = (Math.random() - 0.5) * 20; // Random noise
                else if (power === 2)
                    noise = (Math.random() - 0.5) * 50; // Random noise
                else if (power === 3)
                    noise = (Math.random() - 0.5) * 70; // Random noise

                // Calculate the new value and ensure it is not less than 0
                return Math.max(0, value + noise);
            }
            else {
                return 0;
            }
        });
    };


    // 原始数据
    const baseData = data;

    // 生成几条新线的数据
    const data1 = generateRandomData(baseData, 1);


    const option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                // 只针对 'Step Start' 系列显示 tooltip
                const targetSeriesName = 'Step Start';
                let tooltipContent = '';
                params.forEach(item => {
                    if (item.seriesName === targetSeriesName) {
                        tooltipContent += `${item.seriesName}: ${item.value}<br>`;
                    }
                });
                // 如果 tooltipContent 为空，返回空字符串以隐藏 tooltip
                return tooltipContent || '';
            }
        },
        legend: {
            data: ['Step Start', 'Step Middle 1', 'Step Middle 2', 'Step End']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: dataAxis
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Step Start',
                type: 'line',
                step: 'start',
                data: data,
                label: { show: false } // 显示数值
            },
            {
                name: 'Step Middle 1',
                type: 'line',
                data: data1,
                label: { show: false } // 不显示数值
            },

        ]
    };

    return (
        <ReactECharts option={option} style={{ height: '310px', paddingTop: 10, paddingLeft: 10, paddingRight: 10 }} />
    );
};

export default BarChart;