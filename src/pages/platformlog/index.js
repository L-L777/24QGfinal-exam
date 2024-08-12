
import React, { useState } from "react"; 
import { Flex, Dropdown, Button } from "antd"
import PublicMenu from "../../components/menu"
import AttackLog from "./attacklog";
import UserOperateLog from "./userOperateLog";
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
                    <h3 style={{ fontSize: '28px' }}>平台日志</h3>
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