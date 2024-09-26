const mongoose = require("mongoose");

const storePlatformSchema = new mongoose.Schema({
  _id: String,
  platformName: {
    type: String,
    required: false,
  },
  logo: {
    type: String,
    required: false,
  },
  instruction: {
    type: String,
    required: false,
  },
  storeDescription: {
    type: String,
    required: false,
  },
  connectionParam: {
    type: Object,
    required: false,
  },
  active: {
    type: Boolean,
  },
});

const StorePlatformModal = mongoose.model("storePlatform", storePlatformSchema);

module.exports = StorePlatformModal;
