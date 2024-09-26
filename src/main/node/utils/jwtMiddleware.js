const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secretKey = "D1rh4123"; // Change this to a secure random string

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "86400s" }); // Adjust the expiration time as needed
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: "Token not provided", token: null });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token", token: null });
    }
    req.user = decoded;
    next();
  });
}
function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

function registerUserEncrypted(userData) {
  const hashedPassword = hashPassword(userData.password);
  const user = { ...userData, password: hashedPassword };
  return user;
}

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  registerUserEncrypted,
};
