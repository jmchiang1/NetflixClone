const router = require("express").Router();
const List = require("../models/ListModel");
const verifyToken = require("../verifyToken");

//GET ALL LISTS or selected lists 
router.get("/", verifyToken, async (req, res) => {

  const typeQuery = req.query.type; //returns either series or movie, type is selected to string (from model)
  const genreQuery = req.query.genre; //returns the selected genre, type is selected to string (from model) 
  let list = [];  //list = empty array --> add stuff in there later 

  try {
    if (typeQuery) {  //if movie/series is selected...
      if (genreQuery) { //and if a genre is selected...
        list = await List.aggregate([ //return object of the selected shows and genres, max of 10 
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } }, //must match the selected type and genre 
        ]);
      } else {  //if only movie/series is selected, return list of shows, no genre 
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },  //only match type 
        ]);
      }
    } else {  //if neither type nor genre is selected, just return list of everything 
      list = await List.aggregate([{ $sample: { size: 10 } }]); //this is default home page 
    }
    res.status(200).json(list); //send out 200 status code and return list object as JSON
  } catch (err) {
    res.status(500).json(err);  //else return 500 status code and error
  }
});

//CREATE LIST for Admin Page
router.post('/', async (req, res) =>{
  const newList = new List(req.body); //create new list object
  try {
     const saveList =  await newList.save();  //save list in DB
     res.status(200).json(saveList);
  } catch (error) {
      res.status(409).json({message: error.message});
  }
})

//DELETE LIST
router.delete("/:id", async (req, res) => { //specific id selected
    try {
      await List.findByIdAndDelete(req.params.id);  //find show by id and delete it 
      res.status(201).json("The list has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
});

//UPDATE LIST
router.put("/:id", async (req,res) =>{  //specific id selected
  try {
      const updateList = await List.findByIdAndUpdate(  //find show by id and update it 
          req.params.id,
          {$set: req.body}, //$set replaces the value of a field with the specified value.
          {new: true}       //set new: true to return the document after update is applied 
      )
      res.status(200).json(updateList)
  } catch (error) {
      res.status(500).json(error);
  }
})

module.exports = router;