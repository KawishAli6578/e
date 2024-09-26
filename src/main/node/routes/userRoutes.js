const express = require("express");

const {
  loginUser,
  getAllUsers,
  register,

  getOneUser,
  myProfile,
} = require("../controller/userController.js");

const { verifyToken } = require("../utils/jwtMiddleware.js");
const router = express.Router();

router.post("/user/login", loginUser);
router.post("/user/register", register);

router.get("/user/me", verifyToken, myProfile);

router.get("/users/getUsers", getAllUsers);
router.post("/user/findUserByEmail", getOneUser);

module.exports = router;
