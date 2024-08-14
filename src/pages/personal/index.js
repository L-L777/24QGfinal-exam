import React, {  useEffect, useState } from 'react';
import { Flex, Space } from "antd"
import { useLocation } from "react-router-dom";
import PublicMenu from "../../components/menu";
import UploadDrawer from '../../components/uploadDraw/uploadDrawer';
import MyInfo from './myInfo';
import MyProject from './myproject/myproject';
import MyApply from './myApply/apply';
import { useRole } from "../../utils/roleContext"
const Personal = () => {
    const {role}=useRole()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const userName = searchParams.get('userName')
    const [userId, setUserId] = useState(parseInt(localStorage.getItem('userId')))
 

    useEffect(() => {
        document.title = '个人管理'
        if (role.role === '管理员') {
            setUserId(parseInt(searchParams.get('userId')))
        } else {
            setUserId(parseInt(localStorage.getItem('userId')))
        }
    },[])
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
                <Flex justify="space-between" style={{ width: '100%', height: '100px', paddingLeft: '50px', paddingRight: '50px', boxSizing: 'border-box', }} align="center">
                    <h3 style={{ fontSize: '28px' }}>个人管理</h3>
                    <Space style={{ width: '250px', height: '45px' }}>
                        <UploadDrawer></UploadDrawer>
                    </Space>
                </Flex>
                <MyInfo userName={userName} userId={userId}></MyInfo>
                <MyProject userName={userName} userId={userId}></MyProject>
                <MyApply userName={userName} userId={userId}></MyApply>
            </Flex>
        </Flex>
    )
}
export default Personal;