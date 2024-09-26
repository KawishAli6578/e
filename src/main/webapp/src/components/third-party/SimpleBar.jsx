import PropTypes from "prop-types";

// material-ui
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

// third-party
import SimpleBar from "simplebar-react";
import { BrowserView, MobileView } from "react-device-detect";

// project-import
import { ThemeMode } from "config";

// root style
const RootStyle = styled(BrowserView)(({ theme }) => ({
  flexGrow: 1,
  height: "100%",
  overflow: "hidden",
  background: theme.palette.primary.gradient,
}));

// scroll bar wrapper
const SimpleBarStyle = styled(SimpleBar)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      background: alpha(
        theme.palette.grey[theme.palette.mode === ThemeMode.DARK ? 200 : 500],
        0.48
      ),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
}));

// ==============================|| SIMPLE SCROLL BAR ||============================== //

export default function SimpleBarScroll({ children, sx, ...other }) {
  return (
    <>
      <RootStyle>
        <SimpleBarStyle clickOnTrack={false} sx={sx} {...other}>
          {children}
        </SimpleBarStyle>
      </RootStyle>
      <MobileView>
        <Box sx={{ overflowX: "auto", ...sx }} {...other}>
          {children}
        </Box>
      </MobileView>
    </>
  );
}

SimpleBarScroll.propTypes = {
  children: PropTypes.any,
  sx: PropTypes.any,
  other: PropTypes.any,
};