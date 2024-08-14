import Router from "./router";

import { RoleProvider } from "./utils/roleContext";
import { WebSocketProvider } from "./utils/WebSocketContext";
function App() {
  return (
    <RoleProvider>
      <WebSocketProvider>
        <div className="App">
          <Router />
        </div>
      </WebSocketProvider>
    </RoleProvider>
  );
}

export default App;
