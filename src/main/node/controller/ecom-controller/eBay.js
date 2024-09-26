const EbayAuthToken = require("ebay-oauth-nodejs-client");

exports.getEbayAuthToken = async (code) => {
  console.log(code);
  const authTokens = await eBayAuth(code);
  return authTokens;
};

const eBayAuth = async (code) => {
  let client = "BitsBay-delevery-PRD-182f0b312-32b6304a";
  let secret = "PRD-82f0b3124287-bf3f-4c91-a57e-c79e";

  const ebayAuthToken = new EbayAuthToken({
    clientId: client,
    clientSecret: secret,
    redirectUri:
      "https://acf4-124-29-212-38.ngrok-free.app/settings/add-marketplace",
  });
  const tokens = await ebayAuthToken.exchangeCodeForAccessToken(
    "PRODUCTION",
    code
  );

  return tokens;
};
