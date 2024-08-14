// src/contexts/WebSocketContext.js

import React, { createContext, useContext, useCallback, useState } from "react";
import useWebSocket from "../hooks/useWebSocket";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [callbacks, setCallbacks] = useState([]);

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
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebSocketContext);
