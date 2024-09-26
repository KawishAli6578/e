const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const corsOptions = {
  origin: "http://localhost:3300", // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies, auth headers)
};

app.use(cors());
app.use(express());
app.use(express.json({ type: "application/json" }));

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const user = require("./routes/userRoutes");

// const walmartRoutes = require("./routes/ecom-routes/walmartRoutes.js");
// const amazonOrder = require("./routes/ecom-routes/amazonRoutes.js");
// const ebayOrder = require("./routes/ecom-routes/ebayRoutes.js");
const storePlatform = require("./routes/store-routes/store.js");

app.use("/api/v1", user);
app.use("/api/v1", storePlatform);

// app.use("/api/v1", walmartRoutes);
// app.use("/api/v1", amazonOrder);
// app.use("/api/v1", ebayOrder);

module.exports = app;
