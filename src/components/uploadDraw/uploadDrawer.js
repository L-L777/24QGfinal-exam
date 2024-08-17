import React, { useState } from 'react';
import { Button, Drawer, Form, Flex, Input, Alert } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { publishProject } from '../../api';
const CustomForm = styled(Form)`
&&{
width:100%;
display:flex;
flex-direction:column;
gap:20px;
.ant-form-item {
    width:100% !important;
display:flex !important;
flex-direction:column !important;
gap:50px !important;
}

}
`
const UploadDrawer = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const userId = localStorage.getItem('userId')
    const [btnLoading, setBtnLoading] = useState(false)
    const [alertStatus, setAlertStatus] = useState({ type: 'error', message: '上传失败，请重新上传', status: false })
    // 消息提示框弹出函数
    let alertTimeId = null
    const alertShow = (setter, msg) => {
        if (alertTimeId) {
            clearTimeout(alertTimeId);
        }
        setter(msg)
        alertTimeId = setTimeout(() => {
            setter({ type: 'error', message: '上传失败，请重新上传', status: false })
        }, 3000)
    }
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onFinish = async (values) => {
        // console.log(values);
        setBtnLoading(true)
        const { projectName, projectUrl, projectPassword, projectDescription } = values
        try {
          const res=  await publishProject(projectName, projectDescription, userId, projectUrl, projectPassword)
          if(res.code===1){
              setBtnLoading(false)
              alertShow(setAlertStatus, { type: 'success', message: res.msg, status: true })
              form.resetFields();
          }else{
              setBtnLoading(false)
              alertShow(setAlertStatus, { type: 'error', message: res.msg, status: true })
              form.resetFields();
          }
            
        } catch (error) {
            setBtnLoading(false)
            alertShow(setAlertStatus, { type: 'error', message: '上传失败，请重新上传', status: true })
        }
    };
    const onReset = () => {
        form.resetFields();
    };
    return (
        <>
            <Button type="primary" icon={<CloudUploadOutlined />} onClick={showDrawer} style={{ marginLeft: '30px' }}>
                发布项目
            </Button>
            <Drawer title="发布项目" width={600} onClose={onClose} open={open}>
                {alertStatus.status && <Alert message={alertStatus.message} type={alertStatus.type} style={{ marginBottom: '10px' }} />}
                <CustomForm form={form}
                    name="control-hooks"
                    onFinish={onFinish}>
                    <Form.Item
                        layout="vertical"
                        label="项目名称"
                        name="projectName"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder='输入项目名称' />
                    </Form.Item>
                    <Form.Item
                        layout="vertical"
                        label="项目url"
                        name="projectUrl"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder='输入项目url' />
                    </Form.Item>
                    <Form.Item
                        layout="vertical"
                        label="项目口令"
                        name="projectPassword"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input placeholder='输入项目口令' />
                    </Form.Item>
                    <Form.Item
                        layout="vertical"
                        label="项目描述"
                        name="projectDescription"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{ height: '350px' }}
                    >
                        <Input.TextArea rows={15} placeholder='输入项目描述' />
                    </Form.Item>
                    <Form.Item >
                        <Flex justify='space-evenly' style={{ marginTop: "30px" }}>
                            <Button type="primary" htmlType="submit" loading={btnLoading}>
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Flex>
                    </Form.Item>
                </CustomForm>
            </Drawer>
        </>
    );
};
export default UploadDrawer;