import React, { useState} from 'react';
import { Flex, Menu} from "antd";
import { LogoutOutlined, DatabaseOutlined, ExclamationCircleOutlined, UserOutlined, SnippetsOutlined } from '@ant-design/icons';
import logo from "../../assets/icon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';
const CustomMenuItem = styled(Menu.Item)`
  && { /* 使用双 && 提高优先级 */
    width: 214px;
    height: 54px;
    margin-top:10px;
    color: #fff;
    line-height: 54px;
    text-align: center;
    font-size: 18px;
  cursor: pointer;
    &:hover {
      background-color: rgba(184, 184, 184, 0.5) !important; /* 悬停时的背景色,80%不透明度 */
      color: #fff !important;
    }
&.ant-menu-item-selected {
        background-color: rgba(184, 184, 184, 0.5) !important; /* 选中后的背景色,80%不透明度 */
    }
         .ant-menu-item-icon {
      font-size: 20px !important; /* 图标大小 */
    }
  }
`;
const PublicMenu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState(location.pathname);
    const handleClick = (e) => {
        if (e.key !== '/help') {
            setSelectedKey(e.key);
            navigate(e.key);
        }
    };
    return (
        <Menu
            style={{
                width: '250px',
                height: '100vh',
                backgroundColor: '#431978',
                position: "fixed", top: "0px", left: '0px',
                zIndex:'1000'
            }}

        >
            {/* 顶部logo和用户名展示 */}
            <Flex
                style={{ marginTop: '30px', width: '100%', height: '52px', }}
                justify="center">
                <img src={logo} style={{ width: '50px', height: '50px' }} alt='logo'></img>
                <Flex style={{ width: '109px', height: '52px', color: '#FFF', marginLeft: '16px' }} vertical >
                    <div style={{ height: '26px', fontSize: '14px', lineHeight: '26px' }}>用户/管理员</div>
                    <div style={{ height: '21px', fontSize: '12px', lineHeight: '21px' }}>用户名</div>
                </Flex>
            </Flex>
            {/* 菜单选项 */}
            <Flex vertical justify="space-between" align="center" style={{ height: 'calc(100vh - 125px)', width: '100%', marginTop: '20px', overflow: 'auto', scrollbarWidth: 'none' }}>
                <Menu selectedKeys={[selectedKey]}
                    onClick={handleClick}
                    style={{ backgroundColor: 'transparent' }}>
                    <CustomMenuItem key="/projectshow" icon={<DatabaseOutlined />}>项目管理</CustomMenuItem>
                    <CustomMenuItem key="/personal" icon={<UserOutlined />}>个人管理</CustomMenuItem>
                    <CustomMenuItem key="/platformdetail" icon={<SnippetsOutlined />}>平台日志</CustomMenuItem>
                </Menu>
                <Menu selectedKeys={[selectedKey]}
                    onClick={handleClick}
                    style={{ backgroundColor: 'transparent' }}>
                    <CustomMenuItem key="/help" icon={<ExclamationCircleOutlined />}>帮助</CustomMenuItem>
                    <CustomMenuItem key='/login' icon={<LogoutOutlined />}>注销</CustomMenuItem>
                </Menu>
            </Flex>
        </Menu>
    )
}
export default PublicMenu;