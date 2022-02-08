const router = require("express").Router();
const Movie = require("../models/MovieModel");
const verifyToken = require("../verifyToken");

//GET ALL MOVIES - works with postman
router.get("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin === true) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());   //sort movies by most recent
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({ message: "Admins Only!" });
  }
});


//GET SINGLE MOVIE - works with postman
router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM MOVIE - for showing random movie on homepage - works with postman
router.get("/random", verifyToken, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
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
  // if (req.user.isAdmin === true) {
    const newMovie = new Movie(req.body);
    try {
      const saveMovie = await newMovie.save();
      res.status(200).json(saveMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  // } else {
  //   res.status(403).json({ message: "Admins only!" });
  // }
});

//UPDATE EXISTING MOVIE
router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin === true) {
    try {
      const updateMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
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

module.exports = router;
