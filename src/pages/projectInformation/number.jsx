import React from 'react';
import { Flex } from "antd"


const number = ({ weekData }) => {

    let count = 0, add = 0, addError = 0, addRate = 0
    if (weekData.length > 0) {
        count = weekData[0].totalVisit
        add = weekData[0].visits
        addError = weekData[0].errorNumber
        addRate = weekData[0].errorRate
    }



    return (
        <Flex style={{
            width: '100%',
            height: '100px',
            backgroundColor: 'rgb(140, 89, 252)',
            borderRadius: '8px'
        }} >
            <Flex style={{
                width: '100%',
                height: '100px',
                fontSize: '18px',
                color: 'white',
                fontWeight: '700',
            }} vertical justify={"center"} align={"center"} gap={'middle'}>
                <span>资源总数</span>
                <span>{count}个</span>
            </Flex>
            <Flex style={{
                width: '100%',
                height: '100px',
                fontSize: '18px',
                color: 'white',
                fontWeight: '700',
            }} vertical justify={"center"} align={"center"} gap={'middle'}>
                <span>今日新增</span>
                <span>{add}个</span>
            </Flex>
            <Flex style={{
                width: '100%',
                height: '100px',
                fontSize: '18px',
                color: 'white',
                fontWeight: '700',
            }} vertical justify={"center"} align={"center"} gap={'middle'}>
                <span>今日错误</span>
                <span>{addError}个</span>
            </Flex>
            <Flex style={{
                width: '100%',
                height: '100px',
                fontSize: '18px',
                color: 'white',
                fontWeight: '700',
            }} vertical justify={"center"} align={"center"} gap={'middle'}>
                <span>审核队列</span>
                <span>{addRate}个</span>
            </Flex>
        </Flex>
    );
}

export default number;
