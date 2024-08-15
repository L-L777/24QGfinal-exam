// src/services/webSocketService.js

const WEB_SOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

let socket = null;
const onMessageCallbacks = [];
let shouldReconnect = true;
let heartbeatInterval = null;
const HEARTBEAT_INTERVAL = 5000; // 30 seconds
const HEARTBEAT_MESSAGE = JSON.stringify({ methodName: "heartbeat" });

//建立WebSocket连接
const connect = (userId) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.warn("WebSocket connection already open");
    return; //已经连接
  }
  // 如果已有连接但非开启状态，先关闭
  if (socket) {
    socket.close();
  }
  // 将 userId 添加到 WebSocket URL 后面
  const urlWithUserId = `${WEB_SOCKET_URL}/${userId}`;
  console.log("WebSocket URL with userId:", urlWithUserId);
  socket = new WebSocket(urlWithUserId);
  socket.onopen = () => {
    console.log("WebSocket连接已打开");
    // 开始发送心跳
    startHeartbeat();
  };
  socket.onmessage = (event) => {
    console.log("收到消息", JSON.parse(event.data));

    try {
      const message = JSON.parse(event.data);
      if (message.methodName === "heartbeat") {
        console.log("收到心跳消息");
        return;
      }
      onMessageCallbacks.forEach((callback) => callback(message));
    } catch (error) {
      console.error("WebSocket消息解析失败", error);
    }
  };
  socket.onerror = (error) => {
    console.error(error);
  };
  socket.onclose = (event) => {
    console.log("WebSocket连接已关闭", event);
    //停止心跳
    stopHeartbeat();
    if (shouldReconnect) {
      setTimeout(() => {
        connect();
      }, 5000); //5秒后重连
    }
  };
};

// 发送消息到服务器
const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.warn("WebSocket is not open. Cannot send message.");
  }
};
//注册消息处理函数
const onMessage = (callback) => {
  onMessageCallbacks.push(callback);
};
//取消注册消息处理函数
const offMessage = (callback) => {
  const index = onMessageCallbacks.indexOf(callback);
  if (index !== -1) {
    onMessageCallbacks.splice(index, 1);
  }
};
//断开webSocket连接
const disconnect = () => {
  shouldReconnect = false;
  if (socket) {
    socket.close();
    socket = null;
  }
  //停止心跳
  stopHeartbeat();
};

//启动心跳
const startHeartbeat = () => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval); //防止重复
  }
  heartbeatInterval = setInterval(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(HEARTBEAT_MESSAGE);
    }
  }, HEARTBEAT_INTERVAL);
};

//停止心跳
const stopHeartbeat = () => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
};

const webSocketService = {
  connect,
  onMessage,
  offMessage,
  disconnect,
  sendMessage, // 导出发送消息的方法
};
export default webSocketService;
