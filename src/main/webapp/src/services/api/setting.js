import Axios from "./config";

export const getAllStorePlatform = () =>
  Axios({
    url: `/store/platform/all`,
    method: "GET",
  });
export const getAllStorePlatformById = (id) =>
  Axios({
    url: `/store/platform/${id}`,
    method: "GET",
  });

export const createAmazonStore = (data) =>
  Axios({
    url: `/amazon/store/create`,
    method: "POST",
    data,
  });

export const createEbayStore = (data) =>
  Axios({
    url: `/ebay/store/create`,
    method: "POST",
    data,
  });
export const createWalmartStore = (data) =>
  Axios({
    url: `/walmart/store/create`,
    method: "POST",
    data,
  });
export const createEtsyStore = (data) =>
  Axios({
    url: `/etsy/store/create`,
    method: "POST",
    data,
  });
export const getAllStores = (id) =>
  Axios({
    url: `/store/all/${id}`,
    method: "GET",
  });
