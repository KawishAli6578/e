const data = [
  {
    id: 100019,
    platformName: "Etsy",
    logo: "/media/stores/etsy_logo.png",
    instruction:
      "<ul><li>Click on Connect.</li><li>Allow Ecom Sync app to connect with your Etsy Store.</li> <li>Complete Store Address and Preferences..</li></ul>",
    storeDescription:
      "Celebrate lakeside living with custom coffee mugs. Find them on Etsy! Upgrade your home bar with engraved mugs & glasses.",
    connectionParam: {
      access_token: false,
      refresh_token: false,
      api_key: false,
      store_number: false,
      store_name: false,
      oAuth: {
        query_param: {
          scope: "transactions_r%20transactions_w%20shops_r",
          response_type: "code",
          redirect_uri: "https://{server}/ecommerce/connect-store/etsy-store",
          state: "superstate",
          code_challenge_method: "S256",
          client_id: "Z3dnN3FmM2dkODA5dWZrZzRlamZneDZ6",
          code_challenge: "Zds7fu0QgT32BZrg6FKI9i_M-ccSn_O0WPV8TWhhAo8",
          code_verifier:
            "2q3CbWC_CMuk6pfefsJujSOcjH3fa_scw5onW_pIdpdeVBKG-wtFM9qB94CbOxXX1NdQ3gUpXbpZ0eXnlzujUw",
        },
        enabled: true,
        url: "https://www.etsy.com/oauth/connect",
      },
      api_secret: false,
      url: "https://openapi.etsy.com/v3/application",
    },
    active: true,
  },
  {
    id: 100022,
    platformName: "EBay",
    logo: "/media/stores/ebay_logo.png",
    instruction:
      "<ul><li>Click on Connect.</li><li>Allow Ecom Sync app to connect with your Ebay Store.</li> <li>Complete Store Address and Preferences..</li></ul>",
    storeDescription:
      "Whether you're looking for a personalized gift or a unique addition to your collection, eBay has you covered with one-of-a-kind designs and competitive pricing. Enjoy fast shipping and secure payments.",
    connectionParam: {
      access_token: false,
      refresh_token: false,
      api_key: false,
      store_number: false,
      store_name: false,
      oAuth: {
        query_param: {
          scope:
            "https://api.ebay.com/oauth/api_scope%20https://api.ebay.com/oauth/api_scope/sell.fulfillment%20https://api.ebay.com/oauth/api_scope/commerce.identity.readonly",
          response_type: "code",
          redirect_uri: "Sarwagya_Khosla-Sarwagya-MyShip-saapux",
          client_secret: "UFJELWZjYTBjNWNiOGRlYS1lZTI3LTQ3YTktOGM1Yy1lMTM2",
          prompt: "login",
          client_id: "U2Fyd2FneWEtTXlTaGlwQUktUFJELTdmY2EwYzVjYi1kMmZmMmRhZA==",
        },
        enabled: true,
        url: "https://auth.ebay.com/oauth2/authorize",
      },
      api_secret: false,
      url: false,
    },
    active: true,
  },
  {
    id: 100028,
    platformName: "Amazon US",
    logo: "/media/stores/amazonus.png",
    instruction:
      "<ul>\r\n        <li>Add Store Name.</li>\r\n        <li>Click on Connect and Authorize app to connect with Amazon CA.</li>\r\n        <li>Add Store Number and credentials to Connect.</li>\r\n        </ul>",
    storeDescription:
      "Free shipping on millions of items. Get the best of Shopping and Entertainment with Prime. Enjoy low prices and great deals",
    connectionParam: {
      access_token: false,
      refresh_token: false,
      api_key: false,
      store_number: false,
      store_name: true,
      oAuth: {
        enabled: true,
        url: "https://sellercentral.amazon.com/apps/authorize/consent?application_id=amzn1.sp.solution.9626dd95-0b94-43c2-a0eb-d158cfad1e0b&version=beta",
        redirect_url:
          "https://b52d-124-29-212-38.ngrok-free.app/settings/add-marketplace",
      },
      api_secret: false,
      url: "https://sellingpartnerapi-na.amazon.com",
    },
    active: true,
  },
  {
    id: 100021,
    platformName: "Walmart US",
    logo: "/media/stores/walmart_us_logo.png",
    instruction: null,
    storeDescription:
      "Shop Walmart.com today for Every Day Low Prices. Join Walmart+ for unlimited free delivery from your store & free shipping with no order minimum.",
    connectionParam: {
      access_token: false,
      refresh_token: false,
      api_key: true,
      store_number: false,
      store_name: true,
      oAuth: {
        enabled: false,
        url: "https://",
        redirect_url: "https://",
      },
      api_secret: true,
      url: "https://marketplace.walmartapis.com/v3",
    },
    active: true,
  },
];
