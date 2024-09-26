const mongoose = require("mongoose");
function generate5DigitId() {
  return Math.floor(10000 + Math.random() * 90000); // Generates a random 5-digit number
}
const storeWalmartSchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: generate5DigitId, // Use the function to generate the default value
  },
  userId: {
    type: String,
    required: true,
  },
  storeName: {
    type: String,
    required: false,
  },
  logo: {
    type: String,
    required: false,
  },
  lastSyncDate: {
    type: String,
    required: false,
  },

  sellerPartnerId: {
    type: Object,
    required: false,
  },
  createdDate: {
    type: Date,
    required: false,
    default: () => new Date(),
  },
  platformName: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  client_id: {
    type: String,
  },
  client_secret: {
    type: String,
  },
  client_key: {
    type: String,
  },
  secret_key: {
    type: String,
  },
  logo: {
    type: String,
  },
  accessToken: {
    type: String,
    default: null,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  accessTokenGenerateTime: {
    type: Date,
    required: false,
    default: () => new Date(),
  },
  accessTokenExpire: {
    type: String,
    required: false,
  },
  refreshTokenExpire: {
    type: Date,
    required: false,
    default: () => {
      const now = new Date();
      return new Date(now.setFullYear(now.getFullYear() + 1)); // Adds one year to the current date
    },
  },
});

const StoreWalmartModal = mongoose.model("storeWalmart", storeWalmartSchema);

module.exports = StoreWalmartModal;
