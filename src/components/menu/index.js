import React, { useState, useEffect } from "react";
import { Flex, Menu, message, Alert } from "antd";
import {
  LogoutOutlined,
  DatabaseOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  SnippetsOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import logo from "../../assets/icon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useRole } from "../../utils/roleContext";
import { useWebSocketContext } from "../../utils/WebSocketContext";
import useWebSocket from "../../hooks/useWebSocket.js";
const CustomMenuItem = styled(Menu.Item)`
  && {
    /* 使用双 && 提高优先级 */
    width: 214px;
    height: 54px;
    margin-top: 10px;
    color: #fff;
    line-height: 54px;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      background-color: rgba(
        184,
        184,
        184,
        0.5
      ) !important; /* 悬停时的背景色,80%不透明度 */
      color: #fff !important;
    }
    &.ant-menu-item-selected {
      background-color: rgba(
        184,
        184,
        184,
        0.5
      ) !important; /* 选中后的背景色,80%不透明度 */
    }
    .ant-menu-item-icon {
      font-size: 20px !important; /* 图标大小 */
    }
  }
`;
const PublicMenu = () => {
  const { role } = useRole();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const [mesItem, setMesItem] = useState("");
  const [ItemId, setItemId] = useState();
  const handleClick = (e) => {
    if (e.key !== "/help") {
      setSelectedKey(e.key);
      navigate(e.key);
    }
  };

  // 消息处理回调
  const onMessageCallback = (msg) => {
    console.log("Received WebSocket message:", msg);
    // 处理消息
    if (msg.type === "offline") {
      message.error("强制退出");
      navigate("/login");
    } else if (msg.type === "warning") {
      message.error(msg.msg);
      setMesItem(msg.msg);
      setItemId(msg.data);
    } else if (msg.type === "multiLog") {
      message.error("多地登录，请重新登录");
      navigate("/login");
    }
  };

  // 使用自定义 Hook
  const { setUserId } = useWebSocketContext();
  const { sendMessage } = useWebSocket(onMessageCallback);
  const onClose = () => {
    sendMessage({ methodName: "checkMessage", data: ItemId });
  };
  useEffect(() => {
    if (role.role === "用户") {
      setUserId(localStorage.getItem("userId"));
    }
  }, [role.role, setUserId]);

  return (
    <>
      <Alert
        message="超出预警警告"
        description={mesItem}
        type="error"
        closable
        onClose={onClose}
        style={{
          position: "fixed",
          top: "7%",
          left: "50%",
          zIndex: "100",
          transform: "translate(-50%, -50%)",
          display: mesItem ? "block" : "none",
        }}
      />
      <Menu
        style={{
          width: "250px",
          height: "100vh",
          backgroundColor: "#431978",
          position: "fixed",
          top: "0px",
          left: "0px",
          zIndex: "1000",
        }}
      >
        {/* 顶部logo和用户名展示 */}
        <Flex
          style={{ marginTop: "30px", width: "100%", height: "52px" }}
          justify="center"
        >
          <img
            src={logo}
            style={{ width: "50px", height: "50px" }}
            alt="logo"
          ></img>
          <Flex
            style={{
              width: "109px",
              height: "52px",
              color: "#FFF",
              marginLeft: "16px",
            }}
            vertical
          >
            <div
              style={{ height: "26px", fontSize: "14px", lineHeight: "26px" }}
            >
              {localStorage.getItem("role")}
            </div>
            <div
              style={{ height: "21px", fontSize: "16px", lineHeight: "21px" }}
            >
              {localStorage.getItem("username")}
            </div>
          </Flex>
        </Flex>
        {/* 菜单选项 */}
        <Flex
          vertical
          justify="space-between"
          align="center"
          style={{
            height: "calc(100vh - 125px)",
            width: "100%",
            marginTop: "20px",
            overflow: "auto",
            scrollbarWidth: "none",
          }}
        >
          <Menu
            selectedKeys={[selectedKey]}
            onClick={handleClick}
            style={{ backgroundColor: "transparent" }}
          >
            <CustomMenuItem key="/projectshow" icon={<DatabaseOutlined />}>
              项目管理
            </CustomMenuItem>
            {role.role === "用户" && (
              <CustomMenuItem key="/personal" icon={<UserOutlined />}>
                个人管理
              </CustomMenuItem>
            )}

            {role.role === "管理员" && (
              <CustomMenuItem key="/viewalluser" icon={<TeamOutlined />}>
                用户管理
              </CustomMenuItem>
            )}
            {role.role === "管理员" && (
              <CustomMenuItem key="/platformdetail" icon={<SnippetsOutlined />}>
                平台日志
              </CustomMenuItem>
            )}
          </Menu>
          <Menu
            selectedKeys={[selectedKey]}
            onClick={handleClick}
            style={{ backgroundColor: "transparent" }}
          >
            <CustomMenuItem key="/help" icon={<ExclamationCircleOutlined />}>
              帮助
            </CustomMenuItem>
            <CustomMenuItem key="/login" icon={<LogoutOutlined />}>
              注销
            </CustomMenuItem>
          </Menu>
        </Flex>
      </Menu>
    </>
  );
};
export default PublicMenu;
