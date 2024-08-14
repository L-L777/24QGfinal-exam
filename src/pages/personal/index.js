import React, {  useEffect } from 'react';
import { Flex, Space } from "antd"
import PublicMenu from "../../components/menu";
import UploadDrawer from '../../components/uploadDraw/uploadDrawer';
import MyInfo from './myInfo';
import MyProject from './myproject/myproject';
import MyApply from './myApply/apply';
const Personal = () => {
    useEffect(() => {
        document.title = '个人管理'

    })
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
                <MyInfo></MyInfo>
                <MyProject></MyProject>
                <MyApply></MyApply>
            </Flex>
        </Flex>
    )
}
export default Personal;