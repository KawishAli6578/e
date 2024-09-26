// import "./App.css";
import ThemeCustomization from "./themes";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "routes";
import ContextProvider from "contexts";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <ThemeCustomization>
          <ToastContainer/>
          <Toaster />
          <MainRouter />
        </ThemeCustomization>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
