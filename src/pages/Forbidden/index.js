import backgroundImage from "../../assets/403.svg";
import { Button } from "antd";
function Forbidden() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
        height: "100vh",
      }}
    >
      <img
        src={backgroundImage}
        alt="403"
        style={{ width: "700px", height: "auto" }}
      />
      <p style={{ fontWeight: "600", color: "#727785" }}>
        对不起，您没有访问该资源的权限。
      </p>
      <Button type="primary">返回页面</Button>
    </div>
  );
}
export default Forbidden;
