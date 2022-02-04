const router = require("express").Router();
const List = require("../models/ListModel");
const verifyToken = require("../verifyToken");

//GET ALL LISTS - works
router.get("/", verifyToken, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE LIST for Admin Page
router.post('/', async (req, res) =>{
  const newList = new List(req.body);
  try {
     const saveList =  await newList.save();
     res.status(200).json(saveList);
  } catch (error) {
      res.status(409).json({message: error.message});
  }
})

//OLD CREATE POST CODE 
// router.post("/", verifyToken, async (req, res) => {
//   if (req.user.isAdmin === true) {
//     const newList = new List(req.body);
//     try {
//       const savedList = await newList.save();
//       res.status(201).json(savedList);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("Admins Only!");
//   }
// });

//DELETE LIST - works
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin === true) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE LIST
router.put("/:id", async (req,res) =>{
  try {
      const updateList = await List.findByIdAndUpdate(
          req.params.id,
          {$set: req.body},
          {new: true}
      )
      res.status(200).json(updateList)
  } catch (error) {
      res.status(500).json(error);
  }
})

module.exports = router;