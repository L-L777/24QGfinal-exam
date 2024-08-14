import React, { useState, useEffect } from 'react';
import { Row, Col, Empty, Pagination } from "antd"
import ProjectCard from "../../../components/projectCard";
import { showHaveMonitorPermissionProjects } from "../../../api"
import { myProjectData } from '../../../mock/data';
const MyMonitor = ({userId}) => {
    const [myMonitor, setMyMonitor] = useState([])
    const [total, setTotal] = useState(0)
    const [nowPage, setNowPage] = useState(1)
    const pageChange = (page) => {
        if (page === nowPage) {
            return;
        }
        setNowPage(page)
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const myProjectReponse = await showHaveMonitorPermissionProjects(userId, nowPage, 8)
                if(myProjectReponse.code===1){
                    setMyMonitor(myProjectReponse.data.data)
                    setTotal(myProjectReponse.data.total)
                    // console.log(myProjectReponse.data.data);
                }else{
                    setMyMonitor([])
                    setTotal(0)
                }
                
                
            } catch (error) {
                setMyMonitor(myProjectData.data)
                setTotal(myProjectData.total)
            }
        }
        fetchData();
    }, [nowPage])
    return (
        <>
        <Row gutter={[75, 50]} style={{ width: "100%" }} >
            {myMonitor.length === 0 ? (<Empty description="暂无数据" style={{ marginTop: '30px', width: '100%' }} />) : (myMonitor?.map((item) => (
                <Col span={6} >
                    <ProjectCard projectName={item.projectName} projectId={item.projectId} description={item.description} creator={item.creator} createTime={item.createTime}></ProjectCard>
                </Col>
            )))}

        </Row>
            <Pagination align='center' defaultCurrent={1} total={total} pageSize={8} onChange={pageChange} style={{ marginTop: '30px' }} />
        </>
    )
}
export default MyMonitor;