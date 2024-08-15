import { createContext, useContext, useState } from "react";

//创建一个Context
const RoleContext = createContext();
// 判断是否为发布者
const ReleaseContext = createContext();
//创建一个Provider组件
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState({ role: "用户", username: "Adam" });
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

//创建一个自定义hook
export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};

//全局状态管理
//用于管理用户角色和用户名
//在组件中使用useRole()来获取role和setRole
//如有需要可以根据这个来进行前端的权限管理  重定向等操作
//目前只用来渲染导航栏上的数据

export const ReleaseProvider = ({ children }) => {
  const [release, setRelease] = useState(0);
  return (
    <ReleaseContext.Provider value={{ release, setRelease }}>
      {children}
    </ReleaseContext.Provider>
  );
};
export const useRelease = () => {
  const context = useContext(ReleaseContext);
  if (context === undefined) {
    throw new Error("useRelease must be used within a ReleaseProvider");
  }
  return context;
};
