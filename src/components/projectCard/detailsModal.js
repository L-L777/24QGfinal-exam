import React, { useState } from 'react';
import { Button, Modal, Flex, Form,Alert } from 'antd';
import { applyMonitorPermission } from "../../api"
const DetailModal = ({ projectName, projectId, description, creator, createTime }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId = localStorage.getItem('userId')
    const [btnLoading, setBtnLoading] = useState(false)
    const [alertStatus, setAlertStatus] = useState({ type: 'error', message: '申请失败，请重新申请', status: false })
    // 消息提示框弹出函数
    let alertTimeId=null
    const alertShow = (setter, msg) => {
        if (alertTimeId) {
            clearTimeout(alertTimeId);
        }
        setter(msg)
        alertTimeId=setTimeout(() => {
            setter({ type: 'error', message: '上传失败，请重新上传', status: false })
        }, 3000)
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const toApply=async()=>{
        setBtnLoading(true)
        try {
            await applyMonitorPermission(userId, projectId)
            setBtnLoading(false)
            alertShow(setAlertStatus, { type: 'success', message: '申请成功', status: true })
        } catch (error) {
            setBtnLoading(false)
            alertShow(setAlertStatus, { type: 'error', message: '申请失败，请重新申请', status: true })
        }
    }
    return (
        <>
            <Button type="primary" onClick={showModal} style={{ width: '100%', height: '100%', }}>
                详细
            </Button>
            <Modal title="项目信息" open={isModalOpen}  onCancel={handleCancel} footer={null} width={600}>
                {alertStatus.status && <Alert message={alertStatus.message} type={alertStatus.type} style={{ marginBottom: '10px' }} />}
                <Flex vertical style={{ width: '100%', }} justify='space-evenly' align='center'>
                    <Form>
                        <Form.Item
                            label="项目名"
                        >
                            <div style={{ width: '440px', minHeight: '20px', marginLeft: '20px', fontSize: '16px' }}>
                               {projectName}
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="发布时间"
                        >
                            <div style={{ width: '440px', minHeight: '20px', marginLeft: '20px', fontSize: '16px' }}>
                                {createTime}
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="发布者"
                        >
                            <div style={{ width: '440px', minHeight: '20px', marginLeft: '20px', fontSize: '16px' }}>
                                {creator}
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="项目描述"
                        >
                            <div style={{ width: '440px', maxHeight: '400px', marginLeft: '20px', fontSize: '16px', borderRadius: '6px', overflow: 'auto', }}>
                                {description}
                            </div>
                        </Form.Item>
                    </Form>
                        <Button type='primary' style={{marginTop:'10px'}} onClick={toApply} loading={btnLoading}>申请权限</Button>
                    
                </Flex>
            </Modal>
        </>
    );
};
export default DetailModal;