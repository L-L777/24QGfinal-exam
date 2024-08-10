import React, { useState, useEffect } from 'react';
import { Flex, } from "antd"
import PublicMenu from "../../components/menu";
import { showSelfProjects, showHaveMonitorPermissionProjects } from "../../api"
import { myProjectData } from '../../mock/data';
const Personal = () => {
    const userId=localStorage.getItem('userId')
    const [myProject,setMyproject]=useState([])
    const [myMonitor,setMyMonitor]=useState([])
    useEffect(()=>{
        async function fetchData() {
            try{
                // 获取我发布的和我有监测权限的项目
                const myProjectReponse = await showSelfProjects(userId)
                const myMonitorReponse = await showHaveMonitorPermissionProjects(userId)
                setMyproject(myProjectReponse.data)
                setMyMonitor(myMonitorReponse.data)
            }catch(error){
                setMyproject(myProjectData.data)
                setMyMonitor(myProjectData.data)
            }
        }
        fetchData();
    })
    console.log(myProject);
    console.log(myMonitor);
    
    return (
        <Flex style={{
            width: "100%",
            minHeight: "100vh",
            margin: "auto",
        }}>
            {/* 引入侧边栏 */}
            <PublicMenu></PublicMenu>
            {/* 个人管理主要内容 */}
            <Flex style={{
                width: "calc(100% - 250px)",
                minWidth: '1200px',
                minHeight: "100vh",
                margin: "auto",
                backgroundColor: '#F4F2F9',
                marginLeft: '250px'
            }} vertical align="center">
                {/* 页面标题 */}
                <Flex style={{ width: '100%', height: '100px', paddingLeft: '50px', paddingRight: '50px', boxSizing: 'border-box', }} align="center">
                    <h3 style={{ fontSize: '28px' }}>个人管理</h3>
                </Flex>

            </Flex>
        </Flex>
    )
}
export default Personal;