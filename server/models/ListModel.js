const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
    },
    genre: {
      type: String,
    },
    content: {      //Array holds all movies/series objects 
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
