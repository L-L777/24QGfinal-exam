import React from 'react';
import { Flex } from "antd"

const top = () => {
    return (
        <Flex vertical style={{
            height: "100px",
            width: "calc(100% - 50px)",
            paddingLeft: '50px',
            Selectalign: 'center',
            borderBottom: '1px solid rgb(193, 187, 201)'
        }}
            justify={"center"}>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}><span style={{ color: 'rgb(153, 153, 153)', cursor: 'pointer' }}>项目管理</span><span style={{ color: 'rgb(48, 48, 48)' }}>&gt;项目详情</span></h3>
            <h3 style={{ fontSize: '28px' }}>项目名称</h3>
        </Flex>
    );
}

export default top;
