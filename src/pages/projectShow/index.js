import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PublicMenu from "../../components/menu"
import { Flex, Space, Input, Row, Col, Pagination, Dropdown, Button, Empty } from "antd"
import styled from 'styled-components';
import ProjectCard from "../../components/projectCard";
import UploadDrawer from "../../components/uploadDraw/uploadDrawer";
import { showAllProjectForUser, pagedQueryPublishedProject, pagedQueryProjectApplication } from "../../api"
import { allProjectData } from '../../mock/data';
import { useRole } from "../../utils/roleContext";
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
const items = [
    {
        label: '已发布',
        key: '1',
    },
    {
        label: '冻结',
        key: '2',
    },
    {
        label: '待审核',
        key: '3',
    },
    {
        label: '拒绝',
        key: '4',
    },
];
const ProjectShow = () => {
    const navigate = useNavigate();
    const { role } = useRole()
    const [total, setTotal] = useState('')
    const [listData, setListData] = useState([])
    const [projectName, setProjectName] = useState('')
    const [searchStatus, setSearchStatus] = useState(false)
    const [nowPage, setNowPage] = useState(1)
    const [NowPageSize, setNowPageSize] = useState(16)
    const [selectedLog, setSelectedLog] = useState('1');
    const handleMenuClick = ({ key }) => {
        setSelectedLog(key);
    };
    useEffect(() => {
        document.title = '项目管理'
        if (role.role !== '管理员' && role.role !== '用户') {
            navigate('/login')
        }
        async function fetchData() {
            try {
                let response
                if (role.role === '用户') {
                    response = await showAllProjectForUser(nowPage, NowPageSize);
                }
                if (role.role === '管理员' && selectedLog === '1') {
                    response = await pagedQueryPublishedProject(1, nowPage, NowPageSize);
                }
                if (role.role === '管理员' && selectedLog === '2') {
                    response = await pagedQueryPublishedProject(0, nowPage, NowPageSize);
                }
                if (role.role === '管理员' && selectedLog === '3') {
                    response = await pagedQueryProjectApplication(0, nowPage, NowPageSize);
                }
                if (role.role === '管理员' && selectedLog === '4') {
                    response = await pagedQueryProjectApplication(2, nowPage, NowPageSize);
                }
                if (response.code === 1) {
                    setTotal(response.data.total)
                    setListData(response.data.data)
                } else {
                    setTotal(0)
                    setListData([])
                }
            } catch (error) {
                setTotal(allProjectData.total)
                setListData(allProjectData.List)
            }
        }
        fetchData();
    }, [nowPage, NowPageSize, role, selectedLog])
    // 换页函数
    const changePage = async (page, pageSize) => {
        let size
        if (Array.isArray(pageSize)) {
            size = pageSize[0]
        } else {
            size = pageSize
        }
        setNowPage(page)
        setNowPageSize(size)
    }
    // 搜索函数
    const searchProject = async (value, event) => {
        setSearchStatus(true)
        setProjectName(value)
        try {
            let response
            if (role.role === '用户') {
                response = await showAllProjectForUser(1, 16, projectName);
            }
            if (role.role === '管理员' && selectedLog === '1') {
                response = await pagedQueryPublishedProject(1, 1, 16, projectName);
            }
            if (role.role === '管理员' && selectedLog === '2') {
                response = await pagedQueryPublishedProject(0, 1, 16, projectName);
            }
            if (role.role === '管理员' && selectedLog === '3') {
                response = await pagedQueryProjectApplication(0, 1, 16, projectName);
            }
            if (role.role === '管理员' && selectedLog === '4') {
                response = await pagedQueryProjectApplication(2, 1, 16, projectName);
            }
            setTotal(response.data.total)
            setListData(response.data.data)
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
                    minWidth: '1200px',
                    minHeight: "100vh",
                    margin: "auto",
                    backgroundColor: '#F4F2F9',
                    marginLeft: '250px'
                }} vertical align="center">
                {/* 顶部内容 */}
                <Flex align="center" justify="space-between" style={{
                    width: '100%',
                    height: '100px',
                    paddingLeft: '50px', paddingRight: '50px', boxSizing: 'border-box',
                    borderBottom: '1px solid #d0c8d9',
                }}>
                    <Flex style={{height:'100%'}} align='center' gap={30}>
                        <div style={{ position: "relative", display: "inline-block" }}>
                            <h3
                                style={{
                                    fontSize: "28px",
                                    position: "relative", // 使文本相对于投影区域
                                    zIndex: 1, // 确保文本在投影区域之上
                                }}
                            >
                                项目管理
                            </h3>
                            <div
                                style={{
                                    position: "absolute",
                                    left: "-11px",
                                    bottom: "-5px", // 调整阴影区域的垂直位置
                                    width: "127px",
                                    height: "12px", // 阴影区域的高度
                                    background: "linear-gradient(to right, #C8B5FF, #C496FF)",
                                    transform: "skewX(-20deg)", // 使左右边变斜
                                    transformOrigin: "bottom", // 设置变换的起点为底部
                                    zIndex: 0, // 将阴影区域放在文本下方
                                }}
                            ></div>
                        </div>
                        {role.role === "管理员" && (<Dropdown menu={{
                            items,
                            onClick: handleMenuClick,
                        }}
                            placement="bottom">
                            <Button type='primary' style={{ width: '150px', height: '40px', marginRight: '50px' }}>选择项目类型</Button>
                        </Dropdown>)}
                    </Flex>

                    <Space style={{ width: '500px', height: '45px' }}>
                        <CustomSearch loading={searchStatus} style={{
                            height: '100%', width: '250px', backgroundColor: 'transparent'
                        }} placeholder="搜索" onSearch={searchProject}></CustomSearch>
                        <UploadDrawer></UploadDrawer>
                    </Space>
                </Flex>
                {/* 项目展示 */}
                <Flex style={{ width: '90%', marginTop: '30px' }} justify="center">
                    {listData.length === 0 ? (<Empty description="暂无数据" style={{ marginTop: '30px', width: '100%' }} />) : (<Row gutter={[75, 50]} style={{ width: "100%" }} >
                        {listData?.map((item) => (
                            <Col span={6} >
                                <ProjectCard projectName={item.projectName} projectId={item.projectId} description={item.description} creator={item.creator} createTime={item.createTime} applicationId={item.applicationId} selectedLog={selectedLog}></ProjectCard>
                            </Col>
                        ))}
                    </Row>)}
                </Flex>
                <Pagination
                    total={total}
                    showSizeChanger
                    showQuickJumper
                    pageSizeOptions={[16, 24]} defaultPageSize={[16]}
                    onChange={changePage}
                    showTotal={(total) => `Total ${total} items`}
                    style={{ marginTop: '30px', marginBottom: '30px' }}
                />
            </Flex>
        </Flex>
    )
}
export default ProjectShow