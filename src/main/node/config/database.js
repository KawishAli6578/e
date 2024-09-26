const mongoose = require("mongoose");

const connectDatabase = async (url) => {
  let db = false
  await mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb is connected to ${data.connection.host}`);
      db = true;
      return db;

    }).catch((err) => {
      console.log(err, "err")
      db = false;
      return db;
    });

};
module.exports = connectDatabase;
