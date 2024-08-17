import React, { useState } from 'react';
import { Button, Drawer, Flex, Form } from 'antd';
const ProjectDrawer= ({projectData}) => {
    
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                项目详细
            </Button>
            <Drawer title="项目详细" onClose={onClose} open={open} width={700}>
                <Flex vertical style={{ width: '100%', }} justify='space-evenly' align='center'>
                    <Form>
                        <Form.Item
                            label="项目名"
                        >
                            <div style={{ width: '440px', minHeight: '20px', marginLeft: '20px', fontSize: '16px' }}>
                                {projectData.projectName}
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="发布时间"
                        >
                            <div style={{ width: '440px', minHeight: '20px', marginLeft: '20px', fontSize: '16px' }}>
                                {projectData.createTime}
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="发布者"
                        >
                            <div style={{ width: '440px', minHeight: '20px', marginLeft: '20px', fontSize: '16px' }}>
                                {projectData.creator}
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="项目地址"
                        >
                            <div style={{ width: '440px', minHeight: '20px', marginLeft: '20px', fontSize: '16px', color:'#652fff' }}>
                                <a href={projectData.projectUrl }>项目地址（点击跳转）</a>
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="项目描述"
                        >
                            <div style={{ width: '440px', maxHeight: '400px', marginLeft: '20px', fontSize: '16px', borderRadius: '6px', overflow: 'auto', }}>
                                {projectData.description}
                            </div>
                        </Form.Item>
                    </Form>
                </Flex>
            </Drawer>
        </>
    );
};
export default ProjectDrawer;