import { Button, Flex, Card, Space } from "antd";
import logo from "../../assets/icon.svg";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import { useState, useEffect } from "react";

const topButtonStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  width: "50%",
  height: "100%",
};

const activeButtonStyle = {
  ...topButtonStyle,
  color: "white",

  backgroundColor: "#A789FD",
};

const inactiveButtonStyle = {
  ...topButtonStyle,
  color: "#999999",

  backgroundColor: "#E5E5E5",
};

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true); // true为登录，false为注册
  const handleLoginButtonClick = () => {
    setIsLogin(true);
  };
  const handleRegisterButtonClick = () => {
    setIsLogin(false);
  };
  useEffect(() => {
    document.title = isLogin ? "登录" : "注册";
  }, [isLogin]);
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        width: "100%",
        height: "100vh",
        margin: "auto",
        backgroundImage: `url(${require("../../assets/Backdrop.png")})`,
        backgroundSize: "cover",
      }}
    >
      <Card style={{ width: "670px", height: "760px", borderRadius: "24px" }}>
        <Flex
          justify="center"
          align="center"
          wrap
          vertical
          style={{ height: "100%" }}
        >
          <Flex style={{ width: "540px", height: "60px", marginTop: "50px" }}>
            <Button
              style={{
                ...(isLogin ? activeButtonStyle : inactiveButtonStyle),
                borderRadius: "12px 0 0 12px",
              }}
              onClick={() => handleLoginButtonClick()}
            >
              登录
            </Button>
            <Button
              style={{
                ...(isLogin ? inactiveButtonStyle : activeButtonStyle),
                borderRadius: "0 12px 12px 0",
              }}
              onClick={() => handleRegisterButtonClick()}
            >
              注册
            </Button>
          </Flex>
          <Space size={18} style={{ marginTop: "38px" }}>
            <img src={logo} alt="logo"></img>
            <h1>Monitor</h1>
          </Space>
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </Flex>
      </Card>
    </Flex>
  );
}
export default LoginPage;
