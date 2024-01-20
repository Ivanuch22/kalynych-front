import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("access");

  return token ? <Outlet /> : <Navigate to={"/auth"} />;
};

export default PrivateRoutes;
