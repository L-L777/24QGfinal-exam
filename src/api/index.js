import service from "../utils/axios";

//登录API
export function loginAPI(data) {
  return service({
    url: "/login",
    method: "post",
    data,
  });
}

//发送验证码
export function sendVerificationCode(email) {
  // console.log(`发送验证码`);
  const data = {
    email: email,
  };
  console.log(data);
  return service({
    url: "/account/sendVerificationCode",
    method: "post",
    data,
  });
}
//注册
export function register(email, verificationCode, password) {
  const data = {
    email,
    verificationCode,
    password,
  };
  // console.log("发送注册", data);
  return service({
    url: "/account/register",
    method: "post",
    data,
  });
}
//登录
export function accountLogin(account, password, role = 1) {
  const data = {
    account,
    password,
    role,
  };
  // console.log("发送登录", data);
  return service({
    url: "/account/login",
    method: "post",
    data,
  });
}
