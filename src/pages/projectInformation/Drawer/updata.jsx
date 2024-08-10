import React from 'react'
import { Input, Drawer, Button } from 'antd'
export default function error({ open, onClose }) {
    const { TextArea } = Input;
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
                    rows={1}
                    style={{
                        backgroundColor: '#f0f0f0',
                        resize: 'none',
                        marginBottom: '30px'
                    }}
                />
                <h3 style={{ marginBottom: '10px' }}>项目id</h3>
                <TextArea
                    rows={1}
                    style={{
                        backgroundColor: '#f0f0f0',
                        resize: 'none',
                        marginBottom: '30px'
                    }}
                />

                <h3 style={{ marginBottom: '10px' }}>项目描述</h3>
                <TextArea
                    rows={5}
                    style={{
                        backgroundColor: '#f0f0f0',
                        resize: 'none',
                    }}
                />
            </div>
            <div style={{ textAlign: 'center' }}>
                <Button type="primary" style={{ width: '330px', height: '50px' }} >确定</Button>
            </div>
        </Drawer>
    )
}
