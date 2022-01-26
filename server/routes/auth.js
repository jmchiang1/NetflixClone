const router = require("express").Router();
const User = require("../models/user");

//REGISTER NEW USER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({message: 'Register route error'});
  }
});

module.exports = router;
