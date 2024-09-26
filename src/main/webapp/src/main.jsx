import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider } from "contexts/ConfigContext.jsx";
// import { Provider } from "react-redux";
// import store from './store';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider>
      {/* <Provider> */}
        <App />
      {/* </Provider> */}
    </ConfigProvider>
  </StrictMode>
);
