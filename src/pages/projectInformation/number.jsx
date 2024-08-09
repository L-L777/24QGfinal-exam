import React from 'react';
import { Flex } from "antd"


const number = () => {
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
                <span>9344716个</span>
            </Flex>
            <Flex style={{
                width: '100%',
                height: '100px',
                fontSize: '18px',
                color: 'white',
                fontWeight: '700',
            }} vertical justify={"center"} align={"center"} gap={'middle'}>
                <span>今日新增</span>
                <span>372个</span>
            </Flex>
            <Flex style={{
                width: '100%',
                height: '100px',
                fontSize: '18px',
                color: 'white',
                fontWeight: '700',
            }} vertical justify={"center"} align={"center"} gap={'middle'}>
                <span>今日下载</span>
                <span>9344716个</span>
            </Flex>
            <Flex style={{
                width: '100%',
                height: '100px',
                fontSize: '18px',
                color: 'white',
                fontWeight: '700',
            }} vertical justify={"center"} align={"center"} gap={'middle'}>
                <span>审核队列</span>
                <span>9个</span>
            </Flex>
        </Flex>
    );
}

export default number;
