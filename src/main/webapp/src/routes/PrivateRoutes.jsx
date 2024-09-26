import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import Loadable from "components/Loadable";

// layout
import DashboardLayout from "layout/Dashboard";
// Dashboard
import LogoutPage from "pages/logout";

const Dashboard = Loadable(lazy(() => import("pages/dashboard/index")));

//MarketPlace
const AddMarketPlace = Loadable(lazy(() => import("pages/marketplace/index")));

//Stores
const Stores = Loadable(lazy(() => import("pages/stores/index")));

export default function PrivateRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* dashboard */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="settings/add-marketplace" element={<AddMarketPlace />} />
        <Route path="settings/stores" element={<Stores />} />
      </Route>

      <Route path="logout" element={<LogoutPage />} />
      <Route path="*" element={<Navigate to={"/dashboard"} />} />
    </Routes>
  );
}
