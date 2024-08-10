import React, { useState,useEffect } from 'react';
import PublicMenu from "../../components/menu"
import { Flex, Space, Input, Row, Col, Pagination } from "antd"
import styled from 'styled-components';
import ProjectCard from "../../components/projectCard";
import UploadDrawer from "./uploadDrawer";
import { showAllProjectForUser } from "../../api"
import { allProjectData } from '../../mock/data';
const CustomSearch = styled(Input.Search)`
  && { /* 提高优先级 */
    width: 300px;
    height: 45px;
    border-radius: 5px;

    .ant-input {
      height: 45px;
      border-radius: 5px 0 0 5px;
      font-size: 16px;
      color: #333;
      padding-left: 15px;
      background-color: transparent;
      border-right:0;
    }

    .ant-input:hover, .ant-input:focus {
      border-right:1px solid;
      box-shadow: none !important;
    }

    .ant-input-search-button {
      height: 45px;
      background-color: transparent;
      color: #fff;
      border-radius: 0 5px 5px 0;
      border-left:0;
      font-size: 16px;
      &:hover {
      border-left:0;
        background-color: #481372 !important;
      }
    }
  }
`;
const ProjectShow = () => {
    const [total, setTotal] = useState(allProjectData.total)
    const [listData, setListData] = useState(allProjectData.List)
    const [projectName,setProjectName]=useState('')
    const [searchStatus,setSearchStatus]=useState(false)
    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await showAllProjectForUser(1, 16);
                setTotal(response.data.total)
                setListData(response.data.List)
                
            } catch (error) {
                // console.log(allProjectData);
               setTotal(allProjectData.total)
               setListData(allProjectData.List)
            //    console.log(total);
            //    console.log(listData); 
            }
        }
        fetchData();
    },[])
    // 换页函数
    const changePage = async (page, pageSize) => {
        // console.log(page);
        // console.log(pageSize);
        try {
            const response = await showAllProjectForUser(page, pageSize[0], projectName);
            setTotal(response.data.total)
            setListData(response.data.List)

        } catch (error) {
            setTotal(allProjectData.total)
            setListData(allProjectData.List)
        }
    }
    // 搜索函数
    const searchProject = async (value,event)=>{
        setSearchStatus(true)
        setProjectName(value)
        try {
            const response = await showAllProjectForUser(1, 16,projectName);
            setTotal(response.data.total)
            setListData(response.data.List)
            setSearchStatus(false)

        } catch (error) {
            setTotal(allProjectData.total)
            setListData(allProjectData.List)
            setSearchStatus(false)
        }
    }
    return (
        <Flex
            style={{
                width: "100%",
                minHeight: "100vh",
                margin: "auto",
            }}>
            {/* 引入侧边栏 */}
            <PublicMenu></PublicMenu>
            {/* 项目管理页面主要内容 */}
            <Flex
                style={{
                    width: "calc(100% - 250px)",
                    minWidth:'1200px',
                    minHeight: "100vh",
                    margin: "auto",
                    backgroundColor: '#f3ebf7',
                    marginLeft: '250px'
                }} vertical align="center">
                {/* 顶部内容 */}
                <Flex align="center" justify="space-between" style={{
                    width: '100%',
                    height: '100px',
                    paddingLeft: '50px', paddingRight: '50px', boxSizing: 'border-box',
                    borderBottom: '1px solid #d0c8d9',
                }}>
                    <h3 style={{ fontSize: '28px' }}>项目管理</h3>
                    <Space style={{ width: '500px', height: '45px' }}>
                        <CustomSearch loading={searchStatus} style={{
                            height: '100%', width: '250px', backgroundColor: 'transparent'
                        }} placeholder="搜索" onSearch={searchProject}></CustomSearch>
                        <UploadDrawer></UploadDrawer>
                    </Space>
                </Flex>
                {/* 项目展示 */}
                <Flex style={{width:'90%',marginTop:'30px'}} justify="center">
                    <Row gutter={[75,50]}  style={{width:"100%"}} >
                        {listData?.map((item) => (
                            <Col span={6} >
                                <ProjectCard projectName={item.projectName} projectId={item.projectId} description={item.description} creator={item.creator} createTime={item.createTime}></ProjectCard>
                            </Col>
                        ))}
                    </Row>
                </Flex>
                <Pagination
                    total={total}
                    showSizeChanger
                    showQuickJumper
                    pageSizeOptions={[16, 24]} defaultPageSize={[16]}
                    onChange={changePage}
                    showTotal={(total) => `Total ${total} items`}
                    style={{marginTop:'30px',marginBottom:'30px'}}
                />
            </Flex>
        </Flex>
    )
}
export default ProjectShow