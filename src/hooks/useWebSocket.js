import { useEffect, useState, useCallback } from "react";
import webSocketService from "../services/webSocketService";

const useWebSocket = (onMessageCallback) => {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  // 连接 WebSocket
  const connect = useCallback(() => {
    webSocketService.connect();
  }, []);

  // 断开 WebSocket
  const disconnect = useCallback(() => {
    webSocketService.disconnect();
  }, []);

  // 发送消息到 WebSocket
  const sendMessage = useCallback((message) => {
    webSocketService.sendMessage(message);
  }, []);

  // 注册消息处理函数
  useEffect(() => {
    if (onMessageCallback) {
      webSocketService.onMessage(onMessageCallback);
    }
    return () => {
      if (onMessageCallback) {
        webSocketService.offMessage(onMessageCallback);
      }
    };
  }, [onMessageCallback]);

  // 处理连接状态变化
  useEffect(() => {
    const handleOpen = () => {
      setConnected(true);
      setError(null);
    };

    const handleClose = (event) => {
      setConnected(false);
      if (!event.wasClean) {
        setError("WebSocket connection closed with error.");
      }
    };

    const handleError = (event) => {
      setError(`WebSocket error: ${event.message}`);
      console.log(`WebSocket error: ${event.message}`);
    };

    // 确保 WebSocket 已连接
    const socket = webSocketService.socket;
    if (socket) {
      socket.addEventListener("open", handleOpen);
      socket.addEventListener("close", handleClose);
      socket.addEventListener("error", handleError);
    }

    // 清理 WebSocket 事件监听器
    return () => {
      if (socket) {
        socket.removeEventListener("open", handleOpen);
        socket.removeEventListener("close", handleClose);
        socket.removeEventListener("error", handleError);
      }
    };
  }, [error, onMessageCallback]);

  return {
    connect,
    disconnect,
    connected,
    error,
    sendMessage,
  };
};

export default useWebSocket;
