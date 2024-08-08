import backgroundImage from "../../assets/500.svg";
import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Servererror() {
  useEffect(() => {
    document.title = "500";
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
        对不起，服务器报告错误。
      </p>
      <Button type="primary" onClick={() => navigate("/login")}>
        返回页面
      </Button>
    </div>
  );
}
export default Servererror;
