// https://github.com/chuhueu/netflix-clone-28-s-team

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const URL = "mongodb+srv://jmchiang:darklord5@mthree-mongo.ojzwn.mongodb.net/netflix?retryWrites=true&w=majority"

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log({ message: err.message }));

app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/movies", movieRoute);
app.use("/lists", listRoute);

//Server production assets
//middleware to direct express to "client" and "admin" folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
  app.use(express.static(path.join(__dirname, "./admin/build")));

  //redirect to client and admin paths
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "admin", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
