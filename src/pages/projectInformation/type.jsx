import React from 'react';
import { Flex } from "antd"

const type = () => {
    return (
        <Flex style={{
            width: "180px",
            marginLeft: '50px',
            marginTop: '7px'
        }} justify={"space-between"}>
            <h3 style={{ cursor: 'pointer' }}>前端</h3>
            <h3 style={{ cursor: 'pointer' }}>后台</h3>
            <h3 style={{ cursor: 'pointer' }}>移动</h3>
        </Flex>
    );
}

export default type;
