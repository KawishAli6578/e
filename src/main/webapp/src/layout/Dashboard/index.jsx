import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

// project import
import Drawer from "./Drawer";
import Header from "./Header";
import Footer from "./Footer";
import HorizontalBar from "./Drawer/HorizontalBar";
// import Breadcrumbs from 'components/@extended/Breadcrumbs';

import { MenuOrientation } from "config";
import useConfig from "hooks/useConfig";
import useUIContext from "contexts/UIContext";
import { useTheme } from "@mui/system";

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout() {
  const theme = useTheme();
  const downXL = useMediaQuery((theme) => theme.breakpoints.down("xl"));
  const downLG = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { handlerDrawerOpen } = useUIContext();
  console.log(theme, "theme1");
  const { container, miniDrawer, menuOrientation } = useConfig();

  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      handlerDrawerOpen(!downXL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downXL]);

  return (
    <>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Header />
        {!isHorizontal ? <Drawer /> : <HorizontalBar />}

        <Box
          component="main"
          sx={{
            width: "calc(100% - 260px)",
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            backgroundColor: theme.palette.primary.Background,
          }}
        >
          <Toolbar sx={{ mt: isHorizontal ? 8 : "inherit" }} />
          <Container
            maxWidth={container ? "xl" : false}
            sx={{
              ...(container && { px: { xs: 0, sm: 2 } }),
              position: "relative",
              minHeight: "calc(100vh - 110px)",
              display: "flex",
              flexDirection: "column",
              px: "0 !important",
            }}
          >
            {/* <Breadcrumbs /> */}
            <Outlet />
            <Footer />
          </Container>
        </Box>
      </Box>
    </>
  );
}
