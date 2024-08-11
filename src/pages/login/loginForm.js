import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import { loginAPI } from "../../api/index";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("登录");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Success:", values);
    setLoading(true);
    setButtonText("登录中...");
    try {
      const res = await loginAPI(values);
      if (res.code === 0) {
        message.error(res.msg);
      } else {
        message.success(res.msg);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        navigate("/500");
      }
    } catch (error) {
    } finally {
      setLoading(false);
      setButtonText("登录");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      console.log(password);
      const res = await loginAPI({ password, username: "admin" });
      if (res.code === 0) {
        message.error(res.msg);
      } else {
        message.success(res.msg);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        navigate("/500");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <Form
      layout="vertical"
      name="basic"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        width: 450,
        height: 460,
        margin: "0 auto",
        marginTop: 30,
        fontSize: 15,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label={<span style={{ fontSize: "16px" }}>用户名</span>} // 使用内联样式
        name="username"
        rules={[
          {
            required: true,
            message: "请输入你的用户名",
          },
          {
            pattern: /^[a-zA-Z0-9]*$/,
            message: "用户名只可以是数字和字母",
          },
        ]}
      >
        <Input
          style={{ width: 450, height: 53, fontSize: 16, borderRadius: 12 }}
          autoComplete="username"
        />
      </Form.Item>

      <Form.Item
        label={<span style={{ fontSize: "16px" }}>密码</span>} // 使用内联样式
        name="password"
        rules={[
          {
            required: true,
            message: "请输入你的密码",
          },
        ]}
      >
        <Input.Password
          style={{ width: 450, height: 53, fontSize: 16, borderRadius: 12 }}
          autoComplete="current-password"
        />
      </Form.Item>

      <Form.Item
        valuePropName="checked"
        wrapperCol={{
          span: 24,
        }}
      >
        <Checkbox required defaultChecked={true} style={{ textAlign: "left" }}>
          已同意
          <a
            href="https://github.com/Adamlmh/QG-TRAINING-CAMP"
            style={{ color: "blue" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            《服务条款》
          </a>
          与
          <a
            href="https://github.com/Adamlmh/QG-TRAINING-CAMP"
            style={{ color: "blue" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            《隐私政策》
          </a>
        </Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 24,
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: 450, height: 64, borderRadius: 40, fontSize: 20 }}
          loading={loading}
        >
          {buttonText}
        </Button>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 9,
        }}
      >
        <Button type="dashed" onClick={showModal} style={{ marginTop: "25px" }}>
          管理员登录
        </Button>
        <Modal
          title="请输入管理员口令"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText={"确认"}
          cancelText={"取消"}
        >
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="请输入管理员口令"
          />
        </Modal>
      </Form.Item>
    </Form>
  );
};
export default LoginForm;
