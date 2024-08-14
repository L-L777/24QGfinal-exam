import React, { useState, useEffect } from 'react';
import { Row, Col, Empty, Pagination } from "antd"
import ProjectCard from "../../../components/projectCard";
import { showSelfProjects } from "../../../api"
import { myProjectData } from '../../../mock/data';
import { useRole } from "../../../utils/roleContext"
const MyUpload=({userId})=>{
    const {role}=useRole()
    const [myProject, setMyproject] = useState([])
    const [total,setTotal]=useState(0)
    const [nowPage,setNowPage]=useState(1)
    const pageChange=(page)=>{
        if(page===nowPage){
            return;
        }
setNowPage(page)
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const myProjectReponse = await showSelfProjects(userId,nowPage,8)
                if(myProjectReponse.code===1){
                    setMyproject(myProjectReponse.data.data)
                    setTotal(myProjectReponse.data.total)
                }else{
                    setMyproject([])
                    setTotal(0)
                }
               
            } catch (error) {
                setMyproject(myProjectData.data)
                setTotal(myProjectData.total)
            }
        }
        fetchData();
    },[nowPage])
    return(
        <>
        <Row gutter={[75, 50]} style={{ width: "100%" }} >
            {myProject.length === 0 ? (<Empty description="暂无数据" style={{ marginTop: '30px',width:'100%' }} />) : (myProject?.map((item) => (
                <Col span={6} >
                    <ProjectCard projectName={item.projectName} projectId={item.projectId} description={item.description} creator={role.username} createTime={item.createTime}></ProjectCard>
                </Col>
            )))}
                
        </Row>
            <Pagination align='center' defaultCurrent={1} total={total} pageSize={8} onChange={pageChange}  style={{marginTop:'30px'}}/>
        </>
    )
}
export default MyUpload;