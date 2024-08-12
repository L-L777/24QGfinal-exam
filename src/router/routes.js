import { lazy } from "react";
import { Navigate } from "react-router-dom";

const NotFound = lazy(() => import("../pages/NotFound/index"));
const Forbidden = lazy(() => import("../pages/Forbidden/index"));
const Servererror = lazy(() => import("../pages/Servererror/index"));
const LoginPage = lazy(() => import("../pages/login/index"));
const ProjectShow = lazy(() => import("../pages/projectShow/index"));
const Projectinformation = lazy(() => import("../pages/projectInformation"));
const Personal = lazy(() => import("../pages/personal"));
const LogDetail = lazy(() => import("../pages/logdetail"));
const PlatformLog = lazy(() => import("../pages/platformlog"));
const Admin = lazy(() => import("../pages/admin"));
const ViewAllUser = lazy(() => import("../pages/ViewAllUser"));
const routes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
  {
    path: "/403",
    element: <Forbidden />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "/500",
    element: <Servererror />,
  },
  {
    path: "/projectshow",
    element: <ProjectShow />,
  },
  {
    path: "/projectinformation",
    element: <Projectinformation />,
  },
  {
    path: "/personal",
    element: <Personal />,
  },
  {
    path: "/logDetail",
    element: <LogDetail />,
  },
  {
    path: "/platformdetail",
    element: <PlatformLog />,
  },
  {
    path: "/admin/show",
    element: <Admin />,
  },
  {
    path: "/viewalluser",
    element: <ViewAllUser />,
  },
];

export default routes;
