import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { lazy } from "react";

import Loadable from "components/Loadable";
import AuthLayout from "layout/Auth";
const AuthLogin = Loadable(lazy(() => import("pages/auth/login")));
const AuthRegister = Loadable(lazy(() => import("pages/auth/register")));

export default function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
      </Route>
      <Route path="*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
}
