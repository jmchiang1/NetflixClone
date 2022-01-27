const router = require("express").Router();
const User = require("../models/UserModel");
const CryptoJS = require("crypto-js");
const verifyToken = require("../verifyToken");

//GET ALL USERS: ADMIN ONLY - works with postman
router.get("/", verifyToken, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin){
    try {
      const users = query ? await User.find().limit(10) : await User.find() //admin can see all users 
      res.status(200).json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json("You cannot see all users")
  }
});

//GET SINGLE USER - works with postman
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});


//UPDATE USER - works with postman
router.put("/:id", verifyToken, async (req, res) => {       //verify token first 
  if (req.user.id === req.params.id || req.user.isAdmin) {  //if user id's match or user is an Admin
    if (req.body.password) {                                //if password being changed, encrypt it 
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate( //mongoose function: findByIdAndUpdate
        req.params.id,
        {
          $set: req.body,   //$set operator replaces the value of a field with the specified value
        },
        { new: true }       //return new user after updating 
      );
      res.status(200).json(updatedUser);  //send back updatedUser object 
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can only update your account!");
  }
});

//DELETE USER - works with postman
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});


module.exports = router;
