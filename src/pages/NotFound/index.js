import backgrondImage from "../../assets/404.svg";
import { Button } from "antd";
function NotFound() {
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
      <img src={backgrondImage} alt="404"></img>
      <p style={{ fontWeight: "600", color: "#727785" }}>
        对不起，您访问的页面不存在。
      </p>
      <Button
        type="primary"
        // size="large"
        // style={{ backgroundColor: "#652FFF" }}
      >
        返回页面
      </Button>
    </div>
  );
}
export default NotFound;
