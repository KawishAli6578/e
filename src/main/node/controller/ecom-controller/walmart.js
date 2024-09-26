const { default: axios } = require("axios");
const uuidv4 = require("uuid4");

const getWalmartAccessToken = async (client_key, secret_key) => {
  let authorization =
    "Basic " + Buffer.from(client_key + ":" + secret_key).toString("base64");

  const headers = {
    Authorization: authorization,
    "Content-Type": "application/x-www-form-urlencoded",
    "WM_QOS.CORRELATION_ID": uuidv4(),
    "WM_SVC.NAME": "Token API",
  };
  const url = `https://marketplace.walmartapis.com/v3/token`; //- Production URL

  try {
    const response = await axios.post(
      url,
      { grant_type: "client_credentials" },
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.response.data);
  }
};
module.exports = {
  getWalmartAccessToken,
};
