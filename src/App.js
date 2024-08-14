// import { useEffect } from "react";
import Router from "./router";
// import useWebSocket from "./hooks/useWebSocket";
import { RoleProvider,ReleaseProvider } from "./utils/roleContext";
function App() {
  // // 消息处理回调
  // const onMessageCallback = (message) => {
  //   console.log("Received WebSocket message:", message);
  //   // 在这里处理消息逻辑
  // };
  // // 使用自定义 Hook
  // const { connect, disconnect } = useWebSocket(onMessageCallback);
  // useEffect(() => {
  //   connect();
  //   // 组件卸载时断开 WebSocket 连接
  //   return () => {
  //     disconnect();
  //   };
  // }, [connect, disconnect]);
  return (
    <RoleProvider>
      <ReleaseProvider>
      <div className="App">
        <Router />
      </div>
      </ReleaseProvider>
    </RoleProvider>
  );
}

export default App;
