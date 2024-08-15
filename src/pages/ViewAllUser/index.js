import React, { useEffect, useState } from "react";
import PublicMenu from "../../components/menu";
import UserData from "./UserData.js";
import { Flex, Card, message as antdMessage } from "antd";
import useWebSocket from "../../hooks/useWebSocket.js";
import { useNavigate } from "react-router-dom";

const ViewAllUser = () => {
  const navigate = useNavigate();
  const [url] = useState("admin");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    document.title = "用户管理";
  }, []);
  // 消息处理回调
  const onMessageCallback = (message) => {
    console.log("Received WebSocket message:", message);
    if (message.type === "multiLog") {
      antdMessage.error("多地登录，请重新登录");
      navigate("/login");
    }
    setUsers(message.userList ? message.userList : []);
  };
  // 使用自定义 Hook
  const { connect, disconnect } = useWebSocket(onMessageCallback);
  useEffect(() => {
    connect(url);
    // 组件卸载时断开 WebSocket 连接
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);
  return (
    <Flex
      style={{
        width: "100%",
        minHeight: "100vh",
        margin: "auto",
      }}
    >
      <PublicMenu></PublicMenu>
      <Flex
        style={{
          width: "calc(100% - 250px)",
          minWidth: "1200px",
          minHeight: "100vh",
          margin: "auto",
          backgroundColor: "#F4F2F9",
          marginLeft: "250px",
        }}
        vertical
        align="center"
      >
        <Flex
          style={{
            width: "100%",
            height: "100px",
            paddingLeft: "50px",
            paddingRight: "50px",
            boxSizing: "border-box",
          }}
          align="center"
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <h3
              style={{
                fontSize: "28px",
                position: "relative", // 使文本相对于投影区域
                zIndex: 1, // 确保文本在投影区域之上
              }}
            >
              用户管理
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
        </Flex>
        <Flex
          style={{
            width: "100%",
            paddingLeft: "50px",
            paddingRight: "50px",
            boxSizing: "border-box",
          }}
          align="center"
        >
          <Card
            style={{ width: "100%", minHeight: "937px", borderRadius: "6px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)", // 6列均等
                margin: "18px ",
                fontSize: "18px",
                fontWeight: "bold",

                textAlign: "center",
              }}
            >
              <span>用户名</span>
              <span>用户id</span>
              <span>状态</span>
              <span>注册时间</span>
              <span>冻结</span>
              <span>操作</span>
            </div>
            {users.map((user, index) => (
              <UserData user={user} key={index} />
            ))}
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ViewAllUser;
