const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var bodyParser = require('body-parser');
const cors = require('cors');

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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

app.listen(8080, () => {
  console.log("Server running on PORT 8080");
});
