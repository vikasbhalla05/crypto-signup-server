const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

// const mongoURI = "mongodb://localhost:27017/cryptonDB";

const mongooseConnect = () => {
    const uri = process.env.MONGO_URI

  mongoose
    .connect(uri, { useNewUrlParser: true })
    .then((x) => {
      console.log(`Connected to Mongo! Database`);
    })
    .catch((err) => {
      console.error("Error connecting to mongo", err);
    });
};

module.exports = mongooseConnect;
