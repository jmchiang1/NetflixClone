const router = require("express").Router();
const User = require("../models/UserModel");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate( //update user by id 
      req.params.id,
      {
        $set: req.body, //replace req.body data 
      },  
      { new: true }     //return document after updating 
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {  //if current user is logged in or is as Admin...
    try {
      await User.findByIdAndDelete(req.params.id);  //delete any functionality 
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);  //get single user by id 
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USERS
router.get("/", async (req, res) => {
  const query = req.query.new;  //returns true?
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(10) //limit response by latest 10 users 
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS
// router.get("/stats", async (req, res) => {
//   const today = new Date();
//   // const latYear = today.setFullYear(today.setFullYear() - 1);

//   try {
//     const data = await User.aggregate([
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//CREATE
router.post('/', async (req, res) =>{
  const newUser = new User(req.body); //create new user 
  try {
     const saveUser =  await newUser.save();  //save user in DB
     res.status(200).json(saveUser);
  } catch (error) {
      res.status(409).json({message: error.message});
  }
})

module.exports = router;
