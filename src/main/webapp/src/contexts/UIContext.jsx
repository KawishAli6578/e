import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

// initial state
const menubarInitial = {
  isDashboardDrawerOpened: false,
  isComponentDrawerOpened: true,
};

const snackbarInitial = {
  action: false,
  open: false,
  message: "Note archived",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
  variant: "default",
  alert: {
    color: "primary",
    variant: "filled",
  },
  transition: "Fade",
  close: false,
  actionButton: false,
  maxStack: 3,
  dense: false,
  iconVariant: "usedefault",
};

const initialState = {
  menubar: menubarInitial,
  snackbar: snackbarInitial,
  handlerComponentDrawer: () => {},
  handlerDrawerOpen: () => {},
  openSnackbar: () => {},
  closeSnackbar: () => {},
  handlerIncrease: () => {},
  handlerDense: () => {},
  handlerIconVariants: () => {},
};

const UIContext = createContext(initialState);

function UIContextProvider({ children }) {
  const [menubar, setMenubar] = useState(menubarInitial);
  const [snackbar, setSnackbar] = useState(snackbarInitial);

  function handlerComponentDrawer(isComponentDrawerOpened) {
    setMenubar((prev) => ({
      ...prev,
      isComponentDrawerOpened,
    }));
  }

  function handlerDrawerOpen(isDashboardDrawerOpened) {
    setMenubar((prev) => ({
      ...prev,
      isDashboardDrawerOpened,
    }));
  }

  function openSnackbar(snackbar) {
    // to update local state based on key
    const {
      action,
      open,
      message,
      anchorOrigin,
      variant,
      alert,
      transition,
      close,
      actionButton,
    } = snackbar;

    setSnackbar((currentSnackbar) => {
      return {
        ...currentSnackbar,
        action: action || snackbarInitial.action,
        open: open || snackbarInitial.open,
        message: message || snackbarInitial.message,
        anchorOrigin: anchorOrigin || snackbarInitial.anchorOrigin,
        variant: variant || snackbarInitial.variant,
        alert: {
          color: alert?.color || snackbarInitial.alert.color,
          variant: alert?.variant || snackbarInitial.alert.variant,
        },
        transition: transition || snackbarInitial.transition,
        close: close || snackbarInitial.close,
        actionButton: actionButton || snackbarInitial.actionButton,
      };
    }, false);
  }
  function closeSnackbar() {
    // to update local state based on key
    setSnackbar((currentSnackbar) => {
      return { ...currentSnackbar, open: false };
    }, false);
  }
  function handlerIncrease(maxStack) {
    // to update local state based on key
    setSnackbar((currentSnackbar) => {
      return { ...currentSnackbar, maxStack };
    }, false);
  }
  function handlerDense(dense) {
    // to update local state based on key
    setSnackbar((currentSnackbar) => {
      return { ...currentSnackbar, dense };
    }, false);
  }
  function handlerIconVariants(iconVariant) {
    // to update local state based on key
    setSnackbar((currentSnackbar) => {
      return { ...currentSnackbar, iconVariant };
    }, false);
  }

  return (
    <UIContext.Provider
      value={{
        menubar,
        handlerComponentDrawer,
        handlerDrawerOpen,
        snackbar,
        openSnackbar,
        closeSnackbar,
        handlerIncrease,
        handlerDense,
        handlerIconVariants,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export { UIContextProvider };

UIContext.propTypes = { children: PropTypes.node };

export default function useUIContext() {
  const context = useContext(UIContext);

  if (!context) throw new Error("context must be use inside provider");

  return context;
}
