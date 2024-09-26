import PropTypes from "prop-types";
import { createContext, useEffect, useRef } from "react";

// project import
import config from "config";
import useLocalStorage from "../hooks/useLocalStorage";

// initial state
const initialState = {
  ...config,
  onChangeContainer: () => {},
  onChangeLocalization: () => {},
  onChangeMode: () => {},
  onChangePresetColor: () => {},
  onChangeDirection: () => {},
  onChangeMiniDrawer: () => {},
  onChangeMenuOrientation: () => {},
  onChangeFontFamily: () => {},
  onChangeCustomColors: () => {},
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);
function ConfigProvider({ children }) {
  const [config, setConfig] = useLocalStorage(
    "mantis-react-ts-config",
    initialState
  );

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      setConfig({
        ...config,
        presetColor: "theme8",
      });
      firstRender.current = false;
    }
  }, [config, setConfig]);

  const onChangeContainer = () => {
    setConfig({
      ...config,
      container: !config.container,
    });
  };

  const onChangeLocalization = (lang) => {
    setConfig({
      ...config,
      i18n: lang,
    });
  };

  const onChangeMode = (mode) => {
    setConfig({
      ...config,
      mode,
    });
  };

  const onChangePresetColor = (theme) => {
    console.log(theme,"theme-in-func")
    setConfig({
      ...config,
      presetColor: theme,
    });
  };

  const onChangeDirection = (direction) => {
    setConfig({
      ...config,
      themeDirection: direction,
    });
  };

  const onChangeMiniDrawer = (miniDrawer) => {
    setConfig({
      ...config,
      miniDrawer,
    });
  };

  const onChangeMenuOrientation = (layout) => {
    setConfig({
      ...config,
      menuOrientation: layout,
    });
  };

  const onChangeFontFamily = (fontFamily) => {
    setConfig({
      ...config,
      fontFamily,
    });
  };

  const onChangeCustomColors = (customColor) => {
    setConfig({
      ...config,
      customColor,
    });
  };

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeContainer,
        onChangeLocalization,
        onChangeMode,
        onChangePresetColor,
        onChangeDirection,
        onChangeMiniDrawer,
        onChangeMenuOrientation,
        onChangeFontFamily,
        onChangeCustomColors,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export { ConfigProvider, ConfigContext };

ConfigProvider.propTypes = { children: PropTypes.node };
