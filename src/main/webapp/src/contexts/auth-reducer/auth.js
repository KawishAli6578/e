// action - state management
import {
  AUTH_LOGIN_START,
  AUTH_LOGIN_END,
  AUTH_PROFILE_LOADING_START,
  AUTH_PROFILE_LOADING_END,
  AUTH_LOGIN_SUCCESS,
  AUTH_PROFILE_FETCH_SUCCESS,
  AUTH_FAIL,
  AUTH_AVATAR_UPDATE,
} from "./actions";

// initial state
const isLocalUser = JSON?.parse(localStorage.getItem("user"));
export const initialState = {
  isLoggedIn: isLocalUser ? true : false,
  user: isLocalUser ? isLocalUser : null,
  isLoggingIn: false,
  isLoadingProfile: false,
};

// ==============================|| AUTH REDUCER ||============================== //

const auth = (state = initialState, action) => {
  console.log(state, "state");
  console.log(action, "action");

  switch (action.type) {
    case AUTH_LOGIN_START:
      return { ...state, isLoggingIn: true };
    case AUTH_LOGIN_END:
      return { ...state, isLoggingIn: false };
    case AUTH_PROFILE_LOADING_START:
      return { ...state, isLoadingProfile: true };
    case AUTH_PROFILE_LOADING_END:
      return { ...state, isLoadingProfile: false };
    case AUTH_LOGIN_SUCCESS:
      return { ...state, authToken: action.payload };
    case AUTH_PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        userPermissions: action.payload?.featuresPermission,
        isLoggedIn: true,
      };
    case AUTH_AVATAR_UPDATE:
      return { ...state, avatar: action.payload };
    case AUTH_FAIL:
      return { ...initialState };
    default: {
      return { ...state };
    }
  }
};

export default auth;
