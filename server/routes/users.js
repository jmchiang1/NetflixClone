const router = require("express").Router();
const User = require("../models/UserModel");
const CryptoJS = require("crypto-js");
const verifyToken = require("../verifyToken");

//UPDATE USER
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
    res.status(403).json("You can update only your account!");
  }
});

module.exports = router;
