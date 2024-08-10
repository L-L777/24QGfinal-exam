import React, { useState } from 'react';
import { Card, Flex, Input, Dropdown, Space, Table } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import styles from './data.module.css'
import Right from './Drawer/right'
import Error from './Drawer/error'
import { useLocation } from 'react-router-dom';


const Data = () => {
    const [selectData, setSelectData] = useState('')
    const [dataType, SetDataType] = useState('前端')
    const [listStatus, SetListStatus] = useState('true')
    const [open, setOpen] = useState(false);
    const { search } = useLocation();
    const [projectId, setProjectId] = useState('')
    const [release, setRelease] = useState('')
    if (search) {
        const params = new URLSearchParams(search);
        const receiveProjectId = params.get('projectId')
        const receiveRelease = params.get('release')
        setProjectId(receiveProjectId)
        setRelease(receiveRelease)
        console.log(projectId)
        console.log(release)
    }

    const ChangeListNormal = () => {
        if (listStatus !== 'true')
            SetListStatus('true')
    }

    const ChangeListError = () => {
        if (listStatus !== 'false')
            SetListStatus('false')
    }

    const showDrawer = (data, record) => {
        setSelectData(data)
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
        setSelectData('')
    };

    const items = [
        {
            label: '前端',
            key: '前端',
        },
        {
            label: '后台',
            key: '后台',
        },
        {
            label: '移动',
            key: '移动',
        },
    ];

    const columnsError = [
        {
            title: '用户ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '使用浏览器',
            dataIndex: 'use',
            key: 'use',
        },
        {
            title: '网址',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '错误内容',
            dataIndex: 'error',
            key: 'error',
        },

        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '操作',
            key: 'action',
            render: (data, record) => (
                <Space size="middle">
                    <p onClick={() => showDrawer(data, record)} data={data} record={record} >详细</p>
                </Space>
            ),
        },
    ];

    const columnsNormal = [
        {
            title: '用户ip',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: '使用浏览器',
            dataIndex: 'use',
            key: 'use',
        },
        {
            title: '网址',
            dataIndex: 'url',
            key: 'url',
        },

        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: '操作',
            key: 'action',
            render: (data, record) => (
                <Space size="middle">
                    <p onClick={() => showDrawer(data, record)} data={data} record={record} >详细</p>
                </Space>
            ),
        },
    ];


    const data = [
        {
            key: '1',
            ip: '27.67.225.71',
            use: 'IE',
            url: 'http://mxmdxdobn.io/kjwfhttp://mxmdxdobn.io',
            status: '错误',
            error: '3170c8Cf-2f42-b6F1-dBB9-d54f57eBAD91',
            time: '2024-06-10 11:37'
        },
        {
            key: '1',
            ip: '27.67.225.71',
            use: 'IE',
            url: 'http://mxmdxdobn.io/kjwfhttp://mxmdxdobn.io',
            status: '错误',
            error: '3170c8Cf-2f42-b6F1-dBB9-d54f57eBAD91',
            time: '2024-06-10 11:37'
        },

    ];



    const onClick = ({ key }) => {
        SetDataType(key)
    };

    return (
        <Card style={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            marginBottom: '40px'
        }}>
            <Flex style={{
                width: '90%',
                height: '65px',
                borderBottom: '2px solid rgb(221, 230, 233)',
                padding: '0 10px',
                boxSizing: 'border-box',
                margin: '0 auto'
            }} justify={"space-between"} align={"center"}>
                <Flex style={{
                    color: "rgb(164, 164, 165)",
                    cursor: 'pointer',
                    fontSize: '18px',
                    width: '240px',
                }} align={"center"} justify={"space-around"}>
                    <div
                        className={`${styles.change_color} ${listStatus === 'true' ? styles.active : ''}`}
                        onClick={ChangeListNormal}
                    >
                        正常日志
</div>
                    <div
                        className={`${styles.change_color} ${listStatus === 'false' ? styles.active : ''}`}
                        onClick={ChangeListError}
                    >
                        错误日志
</div>
                </Flex>
                <Flex style={{
                    alignItems: 'center'
                }} align={"center"} justify={"space-between"}>
                    <Input placeholder="Basic usage" style={{
                        height: 36,
                        width: 300,
                        borderRadius: 0,
                        backgroundColor: 'rgb(217, 217, 217)',
                        marginRight: '10px',
                    }} />

                    <Dropdown
                        menu={{
                            items,
                            onClick,
                        }}
                    >
                        <p onClick={(e) => e.preventDefault()}>
                            <Space style={{
                                height: 36,
                                width: 100,
                                backgroundColor: 'rgb(217, 217, 217)',
                                justifyContent: 'center',
                                fontSize: '18px',
                                padding: '0 10px'
                            }}>
                                {dataType}
                                <DownOutlined />
                            </Space>
                        </p>
                    </Dropdown>
                </Flex>
            </Flex>

            <Flex style={{
                width: '90%',             // 设置宽度为父盒子的90%
                margin: '0 auto',
            }}  >
                {
                    listStatus === 'true' ?
                        <Table
                            style={{ borderRadius: '0px', width: '100%', textAlign: 'center' }}
                            columns={columnsNormal.map(col => ({ ...col, align: 'center' }))}
                            dataSource={data}
                        /> :
                        <Table
                            style={{ borderRadius: '0px', width: '100%', textAlign: 'center' }}
                            columns={columnsError.map(col => ({ ...col, align: 'center' }))}
                            dataSource={data}
                        />
                }
            </Flex>
            {listStatus === 'true' ?
                <Right open={open} onClose={onClose} selectData={selectData} /> : <Error open={open} onClose={onClose} selectData={selectData} />
            }
        </Card>
    );
}

export default Data;
