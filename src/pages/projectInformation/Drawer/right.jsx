import React from 'react'
import { Input, Drawer } from 'antd'

export default function right({ open, onClose, selectData }) {
    console.log(selectData)
    const { TextArea } = Input;
    return (
        <Drawer
            onClose={onClose}
            open={open}
            title={'日志详细'}
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <h3 style={{ marginBottom: '10px' }}>用户ip</h3>
            <TextArea
                rows={1}
                style={{
                    backgroundColor: '#f0f0f0',
                    resize: 'none',
                    marginBottom: '30px'
                }}
                value={selectData.ip}
                disabled
            />
            <h3 style={{ marginBottom: '10px' }}>使用浏览器</h3>
            <TextArea
                rows={1}
                style={{
                    backgroundColor: '#f0f0f0',
                    resize: 'none',
                    marginBottom: '30px'
                }}
                value={selectData.use}
                disabled
            />
            <h3 style={{ marginBottom: '10px' }}>时间</h3>
            <TextArea
                rows={1}
                style={{
                    backgroundColor: '#f0f0f0',
                    resize: 'none',
                    marginBottom: '30px'
                }}
                value={selectData.time}
                disabled
            />
            <h3 style={{ marginBottom: '10px' }}>网址</h3>
            <TextArea
                rows={5}
                style={{
                    backgroundColor: '#f0f0f0',
                    resize: 'none',
                    marginBottom: '30px'
                }}
                value={selectData.url}
                disabled
            />

        </Drawer>
    )
}
