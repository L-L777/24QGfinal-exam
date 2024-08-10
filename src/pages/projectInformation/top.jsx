import React, { useState } from 'react';
import { Flex, Button, Modal, Input } from "antd"
import Updata from './Drawer/updata'


const Top = () => {
    const [openUpdata, setOpenUpdata] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showDrawerUpdata = () => {
        setOpenUpdata(true);
    };
    const onCloseUpdata = () => {
        setOpenUpdata(false);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <Flex style={{
            height: "100px",
            width: "90%",
            borderBottom: '1px solid rgb(193, 187, 201)',
        }}
            justify={"space-between"} align={"center"}>
            <Flex vertical>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}><span style={{ color: 'rgb(153, 153, 153)', cursor: 'pointer' }}>项目管理</span><span style={{ color: 'rgb(48, 48, 48)' }}>&gt;项目详情</span></h3>
                <h3 style={{ fontSize: '28px' }}>项目名称</h3>
            </Flex>
            <Flex gap="large">
                <Button type="primary" style={{ width: '160px', height: '44px', backgroundColor: 'rgb(255, 97, 97)', color: 'white', fontSize: '18px' }} onClick={showModal}>删除项目</Button>
                <Button type="primary" style={{ width: '160px', height: '44px', backgroundColor: 'rgb(224, 209, 255)', color: 'rgb(144, 83, 192)', fontSize: '18px' }}>管理监控权限</Button>
                <Button type="primary" style={{ width: '160px', height: '44px', backgroundColor: 'rgb(129, 106, 255)', color: 'white', fontSize: '18px' }} onClick={showDrawerUpdata}>更新项目</Button>
            </Flex>
            <Updata open={openUpdata} onClose={onCloseUpdata} />
            <Modal style={{ top: '25%' }} title="删除项目" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                <h3 style={{ fontWeight: 400, marginBottom: '15px', marginTop: '40px' }}>项目口令</h3>
                <Input style={{ height: '50px', border: '1px solid black', marginBottom: '50px' }} />
            </Modal>

        </Flex>
    );
}

export default Top;
