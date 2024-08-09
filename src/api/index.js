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

//展示用户自己发布的项目
export function showSelfProjects(userId) {
  const params = {
    userId,
  };
  // console.log(params);
  return service({
    url: "/user/showSelfProjects",
    method: "get",
    params,
  });
}
//展示用户拥有监控权限的项目
export function showHaveMonitorPermissionProjects(userId) {
  const params = {
    userId,
  };
  // console.log(params);
  return service({
    url: "/user/showHaveMonitorPermissionProjects",
    method: "get",
    params,
  });
}
// 查看我的申请
export function myApplicationOnMonitorProject(userId) {
  const params = {
    userId,
  };
  // console.log(params);
  return service({
    url: "/user/myApplicationOnMonitorProject",
    method: "get",
    params,
  });
}

// 普通用户主界面，查看未冻结的所有项目
export function showAllProjectForUser(page,pagesize) {
  const params = {
    page,
    pagesize,
  };
  // console.log(params);
  return service({
    url: "/project/showAllProjectForUser",
    method: "get",
    params,
  });
}
// 用户发布项目请求
export function publishProject(projectName, description, userId, projectUrl, projectPassword) {
  const data = {
    projectName,
    description,
    userId,
    projectUrl,
    projectPassword,
  };
  // console.log(data);
  return service({
    url: "/project/publishProject",
    method: "post",
    data,
  });
}
// 项目详细页面
export function detaliedInfo(projectId) {
  const params = {
    projectId,
  };
  // console.log(params);
  return service({
    url: "/project/detailedInfo",
    method: "get",
    params,
  });
}
// 用户申请项目的监测权限
export function applyMonitorPermission(userId, projectId) {
  const data = {
    userId,
     projectId
  };
  // console.log(data);
  return service({
    url: "/project/applyMonitorPermission",
    method: "post",
    data,
  });
}
// 发布者更新项目
export function updateProject(projectUrl, projectId, description, projectPassword, userId) {
  const data = {
    projectUrl, 
    projectId, 
    description,
    projectPassword,
    userId,
  };
  // console.log(data);
  return service({
    url: "/project/updateProject",
    method: "post",
    data,
  });
}
// 查询对某个项目有监测权限的用户
export function queryOwnMonitorUser(projectId) {
  const params = {
    projectId,
  };
  // console.log(params);
  return service({
    url: "/project/queryOwnMonitorUser",
    method: "get",
    params,
  });
}
// 撤销某个用户对项目的监测权限
export function cancelUserMoitorPermission(projectId, userId) {
  const data = {
    projectId,
    userId,
  };
  // console.log(data);
  return service({
    url: "/project/cancelUserMonitorPermission",
    method: "post",
    data,
  });
}
// 发布者移除项目，需要项目口令
export function deleteProject(projectId, projectPassword) {
  const data= {
    projectId,
    projectPassword,
  };
  // console.log(data);
  return service({
    url: "/project/deleteProject",
    method: "DELETE",
    data,
  });
}
// 查看用户是否有项目的监测权限
export function checkMonitorAuth(projectId, userId) {
  const data = {
    projectId,
    userId,
  };
  // console.log(data);
  return service({
    url: "/project/checkMonitorAuth",
    method: "post",
    data,
  });
}

// 关于用户发布或更新项目申请
export function myApplicationProject(userId) {
  const params = {
    userId,
  };
  // console.log(params);
  return service({
    url: "/user/myApplicationProject",
    method: "get",
    params,
  });
}

// 查看攻击服务器日志
export function queryAttackServerLog() {
  return service({
    url: "/log/queryAttackServerLog",
    method: "get",
  });
}
// 查看所有用户操作日志
export function queryAllUserOperationLog() {
  return service({
    url: "/log/queryAllUserOperationLog",
    method: "get",
  });
}
// 查看日志（页面、服务器、移动app）
export function viewLogForGroup(groupType, pagesize, page, projectId) {
  const params = {
    groupType, 
    pagesize, 
    page, 
    projectId
  };
  // console.log(params);
  return service({
    url: "/log/viewLogForGroup",
    method: "get",
    params,
  });
}
// 最近一周内的项目的访问数据和报错统计
export function projectPresentationDateOneWeek(projectId) {
  const params = {
    projectId
  };
  // console.log(params);
  return service({
    url: "/log/projectPresentationDateOneWeek",
    method: "get",
    params,
  });
}

// 查看项目操作日志（包括项目发布，更新日志）
export function viewProjectOpearteLog(projectId) {
  const params = {
    projectId
  };
  // console.log(params);
  return service({
    url: "/log/ViewProjectOpearteLog",
    method: "get",
    params,
  });
}

// 管理员查看已经通过审核的项目即已经发布的项目（发布状态冻结/正常）
export function pagedQueryPublishedPorject(projectStatus) {
  const params = {
    projectStatus
  };
  // console.log(params);
  return service({
    url: "/admin/pagedQueryPublishedPorject",
    method: "get",
    params,
  });
}
// 管理员查看项目申请情况（待审核/被拒绝）
export function pagedQueryProjectApplication(applicationStatus) {
  const params = {
    applicationStatus
  };
  // console.log(params);
  return service({
    url: "/admin/pagedQueryProjectApplication",
    method: "get",
    params,
  });
}
// 管理员对于项目发布、更新项目的审核
export function verifyApplication(applicationId, status, rejectReason) {
  const data = {
    applicationId, status, rejectReason
  };
  // console.log(data);
  return service({
    url: "/admin/verifyApplication",
    method: "post",
    data,
  });
}
// 管理员查看所有用户
export function queryAllUser() {
  
  return service({
    url: "/admin/queryAllUser",
    method: "get",
  });
}
// 管理员查看所有用户
export function showUserDetailedInfo(userId) {
  const params = {
    userId
  };
  // console.log(params);
  return service({
    url: "/admin/showUserDetailedInfo",
    method: "get",
    params,
  });
}
// 冻结用户
export function freezeUser(userId, freezeHour) {
  const data = {
    userId, 
    freezeHour
  };
  // console.log(data);
  return service({
    url: "/admin/freezeUser",
    method: "post",
    data,
  });
}
// 强制下线用户
export function forceOutlineUser(userId) {
  const data = {
    userId,
  };
  // console.log(data);
  return service({
    url: "/admin/forceOutlineUser",
    method: "post",
    data,
  });
}
// 冻结项目
export function freezeProject(projectId, freezeHour) {
  const data = {
    projectId, 
    freezeHour
  };
  // console.log(data);
  return service({
    url: "/admin/freezeProject",
    method: "post",
    data,
  });
}