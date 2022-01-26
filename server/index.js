const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.listen(8800, () => {
  console.log("Server running on PORT 8800");
});
