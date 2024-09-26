const { Types } = require("mongoose");
// const nodemailer = require("nodemailer");

const {
  registerUserEncrypted,
  generateToken,
  comparePassword,
  hashPassword,
} = require("../utils/jwtMiddleware");
const UserModal = require("../model/userModal");

exports.register = async (req, res) => {
  try {
    console.log(req.body, "req.body");
    const { email } = req.body;

    const existingEmail = await UserModal.findOne({ email });
    if (existingEmail) {
      return res
        .status(409)
        .json({ message: "Email already exists", success: false });
    }
    const newUser = registerUserEncrypted(req.body);
    let registeredUser = await UserModal.create(newUser);
    const token = generateToken({
      id: registeredUser._id,
      username: registeredUser.username,
      email: registeredUser.email,
      firstName: registeredUser.firstName,
      lastName: registeredUser.lastName,
      phone: registeredUser.phone,
    });
    res.status(201).json({
      success: true,
      message: "Registered Successfully",
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `ERR ${err}`,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await UserModal.findOne({ email }).select("+password");
    if (!user || !comparePassword(password, user?.password)) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    const token = generateToken({
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      serviceDetails: user.serviceDetails,
      rateType: user.rateType,
      ratePercentage: user.ratePercentage,
    });

    if (user) {
      res.json({
        success: true,
        message: "Login Successfully",
        token,
      });
    }
  } catch (err) {
    res.status(401).json({
      err: err,
    });
  }
};
exports.myProfile = async (req, res) => {
  try {
    const user = req.user; // User information from the decoded token
    let id = new Types.ObjectId(user.id);
    let userData = await UserModal.findOne({ _id: user.id }).select([
      "-amazon_refreshToken",
      "-ebay_refreshToken",
      "-walmartKeys",
    ]);
    user.amazon = userData.amazon;
    user.ebay = userData.ebay;
    user.walmart = userData.walmart;
    user.companies = userData.companies;
    user.role = userData.role;
    user.balance = userData.balance;
    user.balanceHistory = userData?.balance_history;
    user.paymentMethod = userData?.paymentMethod;
    user.card = userData?.paymentDetails?.paymentMethodDetails?.card?.last4;
    user.carrierCredentials = userData?.carrierCredentials;
    user.creditHistory = userData?.creditHistory;
    user.ratePercentage = userData?.ratePercentage;
    res.json({ message: "Access to profile API granted", user });
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.getAllUsers = async (req, res) => {
  const users = await UserModal.find();
  if (users) {
    res.json({
      success: true,
      users,
    });
  }
};
exports.getOneUser = async (req, res) => {
  try {
    const email = req.body.email;
    const users = await UserModal.findOne({ email });
    if (users) {
      res.json({
        success: true,
        users,
      });
    }
  } catch (err) {
    res.json({
      success: false,
    });
  }
};
