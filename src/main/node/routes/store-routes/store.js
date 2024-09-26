const express = require("express");
const {
  createStorePlatform,
  getAllStorePlatform,
  getStorePlatformById,
} = require("../../controller/store-contoller/storePlatform");
const {
  createAmazonStore,
  getAllStores,
  createEbayStore,
  createWalmartStore,
  createEtsyStore,
  createTikTokStore,
} = require("../../controller/store-contoller/store");

const router = express.Router();

router.route("/store/platform/create").post(createStorePlatform);
router.route("/store/platform/all").get(getAllStorePlatform);
router.route("/store/platform/:id").get(getStorePlatformById);

router.route("/amazon/store/create").post(createAmazonStore);
router.route("/ebay/store/create").post(createEbayStore);
router.route("/walmart/store/create").post(createWalmartStore);
router.route("/etsy/store/create").post(createEtsyStore);
router.route("/tikTok/store/create").post(createTikTokStore);

router.route("/store/all/:id").get(getAllStores);

module.exports = router;
