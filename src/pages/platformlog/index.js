
import React, { useState,useEffect } from "react"; 
import { Flex, Dropdown, Button } from "antd"
import PublicMenu from "../../components/menu"
import AttackLog from "./attacklog";
import UserOperateLog from "./userOperateLog";
import { useRole } from "../../utils/roleContext";
import {  useNavigate } from "react-router-dom";
const items = [
    {
        label: '攻击日志',
        key: '1',
    },
    {
        label: '用户操作日志',
        key: '2',
    },
];
const PlatformLog = () => {
    const navigate=useNavigate();
    const {role}=useRole()
    useEffect(()=>{
document.title="平台日志"
if(role.role!=='管理员'){
    navigate('/login')
}
    },[])
    const [selectedLog, setSelectedLog] = useState('1');
    const handleMenuClick = ({ key }) => {
        setSelectedLog(key);
    };

    return (
        <Flex style={{
            width: "100%",
            minHeight: "100vh",
            margin: "auto",
        }}>
            {/* 引入侧边栏 */}
            <PublicMenu></PublicMenu>
            {/* 项目管理页面主要内容 */}
            <Flex style={{
                width: "calc(100% - 250px)",
                minWidth: '1200px',
                minHeight: "100vh",
                margin: "auto",
                backgroundColor: '#F4F2F9',
                marginLeft: '250px'
            }} vertical align="center">
                <Flex align="center" justify="space-between" style={{
                    width: '100%',
                    height: '100px',
                    paddingLeft: '50px', paddingRight: '50px', boxSizing: 'border-box',
                    borderBottom: '1px solid #d0c8d9',
                }}>
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <h3
                            style={{
                                fontSize: "28px",
                                position: "relative", // 使文本相对于投影区域
                                zIndex: 1, // 确保文本在投影区域之上
                            }}
                        >
                            平台日志
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
                    <Dropdown menu={{
                        items,
                        onClick: handleMenuClick,
                    }}
                        placement="bottom">
                        <Button type='primary' style={{width:'150px',height:'40px',marginRight:'50px'}}>选择日志类型</Button>
                    </Dropdown>
                </Flex>
                {selectedLog === '1' && <AttackLog />}
                {selectedLog === '2' && <UserOperateLog />}
            </Flex>
        </Flex>
    )
}
export default PlatformLog;