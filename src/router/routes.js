import { lazy } from "react";

import { Navigate } from "react-router-dom";


const routes = [

   
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default routes;
