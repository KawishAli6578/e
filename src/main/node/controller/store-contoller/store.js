const axios = require("axios");
const StoreModal = require("../../model/store-modal/store");
const { errorHandleMessage } = require("../../utils/errorHandler");
const { getEbayAuthToken } = require("../ecom-controller/eBay");
const { getWalmartAccessToken } = require("../ecom-controller/walmart");

// Function to exchange authorization code for access token
const clientId =
  "amzn1.application-oa2-client.264d443e011b408c88cf1d4946ae073d"; // Your app's client ID
const clientSecret =
  "amzn1.oa2-cs.v1.1beae16888e56cd8654a0ae320676e20cf887b51b06e1fb4fd9556bc383907a1"; // Your app's client secret
const redirectUri =
  "https://8af6-124-29-212-38.ngrok-free.app/settings/add-marketplace"; // Your app's redirect URI
const tokenEndpoint = "https://api.amazon.com/auth/o2/token";
exports.createAmazonStore = async (req, res) => {
  console.log(req.body);
  const authorizationCode = req.body.authorizationCode;
  const sellerPartnerId = req.body.sellerPartnerId;
  const storeName = req.body.storeName;
  const userId = req.body.userId;

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", authorizationCode); // The authorization code you received from Amazon
  params.append("redirect_uri", redirectUri);
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);

  try {
    const response = await axios.post(tokenEndpoint, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token, refresh_token, expires_in } = response.data;
    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);
    console.log("Expires In:", expires_in);
    const storeCreated = await StoreModal.create({
      accessToken: access_token,
      refreshToken: refresh_token,
      sellerPartnerId: sellerPartnerId,
      storeName: storeName,
      accessTokenExpire: expires_in,
      platformName: "Amazon US",
      logo: "/media/stores/amazonus.png",
    });
    res.status(200).json({
      successMessage: "Store Created Successfully",
      errorMessage: null,
      store: storeCreated,
    });
  } catch (error) {
    const message = errorHandleMessage(error, "AMZ STORE CREATION");

    res.status(405).json({
      successMessage: null,
      errorMessage: message,
    });
  }
};

const ebay_REDIRECT_URI =
  "https://2d74-124-29-212-38.ngrok-free.app/settings/add-marketplace";
const CLIENT_SECRET = "PRD-82f0b3124287-bf3f-4c91-a57e-c79e";
const CLIENT_ID = "BitsBay-delevery-PRD-182f0b312-32b6304a";

const EBAY_TOKEN_URL = "https://api.ebay.com/identity/v1/oauth2/token";
exports.createEbayStore = async (req, res) => {
  console.log(req.body);
  const authorizationCode = req.body.authorizationCode;
  const storeName = req.body.storeName;
  const userId = req.body.userId;

  try {
    const data = await getEbayAuthToken(authorizationCode);
    console.log(data, "data");
    const storeCreated = await StoreModal.create({
      accessToken: data?.access_token,
      refreshToken: data?.refresh_token,
      storeName: storeName,
      accessTokenExpire: data?.refresh_token_expires_in,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      platformName: "EBay",
      logo: "/media/stores/ebay_logo.png",
      userId: userId,
    });
    res.status(200).json({
      successMessage: "Store Created Successfully",
      errorMessage: null,
      store: storeCreated,
    });
  } catch (error) {
    const message = errorHandleMessage(error, "Ebay STORE CREATION");
    res.status(405).json({
      successMessage: null,
      errorMessage: message,
    });
  }
};

exports.createWalmartStore = async (req, res) => {
  console.log(req.body);
  const client_key = req.body.client_key;
  const secret_key = req.body.secret_key;
  const storeName = req.body.storeName;
  const userId = req.body.userId;

  try {
    const { access_token, expires_in } = await getWalmartAccessToken(
      client_key,
      secret_key
    );
    console.log("Access Token:", access_token);

    const storeCreated = await StoreModal.create({
      accessToken: access_token,
      storeName: storeName,
      accessTokenExpire: expires_in,
      client_key: client_key,
      secret_key: secret_key,
      platformName: "Walmart US",
      logo: "/media/stores/walmart_us_logo.png",
      userId: userId,
    });
    res.status(200).json({
      successMessage: "Store Created Successfully",
      errorMessage: null,
      store: storeCreated,
    });
  } catch (error) {
    const message = errorHandleMessage(error, "AMZ STORE CREATION");

    res.status(405).json({
      successMessage: null,
      errorMessage: message,
    });
  }
};
exports.createEtsyStore = async (req, res) => {
  console.log(req.body);
  const authorizationCode = req.body.authorizationCode;
  const storeName = req.body.storeName;
  const userId = req.body.userId;

  try {
    const data = {
      grant_type: "authorization_code",
      client_id: "1aa2bb33c44d55eeeeee6fff",
      redirect_uri: "https://www.example.com/some/location",
      code: authorizationCode,
      code_verifier: "vvkdljkejllufrvbhgeiegrnvufrhvrffnkvcknjvfid",
    };

    const res = axios.post(
      "https://api.etsy.com/v3/public/oauth/token",
      new URLSearchParams(data)
    );

    const storeCreated = await StoreModal.create({
      accessToken: access_token,
      storeName: storeName,
      accessTokenExpire: expires_in,
      client_key: client_key,
      secret_key: secret_key,
      platformName: "Etsy",
      logo: "/media/stores/etsy_logo.png",
      userId: userId,
    });
    res.status(200).json({
      successMessage: "Store Created Successfully",
      errorMessage: null,
      store: storeCreated,
    });
  } catch (error) {
    const message = errorHandleMessage(error, "AMZ STORE CREATION");

    res.status(405).json({
      successMessage: null,
      errorMessage: message,
    });
  }
};
exports.createTikTokStore = async (req, res) => {
  console.log(req.body);
  const authorizationCode = req.body.authorizationCode;
  const storeName = req.body.storeName;
  const userId = req.body.userId;

  try {
    const data = {
      app_key: "https://www.example.com/some/location",
      app_secret: "vvkdljkejllufrvbhgeiegrnvufrhvrffnkvcknjvfid",
      auth_code: authorizationCode,
      grant_type: "authorization_code",
    };

    const res = axios.get(
      "https://auth.tiktok-shops.com/api/v2/token/get",
      new URLSearchParams(data)
    );
    console.log(res, "res");
    const storeCreated = await StoreModal.create({
      storeName: storeName,
      tikTokOauth: res.data,
      platformName: "Etsy",
      logo: "/media/stores/etsy_logo.png",
    });
    res.status(200).json({
      successMessage: "Store Created Successfully",
      errorMessage: null,
      store: storeCreated,
    });
  } catch (error) {
    const message = errorHandleMessage(error, "AMZ STORE CREATION");

    res.status(405).json({
      successMessage: null,
      errorMessage: message,
    });
  }
};
exports.getAllStores = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    console.log(id, "id");
    const stores = await StoreModal.find({ userId: id }); // Fetch all stores
    res.status(200).json({
      successMessage: null,
      errorMessage: null,
      stores: stores,
    });
  } catch (err) {
    // res.status(400).json({
    //   message: `ERR: BAD REQUEST${err}`,
    // });
  }
};
