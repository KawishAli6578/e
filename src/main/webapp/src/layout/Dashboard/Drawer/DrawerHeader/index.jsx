import PropTypes from "prop-types";
// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// project import
import DrawerHeaderStyled from "./DrawerHeaderStyled";
import Logo from "components/logo";

import useConfig from "hooks/useConfig";
import { MenuOrientation } from "config";

// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }) {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  const { menuOrientation } = useConfig();
  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downLG;
  console.log(theme, "theme");
  return (
    <DrawerHeaderStyled
      theme={theme}
      open={open}
      sx={{
        backgroundColor: theme.palette.primary[700],

        minHeight: isHorizontal ? "unset" : "60px",
        width: isHorizontal ? { xs: "100%", lg: "424px" } : "inherit",
        paddingTop: isHorizontal ? { xs: "10px", lg: "0" } : "8px",
        paddingBottom: isHorizontal ? { xs: "18px", lg: "0" } : "8px",
        // paddingLeft: isHorizontal ? { xs: '24px', lg: '0' } : open ? '24px' : 0,
        outline: `1px solid ${theme.palette.primary[700]}`,
        justifyContent: "center",
        paddingLeft: 0,
      }}
    >
      <Logo isIcon={!open} sx={{ width: open ? "auto" : 35, height: 35 }} />
    </DrawerHeaderStyled>
  );
}

DrawerHeader.propTypes = { open: PropTypes.bool };
