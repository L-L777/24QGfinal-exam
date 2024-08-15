import { Flex, List, Space, Button, Empty, Modal, Input, message } from "antd";
import { useState, useEffect } from "react";
import { receivedMonitorApplication, verifyMonitorApplication } from "../../../api"
import { applyToMeData } from '../../../mock/data';

const ApplyToMe = ({userId}) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [applyData, setApplyData] = useState([]);
    const [total, setTotal] = useState(20);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [myApplicationId, setMyApplicationId] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const showModal = (id) => {
        setIsModalOpen(true);
        setMyApplicationId(id);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const updateItemState = (id, key, value) => {
        setApplyData(prevData =>
            prevData.map(item =>
                item.applyMonitorProjectId === id ? { ...item, [key]: value } : item
            )
        );
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await receivedMonitorApplication(userId, page, pageSize);
                if(response.code===1){
                    const fetchedData = response.data.data.map(item => ({
                        ...item,
                        loading: false,
                        disabled: false,
                    }));
                    setApplyData(fetchedData);
                    setTotal(response.data.total);
                }
            } catch (error) {
                const mockData = applyToMeData.data.map(item => ({
                    ...item,
                    loading: false,
                    disabled: false,
                }));
                setApplyData(mockData);
                setTotal(applyToMeData.total);
            }
        }
        fetchData();
    }, [page, pageSize]);

    const agree = async (applyMonitorProjectId, status, rejectReason) => {
        if (!rejectReason && status === 2) {
            message.error('理由不能为空');
            return;
        }
        updateItemState(applyMonitorProjectId, 'loading', true);
        try {
           const res= await verifyMonitorApplication(applyMonitorProjectId, status, rejectReason);
           if(res.code===1){
               updateItemState(applyMonitorProjectId, 'disabled', true);
               updateItemState(applyMonitorProjectId, 'applicationStatus', status === 1 ? '通过' : '拒绝');
           }else{
               message.error(res.msg);
           }
           
        } catch (error) {
            // 处理错误
        } finally {
            updateItemState(applyMonitorProjectId, 'loading', false);
        }
    };

    return (
        <Flex style={{ width: '100%' }}>
            {applyData.length === 0 ? (
                <Empty description="暂无数据" style={{ marginTop: '30px', width: '100%' }} />
            ) : (
                <List
                    style={{ width: '100%' }}
                    pagination={{
                        align: 'center',
                        total: total,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        onChange: (page, pageSize) => {
                            setPage(page);
                            setPageSize(pageSize);
                        },
                    }}
                    dataSource={applyData}
                    renderItem={(item) => (
                        <List.Item>
                            <Flex style={{ width: '100%' }} justify="space-between">
                                
                                <Flex style={{width:'50%'}} justify="space-between">
                                    <div style={{ width: '48%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.projectName}</div>
                                    <div style={{ width: '48%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',textAlign:'end' }}>{item.applicant}</div>
                                </Flex>
                               
                                <Space size={20}>
                                    <div>{item.applicationTime}</div>
                                    {item.applicationStatus === '通过' && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', width: '58px', height: '24px', borderRadius: '8px', backgroundColor: '#E0D1FF', color: '#9053C0' }}>同意</div>}
                                    {item.applicationStatus === '拒绝' && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', width: '58px', height: '24px', borderRadius: '8px', backgroundColor: '#FFC0C0', color: '#FF4D4D' }}>驳回</div>}
                                    {item.applicationStatus === '待办' && (
                                        <>
                                            <Button
                                                type="primary"
                                                loading={item.loading}
                                                disabled={item.disabled}
                                                onClick={() => agree(item.applyMonitorProjectId, 1)}
                                                style={{ width: '58px', height: '24px', fontSize: '12px', borderRadius: '4px' }}
                                            >
                                                同意
                                            </Button>
                                            <Button
                                                disabled={item.disabled}
                                                onClick={() => showModal(item.applyMonitorProjectId)}
                                                style={{ width: '58px', height: '24px', fontSize: '12px', borderRadius: '4px' }}
                                            >
                                                拒绝
                                            </Button>
                                        </>
                                    )}
                                </Space>
                            </Flex>
                        </List.Item>
                    )}
                />
            )}
            <Modal title="拒绝理由" footer={null} open={isModalOpen} onCancel={handleCancel}>
                <Flex vertical style={{ width: '100%', marginTop: '30px' }} align="center">
                    <Input.TextArea rows={10} placeholder="请输入拒绝理由" onChange={handleInputChange}></Input.TextArea>
                    <Button
                        style={{ width: '58px', height: '30px', marginTop: '15px' }}
                        loading={applyData.find(item => item.applyMonitorProjectId === myApplicationId)?.loading}
                        disabled={applyData.find(item => item.applyMonitorProjectId === myApplicationId)?.disabled}
                        onClick={() => agree(myApplicationId, 2, inputValue)}
                    >
                        拒绝
                    </Button>
                </Flex>
            </Modal>
        </Flex>
    );
};

export default ApplyToMe;
