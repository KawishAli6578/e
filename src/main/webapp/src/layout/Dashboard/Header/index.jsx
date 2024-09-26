import { useMemo } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

// project import
import AppBarStyled from "./AppBarStyled";
import HeaderContent from "./HeaderContent";
import IconButton from "components/@extended/IconButton";

import useConfig from "hooks/useConfig";
import {
  MenuOrientation,
  ThemeMode,
  DRAWER_WIDTH,
  MINI_DRAWER_WIDTH,
} from "config";

// assets
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import useUIContext from "contexts/UIContext";
import { Box } from "@mui/material";

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

export default function Header() {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));
  const { mode, menuOrientation } = useConfig();

  const { menubar: menuMaster, handlerDrawerOpen } = useUIContext();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // header content
  const headerContent = useMemo(() => <HeaderContent />, []);

  const iconBackColor =
    mode === ThemeMode.DARK ? "background.default" : theme.palette.primary.main;

  // common header
  const mainHeader = (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        background: theme.palette.primary[700],
      }}
    >
      {!isHorizontal ? (
        <IconButton
          aria-label="open drawer"
          onClick={() => handlerDrawerOpen(!drawerOpen)}
          edge="start"
          color="secondary"
          variant="light"
          sx={{
            color: theme.palette.primary.contrastText,
            bgcolor: drawerOpen ? "transparent" : iconBackColor,
            ml: { xs: 0, lg: -2 },
          }}
        >
          {!drawerOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </IconButton>
      ) : null}
      <Box sx={{ display: "flex" }}>{headerContent}</Box>
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    position: "fixed",
    color: "inherit",
    elevation: 0,
    sx: {
      borderBottom: "1px solid",
      borderBottomColor: "divider",
      zIndex: 1200,
      width: isHorizontal
        ? "100%"
        : {
            xs: "100%",
            lg: drawerOpen
              ? `calc(100% - ${DRAWER_WIDTH}px)`
              : `calc(100% - ${MINI_DRAWER_WIDTH}px)`,
          },
    },
  };

  return (
    <>
      {!downLG ? (
        <AppBarStyled open={drawerOpen} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
}
