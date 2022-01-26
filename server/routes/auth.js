const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({        //create new user with username, email, and encrypted password
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt( //crypto.js takes in user password and secret key
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();  //save new user in DB
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }); //find user by email
    !user && res.status(401).json("Wrong password or username!");   //if email doesnt exist in DB

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);  //decrypt password
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);                 //convert back to original password string

    originalPassword !== req.body.password &&                                   //check both passwords
      res.status(401).json("Wrong password or username!");

    const accessToken = jwt.sign(               //create jwt token
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    const { password, ...info } = user._doc;    //info contains all user object data

    res.status(200).json({ ...info, accessToken }); //hide the user password inside the access token 
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
