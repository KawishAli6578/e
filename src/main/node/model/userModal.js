const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    require: false,
  },
  firstName: {
    type: String,
    require: false,
  },
  lastName: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: true,
    unique: false,
  },
  role: {
    type: Object,
    require: false,
    default: "ADMIN",
  },
  phone: {
    type: Number,
    require: false,
  },
  companies: {
    type: Object,
    require: false,
  },
  amazon_refreshToken: {
    type: Object,
    require: false,
  },
  ebay_refreshToken: {
    type: Object,
    require: false,
  },
  walmartKeys: {
    type: Object,
    require: false,
  },
  amazon: {
    type: Boolean,
    require: false,
    default: false,
  },
  ebay: {
    type: Boolean,
    require: false,
    default: false,
  },
  walmart: {
    type: Boolean,
    require: false,
    default: false,
  },

  password: {
    type: String,
    require: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  balance: {
    type: Number,
    require: false,
    default: 0,
  },
  balance_history: [
    {
      type: Object,
      require: false,
    },
  ],
  carrierCredentials: [
    {
      type: Object,
      require: false,
    },
  ],
  paymentDetails: {
    type: Object,
    require: false,
  },
  paymentMethod: {
    type: Boolean,
    default: false,
  },
  carrierCredentials:{
    type:Object,
    require:false
  },
  creditHistory:[
    {
      type:Object,
      require:false,
      default:[]
    }
  ]
});

const UserModal = mongoose.model("User", userScheme);

module.exports = UserModal;
