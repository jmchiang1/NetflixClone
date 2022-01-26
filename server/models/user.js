const mongoose = require("mongoose");

const USerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    idAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamps: true }
);

module.export = mongoose.model("User", USerSchema);