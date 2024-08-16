import { useState,useEffect } from "react";
import { Flex, List, Space,Empty } from "antd";
import DetailModal from "./alertModal";
import { myApplicationProject } from "../../../api"
import { userProjectData } from '../../../mock/data';
import GetSdk from "./getSdk";
const ProjectApply = ({userId}) => {
    const [page,setPage]=useState(1)
    const [pageSize,setPageSize]=useState(10)
    const [applyData,setApplyData]=useState([])
    const [total,setTotal]=useState(20)
    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await myApplicationProject(userId,page, pageSize);
                if(response.code===1){
                    setApplyData(response.data.data)
                    setTotal(response.data.total)
                }else{
                    setApplyData([])
                    setTotal(0)
                }


            } catch (error) {
                setApplyData(userProjectData.data)
                setTotal(userProjectData.total)
            }
        }
        fetchData();
    },[page,pageSize,userId])
    return (
        <Flex style={{ width: '100%' }}>
            {applyData.length===0 ? (<Empty description="暂无数据" style={{ marginTop: '30px', width: '100%' }} />) : (<List
                pagination={{
                    align: 'center',
                    total: total,
                    pageSize: pageSize, // 每页显示多少项
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '50', '100'],
                    onChange: (page, pageSize) => {
                        setPage(page)
                        setPageSize(pageSize)
                    }
                }}
                style={{ width: '100%' }}
                dataSource={applyData}
                renderItem={(item) => (
                    <List.Item >
                        <Flex style={{ width: '100%' }} justify="space-between">
                            {item.applicationType === '上传新软件' && <div>关于{item.projectName}发布的申请</div>}
                            {item.applicationType === '更新软件' && <div>关于{item.projectName}更新的申请</div>}
                            <Space size={20}>
                                <div>{item.applicationTime}</div>
                                {item.applicationStatus === '通过' && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', width: '58px', height: '24px', borderRadius: '8px', backgroundColor: '#E0D1FF', color: '#9053C0' }}>同意</div>}
                                {item.applicationStatus === '拒绝' && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', width: '58px', height: '24px', borderRadius: '8px', backgroundColor: '#FFC0C0', color: '#FF4D4D' }}>驳回</div>}
                                {item.applicationStatus === '待定' && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', width: '58px', height: '24px', borderRadius: '8px', backgroundColor: '#D0EBFF', color: '#4EA6F8' }}>待审核</div>}
                                <div style={{ width: '58px', }}>
                                    {item.applicationStatus === '拒绝' && <DetailModal rejectReason={item.rejectReason}></DetailModal>}
                                    {item.applicationStatus === '通过' && <GetSdk projectId={item.projectId}></GetSdk>}
                                </div>

                            </Space>

                        </Flex>
                    </List.Item>
                )}
            />)}
            
        </Flex>
    )
}
export default ProjectApply;