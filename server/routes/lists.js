const router = require("express").Router();
const List = require("../models/ListModel");
const verifyToken = require("../verifyToken");

//GET ALL LISTS - works
// router.get("/", verifyToken, async (req, res) => {
//   const typeQuery = req.query.type;
//   const genreQuery = req.query.genre;
//   let list = [];
//   try {
//     if (typeQuery) {        //if type is selected
//       if (genreQuery) {     //if genre is selected
//         list = await List.aggregate([
//           { $sample: { size: 10 } },
//           { $match: { type: typeQuery, genre: genreQuery } },   //return 10 random movies/series of that genre
//         ]);
//       } else {
//         list = await List.aggregate([
//           { $sample: { size: 10 } },
//           { $match: { type: typeQuery } },  //return 10 random movies/series of any genre
//         ]);
//       }
//     } else {
//       list = await List.aggregate([{ $sample: { size: 10 } }]); //return random sample of 10 movies/series
//     }
//     res.status(200).json(list); //return list data
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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

//CREATE LIST for homepage - works with postman
router.post("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Admins Only!");
  }
});

//DELETE LIST - works
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
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

module.exports = router;
