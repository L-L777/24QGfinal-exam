import React, { useRef } from 'react'
import { Input, Drawer, Button } from 'antd'
import { updateProject } from '../../../api/index'

export default function Error({ open, onClose, projectData, success, error }) {
    const { TextArea } = Input;
    const urlRef = useRef();
    const passwordRef = useRef();
    const descriptionRef = useRef();

    const submit = () => {
        // Access the value directly from the refs
        const url = urlRef.current?.resizableTextArea?.textArea.value;
        const password = passwordRef.current?.resizableTextArea?.textArea.value;
        const description = descriptionRef.current?.resizableTextArea?.textArea.value;

        // Check if all fields are filled
        if (url && password && description) {
            console.log(projectData);
            const onLoad = async () => {
                try {
                    const res = await updateProject(url, projectData.projectId, description, password, localStorage.getItem('userId'));
                    console.log(res)
                } catch (error) {
                    console.log(error)
                }
            };
            onLoad()
        } else {
            // Display an error message if any field is empty
            error('请输入对应信息');
        }
    }



    return (
        <Drawer
            onClose={onClose}
            open={open}
            title={'日志详细'}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <div style={{ minHeight: '600px', height: 'calc(100% - 50px)' }}>
                <h3 style={{ marginBottom: '10px' }}>项目url</h3>
                <TextArea
                    ref={urlRef}
                    rows={1}
                    style={{
                        backgroundColor: '#f0f0f0',
                        resize: 'none',
                        marginBottom: '30px'
                    }}
                />
                <h3 style={{ marginBottom: '10px' }}>项目口令</h3>
                <TextArea
                    ref={passwordRef}
                    rows={1}
                    style={{
                        backgroundColor: '#f0f0f0',
                        resize: 'none',
                        marginBottom: '30px'
                    }}
                />
                <h3 style={{ marginBottom: '10px' }}>项目描述</h3>
                <TextArea
                    ref={descriptionRef}
                    rows={5}
                    style={{
                        backgroundColor: '#f0f0f0',
                        resize: 'none',
                    }}
                />
            </div>
            <div style={{ textAlign: 'center' }}>
                <Button type="primary" style={{ width: '330px', height: '50px' }} onClick={submit}>确定</Button>
            </div>
        </Drawer>
    )
}