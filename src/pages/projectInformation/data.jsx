import React, { useEffect, useState } from 'react';
import { Card, Flex, Input, Dropdown, Space, Table } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import styles from './data.module.css'
import { useNavigate } from "react-router-dom";
import { viewLogForGroup } from '../../api/index'


const Data = ({ receiveProjectId }) => {
    const [dataType, SetDataType] = useState('前端')
    const [listStatus, SetListStatus] = useState(0)
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        groupType: 1,
        pageSize: 100,
        page: 1,
        projectId: receiveProjectId,
        logType: 1,
    })
    const navigate = useNavigate()



    const ChangeListNormal = () => {
        if (listStatus !== 0) {
            SetListStatus(0);
            setStatus(prevStatus => ({
                ...prevStatus,
                logType: 1
            }));
        }
    }

    const ChangeListError = () => {
        if (listStatus !== 1) {
            SetListStatus(1);
            setStatus(prevStatus => ({
                ...prevStatus,
                logType: 0
            }));
        }
    }

    const ChangeListUs = () => {
        if (listStatus !== 2) {
            SetListStatus(2);
            setStatus(prevStatus => ({
                ...prevStatus,
                logType: 2
            }));
        }
    }

    const showDrawer = (data, record) => {
        let type = 1
        console.log(data.logId, data.logType)
        console.log(receiveProjectId)
        console.log(dataType)
        console.log(listStatus)
        if (dataType === '前端')
            type = 1

        if (dataType === '后台')
            type = 0

        if (dataType === '移动')
            type = 2

        navigate(`/platformdetail?projectId=${receiveProjectId}&groupType=${type}&logType=${status.logType}&logId=${data.logId}`);
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



    const columnsNormal = [
        {
            title: 'Id',
            dataIndex: 'logId',
            key: 'logId',
        },
        {
            title: 'Type',
            dataIndex: 'logType',
            key: 'logType',
        },
        {
            title: 'Info',
            dataIndex: 'logInfo',
            key: 'logInfo',
        },
        {
            title: 'Time',
            dataIndex: 'logTime',
            key: 'logTime',
        },
        {
            title: 'Action',
            key: 'action',
            render: (data, record) => (
                <Space size="middle" >
                    <p onClick={() => showDrawer(data, record)} data={data} record={record} style={{ cursor: 'pointer' }}>详细</p>
                </Space>
            ),
        },
    ];






    const onClick = ({ key }) => {
        let type = 1
        SetDataType(key)
        console.log(key)
        if (key === '前端')
            type = 1

        if (key === '后台')
            type = 0

        if (key === '移动')
            type = 2

        ChangeListNormal()
        setStatus(prevStatus => ({
            ...prevStatus,
            groupType: type
        }));
    };


    const onLoad = async () => {
        try {
            const res = await viewLogForGroup(status);
            // 处理数据，截断 logInfo 字段
            const processedData = res.data.data.map(item => ({
                ...item,
                logInfo: item.logInfo.length > 60 ? item.logInfo.substring(0, 60) + '...' : item.logInfo
            }));
            console.log(processedData);
            setData(processedData || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        onLoad()
    }, [status])




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
                    width: '300px',
                }} align={"center"} justify={"space-around"}>
                    <div
                        className={`${styles.change_color} ${listStatus === 0 ? styles.active : ''}`}
                        onClick={ChangeListNormal}
                    >
                        正常日志
</div>
                    <div
                        className={`${styles.change_color} ${listStatus === 1 ? styles.active : ''}`}
                        onClick={ChangeListError}
                    >
                        错误日志
</div>
                    {dataType === '后台' && (
                        <div
                            className={`${styles.change_color} ${listStatus === 2 ? styles.active : ''}`}
                            onClick={ChangeListUs}
                        >
                            自定义日志
                        </div>
                    )}
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
                    }} disabled />

                    <Dropdown
                        menu={{
                            items,
                            onClick,
                        }}
                    >
                        <div onClick={(e) => e.preventDefault()}>
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
                        </div>
                    </Dropdown>
                </Flex>
            </Flex>

            <Flex style={{
                width: '90%',             // 设置宽度为父盒子的90%
                margin: '0 auto',
            }}  >

                <Table
                    style={{ borderRadius: '0px', width: '100%', textAlign: 'center' }}
                    columns={columnsNormal.map(col => ({ ...col, align: 'center' }))}
                    dataSource={data.map(item => ({ ...item, key: item.logId }))} // 添加 key

                />

            </Flex>

        </Card>
    );
}

export default Data;
