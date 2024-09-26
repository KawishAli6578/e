

const express = require("express");
const { getEbayAuthToken } = require("../../controller/ecom-controller/eBay");


const router = express.Router();

router.route("/auth/ebay").get(getEbayAuthToken);


module.exports = router;