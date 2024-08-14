import React from 'react';
import ReactECharts from 'echarts-for-react'; // 引入 ECharts for React
import * as echarts from 'echarts';

const BarChart = ({ weekData }) => {

    let mobileErrorTotal = 0, frontErrorTotal = 0, backendErrorTotal = 0
    if (weekData && weekData.length > 0) {
        // 使用 reduce 方法累加各个类型的错误数
        mobileErrorTotal = weekData.reduce((sum, item) => sum + (item.mobileErrorNumber || 0), 0);
        frontErrorTotal = weekData.reduce((sum, item) => sum + (item.frontErrorNumber || 0), 0);
        backendErrorTotal = weekData.reduce((sum, item) => sum + (item.backendErrorNumber || 0), 0);


    }



    // ECharts 配置
    const option = {
        title: {
            text: '近七天报错占比', // 设置标题文本
            left: 'left',   // 设置标题位置在最左侧
            top: 'top',  // 设置标题垂直居中
            textStyle: {
                fontSize: 18, // 设置标题文字的大小
                fontWeight: 'bold', // 设置标题文字的粗细
                color: '#333' // 设置标题文字的颜色
            }
        },
        legend: {
            left: 'left',   // 设置标题位置在最左侧
            top: '25px',  // 设置标题垂直居中
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: true },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [20, 140],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    { value: frontErrorTotal, name: '前端' },
                    { value: backendErrorTotal, name: '后台' },
                    { value: mobileErrorTotal, name: '移动' },
                ],
                label: { // 标签配置
                    show: true, // 显示标签
                    position: 'outside', // 标签显示在外部
                    formatter: '{b}: {c}%', // 标签格式，{b} 为数据名，{c} 为数据值
                    color: '#333', // 标签文字颜色
                    fontSize: 16, // 标签文字大小
                    align: 'center' // 标签对齐方式
                },
                labelLine: { // 配置连接线
                    show: true, // 显示连接线
                    length: 20, // 连接线的长度
                    length2: 20, // 连接线的第二段长度
                    smooth: true // 连接线是否平滑
                },
            }
        ]
    };


    return (
        <ReactECharts option={option} style={{ height: '310px', paddingTop: 10, paddingLeft: 5 }} />
    );
};

export default BarChart;