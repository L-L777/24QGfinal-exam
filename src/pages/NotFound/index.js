import backgrondImage from "../../assets/404.svg";
import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function NotFound() {
  useEffect(() => {
    document.title = "404";
  }, []);

  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <img
        src={backgrondImage}
        alt="404"
        style={{ width: "700px", height: "auto" }}
      ></img>
      <p style={{ fontWeight: "600", color: "#727785" }}>
        对不起，您访问的页面不存在。
      </p>
      <Button type="primary" onClick={() => navigate("/login")}>
        返回页面
      </Button>
    </div>
  );
}
export default NotFound;
