import { lazy } from "react";
import { Navigate } from "react-router-dom";

const NotFound = lazy(() => import("../pages/NotFound/index"));
const Forbidden = lazy(() => import("../pages/Forbidden/index"));
const Servererror = lazy(() => import("../pages/Servererror/index"));
const LoginPage = lazy(() => import("../pages/login/index"));
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
];

export default routes;
