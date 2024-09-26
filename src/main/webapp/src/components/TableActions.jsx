import { useRef, useState } from "react";
import PropTypes from "prop-types";

import { useTheme } from "@mui/material/styles";
import { MoreOutlined } from "@ant-design/icons";
import {
  Box,
  ClickAwayListener,
  Paper,
  Popper,
  Tooltip,
  useMediaQuery,
} from "@mui/material";

import IconButton from "./@extended/IconButton";
import Transitions from "./@extended/Transitions";

export default function TableActions({
  children,
  paperSx = {},
  icon = <MoreOutlined />,
  title = "Actions",
}) {
  const theme = useTheme();
  const anchorRef = useRef(null);
  const iconBackColorOpen = "grey.100";
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      display="inline-block"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Tooltip title={title}>
        <IconButton
          color="secondary"
          variant="light"
          sx={{
            color: "text.primary",
            bgcolor: open ? iconBackColorOpen : "transparent",
          }}
          aria-label="open table action"
          ref={anchorRef}
          aria-controls={open ? "table-action-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {icon}
        </IconButton>
      </Tooltip>
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        popperOptions={{
          modifiers: [
            { name: "offset", options: { offset: [matchesXs ? -5 : 0, 9] } },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            type="grow"
            position={matchesXs ? "top" : "top-right"}
            in={open}
            {...TransitionProps}
          >
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: "100%",
                ...paperSx,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box>{children}</Box>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}
TableActions.propTypes = {
  children: PropTypes.node,
  paperSx: PropTypes.object,
  icon: PropTypes.node,
  title: PropTypes.string,
};
