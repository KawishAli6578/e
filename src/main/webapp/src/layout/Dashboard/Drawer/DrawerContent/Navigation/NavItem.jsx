import PropTypes from "prop-types";
import { Link, useLocation, matchPath } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

// project import
import Dot from "components/@extended/Dot";
import IconButton from "components/@extended/IconButton";

import { MenuOrientation, ThemeMode, NavActionType } from "config";
import useConfig from "hooks/useConfig";

import { Fragment } from "react";
import useUIContext from "contexts/UIContext";

export default function NavItem({ item, level, isParents = false }) {
  const theme = useTheme();
  const { menubar: menuMaster, handlerDrawerOpen } = useUIContext();

  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const downLG = useMediaQuery(theme.breakpoints.down("lg"));

  const { mode, menuOrientation } = useConfig();
  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  const Icon = item.icon;
  const itemIcon = item.icon ? (
    <Icon
      style={{
        color:
          mode === ThemeMode.DARK && drawerOpen
            ? "text.primary"
            : theme.palette.primary.contrastText,
        fontSize: drawerOpen ? "1rem" : "1.25rem",
        ...(menuOrientation === MenuOrientation.HORIZONTAL &&
          isParents && { fontSize: 20, stroke: "1.5" }),
      }}
    />
  ) : (
    false
  );

  const { pathname } = useLocation();
  const isSelected = !!matchPath(
    { path: item?.link ? item.link : item.url, end: false },
    pathname
  );

  const textColor =
    mode === ThemeMode.DARK ? "grey.400" : theme.palette.primary.contrastText;
  const iconSelectedColor =
    mode === ThemeMode.DARK && drawerOpen
      ? "text.primary"
      : theme.palette.primary.contrastText;

  // const shouldDisplay = Array.isArray(item.display) ? item.display.some((r) => user.roles.includes(r)) : item.display;
  const shouldDisplay = true;

  if (!shouldDisplay) {
    return <Fragment key={item.id}></Fragment>;
  }

  return (
    <>
      {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
        <Box sx={{ position: "relative" }}>
          <ListItemButton
            component={Link}
            to={item.url}
            target={itemTarget}
            disabled={item.disabled}
            selected={isSelected}
            sx={{
              zIndex: 1201,

              pl: drawerOpen ? `${level * 28}px` : 1.5,
              py: !drawerOpen && level === 1 ? 1.25 : 1,
              ...(drawerOpen && {
                "&:hover": {
                  bgcolor:
                    mode === ThemeMode.DARK
                      ? "divider"
                      : theme.palette.primary[800],
                },
                "&.Mui-selected": {
                  bgcolor:
                    mode === ThemeMode.DARK
                      ? "divider"
                      : theme.palette.primary[800],
                  borderRight: "2px solid",
                  borderColor: theme.palette.primary.light,
                  color: iconSelectedColor,
                  "&:hover": {
                    color: iconSelectedColor,
                    bgcolor:
                      mode === ThemeMode.DARK
                        ? "divider"
                        : theme.palette.primary[800],
                  },
                },
              }),
              ...(!drawerOpen && {
                "&:hover": { bgcolor: theme.palette.primary[800] },
                "&.Mui-selected": {
                  "&:hover": { bgcolor: "transparent" },
                  bgcolor: "transparent",
                },
              }),
            }}
            {...(downLG && {
              onClick: () => handlerDrawerOpen(false),
            })}
          >
            {itemIcon && (
              <ListItemIcon
                sx={{
                  minWidth: 28,
                  color: isSelected ? iconSelectedColor : textColor,
                  ...(!drawerOpen && {
                    borderRadius: 1.5,
                    width: 36,
                    height: 36,
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      bgcolor:
                        mode === ThemeMode.DARK
                          ? "secondary.light"
                          : theme.palette.primary[800],
                    },
                  }),
                  ...(!drawerOpen &&
                    isSelected && {
                      bgcolor:
                        mode === ThemeMode.DARK
                          ? "primary.900"
                          : theme.palette.primary[800],
                      "&:hover": {
                        bgcolor:
                          mode === ThemeMode.DARK
                            ? "primary.darker"
                            : theme.palette.primary[800],
                      },
                    }),
                }}
              >
                {itemIcon}
              </ListItemIcon>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && (
              <ListItemText
                primary={
                  <Typography
                    variant="h6"
                    sx={{ color: isSelected ? iconSelectedColor : textColor }}
                  >
                    {item.title}
                  </Typography>
                }
              />
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
              <Chip
                color={item.chip.color}
                variant={item.chip.variant}
                size={item.chip.size}
                label={item.chip.label}
                avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
              />
            )}
          </ListItemButton>
          {(drawerOpen || (!drawerOpen && level !== 1)) &&
            item?.actions &&
            item?.actions.map((action, index) => {
              const ActionIcon = action.icon;
              const callAction = action?.function;
              return (
                <IconButton
                  key={index}
                  {...(action.type === NavActionType.FUNCTION && {
                    onClick: (event) => {
                      event.stopPropagation();
                      callAction();
                    },
                  })}
                  {...(action.type === NavActionType.LINK && {
                    component: Link,
                    to: action.url,
                    target: action.target ? "_blank" : "_self",
                  })}
                  color="secondary"
                  variant="outlined"
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 20,
                    zIndex: 1202,
                    width: 20,
                    height: 20,
                    mr: -1,
                    ml: 1,
                    color: "secondary.dark",
                    borderColor: isSelected
                      ? "primary.light"
                      : "secondary.light",
                    "&:hover": {
                      borderColor: isSelected
                        ? "primary.main"
                        : "secondary.main",
                    },
                  }}
                >
                  <ActionIcon style={{ fontSize: "0.625rem" }} />
                </IconButton>
              );
            })}
        </Box>
      ) : (
        <ListItemButton
          component={Link}
          to={item.url}
          target={itemTarget}
          disabled={item.disabled}
          selected={isSelected}
          sx={{
            zIndex: 1201,
            "&:hover": { bgcolor: "transparent" },
            ...(isParents && { p: 1, mr: 1 }),
            "&.Mui-selected": {
              bgcolor: "transparent",
              "&:hover": { bgcolor: "transparent" },
            },
          }}
        >
          {itemIcon && (
            <ListItemIcon
              sx={{
                minWidth: 28,
                ...(!drawerOpen && {
                  borderRadius: 1.5,
                  width: 28,
                  height: 28,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  "&:hover": { bgcolor: "transparent" },
                }),
                ...(!drawerOpen &&
                  isSelected && {
                    bgcolor: "transparent",
                    "&:hover": { bgcolor: "transparent" },
                  }),
              }}
            >
              {itemIcon}
            </ListItemIcon>
          )}

          {!itemIcon && (
            <ListItemIcon
              sx={{
                color: isSelected ? "primary.main" : "secondary.dark",
                ...(!drawerOpen && {
                  borderRadius: 1.5,
                  alignItems: "center",
                  justifyContent: "flex-start",
                  "&:hover": { bgcolor: "transparent" },
                }),
                ...(!drawerOpen &&
                  isSelected && {
                    bgcolor: "transparent",
                    "&:hover": { bgcolor: "transparent" },
                  }),
              }}
            >
              <Dot size={4} color={isSelected ? "primary" : "secondary"} />
            </ListItemIcon>
          )}
          <ListItemText
            primary={
              <Typography
                variant="h6"
                color={isSelected ? "primary.main" : "secondary.dark"}
              >
                {item.title}
              </Typography>
            }
          />
          {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      )}
    </>
  );
}

NavItem.propTypes = {
  item: PropTypes.any,
  level: PropTypes.number,
  isParents: PropTypes.bool,
};
