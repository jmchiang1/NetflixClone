const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
// const listRoute = require("./routes/lists");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connection Successful"))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/movie", movieRoute);
// app.use("/list", listRoute);

app.listen(8080, () => {
  console.log("Server running on PORT 8080");
});
