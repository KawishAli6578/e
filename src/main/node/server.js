const app = require("./app");
const process = require("node:process");
const http = require("http");

var connectDatabase = require("./config/database.js");
const { createStorePlatform } = require("./controller/store-contoller/storePlatform.js");

require("dotenv").config();

const url = process.env.MONGO_URI; //production
connectDatabase(url);
// createStorePlatform()

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${PORT}`);
});
