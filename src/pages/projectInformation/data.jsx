import React, { useState } from 'react';
import { Card, Flex, Input, Dropdown, message, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import styles from './data.module.css'

const Data = () => {
    const [dataType, SetDataType] = useState('前端')

    const items = [
        {
            label: '前端',
            key: '前端',
        },
        {
            label: '后台',
            key: '后台',
        },
        {
            label: '移动',
            key: '移动',
        },
    ];

    const onClick = ({ key }) => {
        SetDataType(key)
    };

    return (
        <Card style={{
            width: '1570px',
            height: '925px',
            marginLeft: '50px',
            display: 'flex',         // 使用flex布局
            justifyContent: 'center', // 水平居中
            alignItems: 'center',     // 垂直居中
        }}>
            <Flex style={{
                width: '1478px',
                height: '65px',
                borderBottom: '2px solid rgb(221, 230, 233)'

            }} justify={"space-between"}>
                <Flex style={{
                    width: 300,
                    color: "rgb(164, 164, 165)",
                    cursor: 'pointer',
                    fontSize: '18px',
                    position: 'relative'
                }} align={"center"} justify={"space-around"}>
                    <div className={styles.change_color}>正常日志</div>
                    <div className={styles.change_color}>错误日志</div>
                </Flex>
                <Flex style={{
                    width: 450,

                }} align={"center"} justify={"space-between"}>
                    <Input placeholder="Basic usage" style={{
                        width: 280,
                        height: 36,
                        borderRadius: 0,
                        backgroundColor: 'rgb(217, 217, 217)'
                    }} />

                    <Dropdown
                        menu={{
                            items,
                            onClick,
                        }}

                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space style={{
                                width: 100, height: 36, backgroundColor: 'rgb(217, 217, 217)',
                                display: 'flex',
                                alignItems: 'center', // Vertically center the content
                                justifyContent: 'center', // Horizontally center the content
                                textAlign: 'center', // Center the text alignment
                                fontSize: '18px'
                            }}>
                                {dataType}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </Flex>
            </Flex>







            <Flex style={{

                height: '860px'
            }}>
                4
            </Flex>

        </Card>
    );
}

export default Data;
