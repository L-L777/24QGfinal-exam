import backgroundImage from "../../assets/500.svg";
import { Button } from "antd";
function Servererror() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <img src={backgroundImage} alt="403" />
      <p style={{ fontWeight: "600", color: "#727785" }}>
        对不起，服务器报告错误。
      </p>
      <Button type="primary">返回页面</Button>
    </div>
  );
}
export default Servererror;
