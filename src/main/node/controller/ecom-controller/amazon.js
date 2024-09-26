const axios = require("axios");

// Function to exchange authorization code for access token
const clientId =
  "amzn1.application-oa2-client.264d443e011b408c88cf1d4946ae073d"; // Your app's client ID
const clientSecret =
  "amzn1.oa2-cs.v1.1beae16888e56cd8654a0ae320676e20cf887b51b06e1fb4fd9556bc383907a1"; // Your app's client secret
const redirectUri =
  "https://8af6-124-29-212-38.ngrok-free.app/settings/add-marketplace"; // Your app's redirect URI
const tokenEndpoint = "https://api.amazon.com/auth/o2/token";
exports.createStore = async (req, res) => {
  const authorizationCode = req.body.authorizationCode;
  const sellerPartnerId = req.body.sellerPartnerId;
  const storeName = req.body.storeName;
  const lastSyncDate = null;
  const storeCreatedDate = new Date();

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
  } catch (error) {
    console.error("Error exchanging authorization code:", error.response.data);
    throw new Error("Failed to get access token");
  }
};
