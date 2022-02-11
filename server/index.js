// https://github.com/chuhueu/netflix-clone-28-s-team

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

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
  .connect(process.env.MONGO_URI, {
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

//middleware to direct express to "client" and "admin" folder
app.use(express.static(path.join(__dirname, "/.client/build")));
app.use(express.static(path.join(__dirname, "/.admin/build")));

//redirect to client and admin paths 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/.client/build', 'index.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/.admin/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
