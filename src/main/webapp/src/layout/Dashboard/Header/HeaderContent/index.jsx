import { useMemo } from "react";

import useMediaQuery from "@mui/material/useMediaQuery";

// project import
// import Search from './Search';
// import Message from './Message';
import Notification from "./Notification";
import Customization from "./Customization";
// import MobileSection from './MobileSection';
// import MegaMenuSection from './MegaMenuSection';

import useConfig from "hooks/useConfig";
import { MenuOrientation } from "config";
import DrawerHeader from "layout/Dashboard/Drawer/DrawerHeader";

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const { menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && (
        <DrawerHeader open={true} />
      )}
      <Notification />
      {/* {String(import.meta.env.VITE_APP_APP_MODE).toLowerCase() !==
        "production" && <Customization />} */}
    </>
  );
}
