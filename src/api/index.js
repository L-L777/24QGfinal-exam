import service from "../utils/axios";

//登录API
export function loginAPI(data) {
  const formData = new FormData();
  // 将 data 对象的每个属性添加到 formData 对象中
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  return service({
    url: "/login",
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data", // 设置请求头
    },
  });
}
//注册API
export function registerAPI(data) {
  return service({
    url: "/user/register",
    method: "post",
    data,
  });
}
