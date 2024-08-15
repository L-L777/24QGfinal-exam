import React, { useRef, useState } from 'react';
import { Input, Drawer, Button, message } from 'antd';
import { updateProject } from '../../../api/index';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate 钩子

export default function Error({ open, onClose, projectData }) {
    const { TextArea } = Input;
    const urlRef = useRef();
    const passwordRef = useRef();
    const descriptionRef = useRef();
    const [loading, setLoading] = useState(false); // 管理按钮的加载状态
    const navigate = useNavigate(); // 创建 navigate 实例

    const submit = async () => {
        // Access the value directly from the refs
        const url = urlRef.current?.resizableTextArea?.textArea.value;
        const password = passwordRef.current?.resizableTextArea?.textArea.value;
        const description = descriptionRef.current?.resizableTextArea?.textArea.value;

        // Check if all fields are filled
        if (url && password && description) {
            setLoading(true); // 禁用按钮

            try {
                const res = await updateProject(url, projectData.projectId, description, password, localStorage.getItem('userId'));
                if (res.code === 1) {
                    message.success('更改成功'); // 使用 Ant Design 的 message 组件显示成功消息

                    // 1秒后重新启用按钮
                    setTimeout(() => {
                        setLoading(false);
                        onClose(); // 关闭 Drawer 或者执行其他操作
                        navigate(0); // 刷新当前页面
                    }, 1000);
                } else {
                    message.error('项目口令错误');
                    setTimeout(() => {

                        setLoading(false);
                    }, 1000);

                }
            } catch (error) {
                console.log(error);
                message.error('更新异常，请重试');
                setLoading(false); // 确保在失败时也会重新启用按钮
            }
        } else {
            message.error('请输入对应信息');
        }
    };

    return (
        <Drawer
            onClose={onClose}
            open={open}
            title={'更新项目'}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
                        marginBottom: '30px',
                    }}
                />
                <h3 style={{ marginBottom: '10px' }}>项目口令</h3>
                <TextArea
                    ref={passwordRef}
                    rows={1}
                    style={{
                        backgroundColor: '#f0f0f0',
                        resize: 'none',
                        marginBottom: '30px',
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
                <Button
                    type="primary"
                    style={{ width: '330px', height: '50px' }}
                    onClick={submit}
                    loading={loading} // 使用 loading 属性来禁用按钮
                >
                    确定
                </Button>
            </div>
        </Drawer>
    );
}