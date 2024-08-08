import backgroundImage from "../../assets/403.svg";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Forbidden() {
  useEffect(() => {
    document.title = "403";
  }, []);
  const navigate = useNavigate();
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
      <Button type="primary" onClick={() => navigate("/login")}>
        返回页面
      </Button>
    </div>
  );
}
export default Forbidden;
