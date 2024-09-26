const express = require("express");
const { createAmazonStore } = require("../../controller/store-contoller/store");

const router = express.Router();

router.route("/amazon").post(createAmazonStore);

module.exports = router;
