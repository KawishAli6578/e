import axios from "axios";

import { LOCAL_STORAGE_CONSTANTS } from "constants/general.constants";
import { getNewTokenService } from "./auth";
import Toast from "components/Toast";
import { useEffect } from "react";
// import useAuth from "contexts/AuthContext";

// TODO:: For Refresh token
let isRefreshing = false;
let refreshSubscribers = [];

const Axios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "/",
  // withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "Allow-Access-Control-Allow-Origin": "*",
    "ngrok-skip-browser-warning": true,
  },
});

const requestHandler = (config) => {
  if (!window.navigator.onLine) {
    Promise.reject("Network Error.");
  }

  let token = localStorage.getItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN);
  let refreshToken = localStorage.getItem(
    LOCAL_STORAGE_CONSTANTS.REFRESH_TOKEN
  );

  if (!config.headers.Authorization) {
    config.headers.Authorization = token ? `${token}` : null;
  }
  if (config.useRefresh) {
    config.headers.Authorization = refreshToken ? `${refreshToken}` : null;
  }
  if (config.isFormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }

  delete config.useRefresh;
  delete config.isFormData;
  return Promise.resolve(config);
};

//request interceptor
Axios.interceptors.request.use(
  async (config) => {
    return requestHandler(config);
  },
  (error) => Promise.reject(error)
);

export default Axios;

function processQueue(error, token = null) {
  refreshSubscribers.forEach((callback) => {
    if (error) {
      callback(null);
    } else {
      callback(token);
    }
  });
}

async function getNewToken() {
  const { data } = await getNewTokenService();

  const token = data.data?.token;

  if (token) {
    localStorage.setItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN, token);
    localStorage.setItem(
      LOCAL_STORAGE_CONSTANTS.REFRESH_TOKEN,
      data.data?.refreshToken
    );
  } else {
    throw new Error("Session timed out.");
  }
  return token;
}

export const AxiosInterceptorsProvider = ({ children }) => {
  // const { logout } = useAuth();
  const logout = () => {};

  useEffect(() => {
    const errorHandler = async (error) => {
      let errorMessage = "";

      if (error.code === "ERR_CANCELED") {
        errorMessage = "Request Canceled.";
        return Promise.reject({ errorMessage, ...error });
      }

      if (!error.response) {
        errorMessage = error.message || "Network error - something went wrong";
        Toast.error(
          errorMessage || "Network error - something went wrong",
          "apiError"
        );
      }

      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.errorMessage === "Session expired"
      ) {
        if (!isRefreshing) {
          // execute on first request
          isRefreshing = true;
          try {
            const jwtToken = await getNewToken();
            originalRequest.headers["Authorization"] = `${jwtToken}`;
            processQueue(null, jwtToken);

            return Axios(originalRequest);
          } catch (err) {
            processQueue(err, null);
            // return Promise.reject(error);
          } finally {
            isRefreshing = false;
            refreshSubscribers = [];
          }
        } else {
          return new Promise((resolve) => {
            refreshSubscribers.push((token) => {
              originalRequest.headers["Authorization"] = `${token}`;
              resolve(Axios(originalRequest));
            });
          });
        }
      }

      if (error.response && error.response.data) {
        let errorResponse = error.response.data;
        errorMessage =
          typeof errorResponse.errorMessage === "string"
            ? errorResponse.errorMessage
            : "Something went wrong";
        if (errorResponse.errorMessage) {
          Toast.error(
            errorResponse.errorMessage || "Something went wrong",
            "apiError"
          );
        }

        if (
          ["UNAUTHORIZED"].includes(error.response.data.status) ||
          error.response.status === 403
        ) {
          // todo: logout and clear state
          logout();
        }
      }
      return Promise.reject({ errorMessage, ...error });
    };

    const responseHandler = (response) => {
      return Promise.resolve(response);
    };

    //response interceptor
    const responseInterceptor = Axios.interceptors.response.use(
      (response) => responseHandler(response),
      (error) => errorHandler(error)
    );

    return () => {
      Axios.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  return children;
};
