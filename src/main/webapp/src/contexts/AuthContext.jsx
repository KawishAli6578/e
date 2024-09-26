import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import {
  AUTH_FAIL,
  AUTH_LOGIN_END,
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_PROFILE_FETCH_SUCCESS,
  AUTH_PROFILE_LOADING_END,
  AUTH_PROFILE_LOADING_START,
} from "contexts/auth-reducer/actions";
import authReducer, { initialState } from "contexts/auth-reducer/auth";
import { LOCAL_STORAGE_CONSTANTS } from "constants/general.constants";

import BackdropLoader from "components/BackdropLoader";
import useLocalStorage from "hooks/useLocalStorage";
import {
  loginUserService,
  getUserProfileService,
  registerUserService,
  logoutUserService,
} from "services/api/auth";
import Toast from "components/Toast";

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const initialContext = {
  ...initialState,
  login: () => {},
  logout: () => {},
  register: () => {},
};

const AuthContext = createContext(initialContext);

export const AuthProvider = ({ children }) => {
  const [value] = useLocalStorage(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN, null);
  const localStorageAuthToken = value;
  console.log(value, "value");
  const [state, dispatch] = useReducer(authReducer, initialState);
  // const reduxDispatch = useDispatch();

  const clearAuthState = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN);
    dispatch({
      type: AUTH_FAIL,
    });
    // reduxDispatch({ type: "RESET_STORE" });
  }, []);

  const updateUserState = (user) => {
    console.log(user, "userInfo");
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({
      type: AUTH_PROFILE_FETCH_SUCCESS,
      payload: user,
    });
  };

  const init = useCallback(async () => {
    try {
      const serviceToken = window.localStorage.getItem(
        LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN
      );
      if (serviceToken) {
        dispatch({
          type: AUTH_PROFILE_LOADING_START,
        });
        const { data } = await getUserProfileService();

        const user = data.user;

        if (user) {
          updateUserState(user);
          return user;
        }
      } else {
        clearAuthState();
      }
    } catch (err) {
      clearAuthState();
    } finally {
      dispatch({
        type: AUTH_PROFILE_LOADING_END,
      });
    }
  }, [clearAuthState]);
  useEffect(() => {
    if (localStorageAuthToken) {
      const isLocalUser = JSON.parse(localStorage.getItem("user"));
      if (!isLocalUser) {
        init();
      }
    }
  }, [init, localStorageAuthToken]);

  const login = async (payload) => {
    try {
      dispatch({
        type: AUTH_LOGIN_START,
      });

      const { data } = await loginUserService(payload);

      const token = data?.token;

      if (token) {
        console.log(data?.message);
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          payload: token,
        });
        localStorage.setItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN, token);
        data?.message &&Toast.success(data?.message);

        setTimeout(() => {
          init(); // Call init function after 1 second delay
        }, 1000);
      }
      return true;
    } catch (error) {
      // console.log(error.response.data.message, "error");
      Toast.error(error.response.data.message);
      dispatch({
        type: AUTH_FAIL,
      });
      throw error;
    } finally {
      dispatch({
        type: AUTH_LOGIN_END,
      });
    }
  };

  const register = async (payload) => {
    try {
      const { data } = await registerUserService(payload);
      const token = data?.token;

      if (token) {
        Toast.success(data?.message);
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          payload: token,
        });
        localStorage.setItem(LOCAL_STORAGE_CONSTANTS.AUTH_TOKEN, token);

        init();
      }
      return true;
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
      });
      throw error;
    } finally {
      dispatch({
        type: AUTH_LOGIN_END,
      });
    }
  };

  const logout = async () => {
    // try {
    //   dispatch({
    //     type: AUTH_PROFILE_LOADING_START,
    //   });
    //   await logoutUserService();
    //   clearAuthState();
    //   return true;
    // } catch (error) {
    //   dispatch({
    //     type: AUTH_FAIL,
    //   });
    //   throw error;
    // } finally {
    //   clearAuthState();
    //   dispatch({
    //     type: AUTH_PROFILE_LOADING_END,
    //   });
    // }
    localStorage.clear();
    clearAuthState();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {state?.isLoadingProfile ? <BackdropLoader /> : children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("context must be use inside provider");

  return context;
}
