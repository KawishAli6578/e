import Axios from "./config";

export const loginUserService = (data) =>
  Axios({
    url: `/user/login`,
    method: "POST",
    data,
  });
export const registerUserService = (data) =>
  Axios({
    url: `/user/register`,
    method: "POST",
    data,
  });
export const getUserProfileService = () =>
  Axios({
    url: `/user/me`,
    method: "GET",
  });
export const getNewTokenService = (config = {}) =>
  Axios({
    url: "/user/refresh-token",
    method: "POST",
    ...config,
    useRefresh: true,
  });
export const logoutUserService = () =>
  Axios({
    url: `/user/logout`,
    method: "post",
  });
