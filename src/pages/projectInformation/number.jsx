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
                <span>总访问量</span>
                <span>{count}</span>
            </Flex>
            <Flex style={{
                width: '100%',
                height: '100px',
                fontSize: '18px',
                color: 'white',
                fontWeight: '700',
            }} vertical justify={"center"} align={"center"} gap={'middle'}>
                <span>日访问量</span>
                <span>{add}</span>
            </Flex>
            <Flex style={{
                width: '100%',
                height: '100px',
                fontSize: '18px',
                color: 'white',
                fontWeight: '700',
            }} vertical justify={"center"} align={"center"} gap={'middle'}>
                <span>错误数</span>
                <span>{addError}</span>
            </Flex>
            <Flex style={{
                width: '100%',
                height: '100px',
                fontSize: '18px',
                color: 'white',
                fontWeight: '700',
            }} vertical justify={"center"} align={"center"} gap={'middle'}>
                <span>错误率</span>
                <span>{addRate}</span>
            </Flex>
        </Flex>
    );
}

export default number;
