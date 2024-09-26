// third-party

// project import

// assets
import DashboardOutlined from "@ant-design/icons/DashboardOutlined";
import GoldOutlined from "@ant-design/icons/GoldOutlined";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import { USER_ROLES } from "constants/general.constants";
import {
  BranchesOutlined,
  DollarOutlined,
  FileOutlined,
  LogoutOutlined,
  ProfileOutlined,
  RiseOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  TruckOutlined,
} from "@ant-design/icons";

// type

const icons = {
  dashboard: DashboardOutlined,
  franchise: GoldOutlined,
  loading: LoadingOutlined,
  admin: UserOutlined,
  setting: SettingOutlined,
  support: SolutionOutlined,
  shipping: TruckOutlined,
  tracking: BranchesOutlined,
  edi: FileOutlined,
  accounting: ProfileOutlined,
  reports: RiseOutlined,
  userAdmin: DollarOutlined,
  eCommerce: ShoppingCartOutlined,
  logout: LogoutOutlined,
};

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    {
      id: "group-dashboard",
      type: "group",
      icon: icons.dashboard,
      display: true,
      children: [
        // dashboard
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/dashboard",
          icon: icons.dashboard,
          display: true,
          breadcrumbs: false,
        },

        {
          id: "settings",
          title: "Settings",
          type: "collapse",
          icon: icons.eCommerce,
          display: true,
          children: [
            // {
            //   id: "stores",
            //   title: "Stores",
            //   type: "item",
            //   url: "/settings/stores",
            //   display: true,
            //   breadcrumbs: false,
            // },
            {
              id: "add-marketplace",
              title: "Add Marketplace",
              type: "item",
              url: "/settings/add-marketplace",
              display: true,
              breadcrumbs: false,
            },
            {
              id: "profile",
              title: "Profile",
              type: "item",
              url: "/settings/profile",
              display: true,
              breadcrumbs: false,
            },
            {
              id: "controls",
              title: "Controls",
              type: "item",
              url: "/settings/controls",
              display: true,
              breadcrumbs: false,
            },
            {
              id: "alerts",
              title: "Alerts",
              type: "item",
              url: "/settings/alerts",
              display: [],
              breadcrumbs: false,
            },
          ],
        },

        {
          id: "logout",
          title: "logout",
          type: "item",
          url: "/logout",
          icon: icons.logout,
          display: true,
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default menuItems;
