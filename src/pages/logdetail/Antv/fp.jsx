import React from 'react';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts for React

const BarChart = ({ fp }) => {
    // ECharts 配置
    // prettier-ignore
    let data = [0, 0, 0, 0, 0, 0, 0]
    if (fp)
        data = fp


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
    const option = {
        // Make gradient line here
        visualMap: [
            {
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 4000
            },

        ],
        title: [
            {
                left: 'left',
                text: 'fp'
            },

        ],
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [
            {
                data: dataAxis
            },

        ],
        yAxis: {

        },
        grid: {

        },
        series: [
            {
                type: 'line',
                showSymbol: false,
                data: data
            },

        ]
    };



    return (
        <ReactECharts option={option} style={{ height: '310px', paddingTop: 10, paddingLeft: 10, paddingRight: 10 }} />
    );
};

export default BarChart;