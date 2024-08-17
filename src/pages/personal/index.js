import React, {  useEffect, useState } from 'react';
import { Flex, Space } from "antd"
import { useLocation,useNavigate } from "react-router-dom";
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
    const [userId, setUserId] = useState(() => {
        if (role.role === '管理员') {
            return parseInt(searchParams.get('userId'));
        } else if (role.role === '用户') {
            return parseInt(localStorage.getItem('userId'));
        }
        return null; // 如果没有匹配的角色
    });
    const navigate = useNavigate();

    useEffect(() => {
        document.title = '个人管理'
        if (role.role === '管理员') {
            setUserId(parseInt(searchParams.get('userId')))
        } else if(role.role==='用户') {
            setUserId(parseInt(localStorage.getItem('userId')))
        }else{
            navigate('/login')
        }
    }, [])
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
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <h3
                            style={{
                                fontSize: "28px",
                                position: "relative", // 使文本相对于投影区域
                                zIndex: 1, // 确保文本在投影区域之上
                            }}
                        >
                            个人管理
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