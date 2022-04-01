const router = require("express").Router();
const Movie = require("../models/MovieModel");
const verifyToken = require("../verifyToken");

//GET ALL MOVIES - works with postman
router.get("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin === true) {  //if user is admin...
    try {
      const movies = await Movie.find();  //get all movies 
      res.status(200).json(movies.reverse());   //sort movies by most recent --> reverse()
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({ message: "Admins Only!" });  //if not admin, send 500 status code 
  }
});


//GET SINGLE MOVIE - works with postman
router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);  //find single movie by id 
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM MOVIE - for showing random movie on Featured Page - works with postman
router.get("/random", verifyToken, async (req, res) => {
  const type = req.query.type;  //returns "series" or "movie"
  let movie;
  try {
    if (type === "series") {  //if "series" is selected, return 1 "series" show 
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([ //else display 1 "movies" show 
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE MOVIE - works with postman
router.post("/", async (req, res) => {
    const newMovie = new Movie(req.body); //create new movie with req.body (movie object data)
    try {
      const saveMovie = await newMovie.save();  //save movie in DB
      res.status(200).json(saveMovie);
    } catch (err) {
      res.status(500).json(err);
    }
});

//UPDATE EXISTING MOVIE
router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin === true) {
    try {
      const updateMovie = await Movie.findByIdAndUpdate(  //find movie by id and update
        req.params.id,
        { $set: req.body }, //replace contents of req.body
        { new: true }       //return new updated document 
      );
      res.status(200).json(updateMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "Admins only!" });
  }
});

//DELETE EXISTING MOVIE
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin === true) {
    try {
      const deleteMovie = await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Movie has been deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "Admins only!" });
  }
});

//SEACH FOR MOVIE 
router.get("/search", async (req, res) => {
  try {
    const searchField = req.query.title;  //returns the input text from search bar 
    const searchMovie = await Movie.find({  //returns object of all movies with titles that match the searchField
      title: { $regex: searchField, $options: "$i" },
    });
    res.status(200).json(searchMovie);  //return JSON list of the searched movies 
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
