import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

// project imports
// import useAuth from "contexts/AuthContext";
import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "./AuthRoutes";
import BackdropLoader from "components/BackdropLoader";
import useAuth from "contexts/AuthContext";

export default function MainRouter() {
  const { isLoggedIn } = useAuth();
console.log(isLoggedIn,"isLoggedIn")
  // if (loading) {
  //   return <BackdropLoader />; // You can replace this with a spinner or any loading component
  // }

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/*" element={<PrivateRoutes />} />
          <Route index element={<Navigate to="/dashboard" />} />
        </>
      ) : (
        <>
          <Route path="/*" element={<AuthRoutes />} />
          <Route index element={<Navigate to="/login" />} />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
