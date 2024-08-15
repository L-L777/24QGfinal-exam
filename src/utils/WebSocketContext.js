// src/contexts/WebSocketContext.js

import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import useWebSocket from "../hooks/useWebSocket";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [callbacks, setCallbacks] = useState([]);
  const [userId, setUserId] = useState(null);
  const onMessageCallback = useCallback(
    (message) => {
      callbacks.forEach((callback) => callback(message));
    },
    [callbacks]
  );

  const { connect, disconnect, sendMessage, connected, error } =
    useWebSocket(onMessageCallback);

  // 注册消息处理函数
  const registerMessageCallback = (callback) => {
    setCallbacks((prev) => [...prev, callback]);
  };

  // 取消注册消息处理函数
  const unregisterMessageCallback = (callback) => {
    setCallbacks((prev) => prev.filter((cb) => cb !== callback));
  };

  useEffect(() => {
    if (userId) {
      connect(userId);
    }

    // 页面卸载时断开 WebSocket 连接
    return () => {
      disconnect();
    };
  }, [userId, connect, disconnect]);
  return (
    <WebSocketContext.Provider
      value={{
        connect,
        disconnect,
        sendMessage,
        connected,
        error,
        registerMessageCallback,
        unregisterMessageCallback,
        setUserId,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
