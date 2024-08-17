import Router from "./router";

import { RoleProvider, ReleaseProvider } from "./utils/roleContext";
import { WebSocketProvider } from "./utils/WebSocketContext";
function App() {
  return (
    <RoleProvider>
      <ReleaseProvider>
        <WebSocketProvider>
          <div className="App">
            <Router />
          </div>
        </WebSocketProvider>
      </ReleaseProvider>
    </RoleProvider>
  );
}

export default App;
