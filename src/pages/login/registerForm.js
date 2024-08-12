import { Button, Checkbox, Form, Input, message } from "antd";
import { registerAPI } from "../../api/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../utils/roleContext";
const RegisterForm = () => {
  localStorage.clear();
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("注册");
  const { setRole } = useRole();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true); // 提交时禁用按钮并显示加载状态
    setButtonText("提交中..."); // 设置按钮文本为“提交中...”
    const { username, password } = values;
    const data = { username, password };
    try {
      const res = await registerAPI(data);
      if (res.code === 0) {
        message.error(res.msg);
      } else {
        message.success(res.msg);
        setRole({ role: "用户", username: values.username });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        navigate("/projectshow");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // 提交完成后恢复按钮状态
      setButtonText("注册"); // 恢复按钮文本为“注册”
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        marginTop: 16,
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
          style={{ width: 450, height: 45, fontSize: 16, borderRadius: 12 }}
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
          style={{ width: 450, height: 45, fontSize: 16, borderRadius: 12 }}
          autoComplete="current-password"
        />
      </Form.Item>
      <Form.Item
        label={<span style={{ fontSize: "16px" }}>确认密码</span>} // 使用内联样式
        name="password2"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "请再次输入你的密码",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次密码不一致!"));
            },
          }),
        ]}
      >
        <Input.Password
          style={{ width: 450, height: 45, fontSize: 16, borderRadius: 12 }}
          autoComplete="new-password"
        />
      </Form.Item>
      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          span: 24,
        }}
      >
        <Checkbox required style={{ textAlign: "left" }}>
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
          loading={loading} // 根据 loading 状态禁用按钮并显示加载动画
        >
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegisterForm;
