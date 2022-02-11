import { axiosInstance } from "../../config";
import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieFailure,
} from "./MovieActions";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axiosInstance.get("/movies", {  //fetch from "/movies" endpoint 
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,  //grab access token from local storage
      },
    });
    dispatch(getMoviesSuccess(res.data)); //return movie data 
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};

//CREATE NEW MOVIE
export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
    const res = await axiosInstance.post("/movies", movie, {  //create new post in DB
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createMovieSuccess(res.data)); //return new movie data
  } catch (err) {
    dispatch(createMovieFailure());
  }
};

//DELETE MOVIE
export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    await axiosInstance.delete("/movies/" + id, { //delete movie from DB
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteMovieSuccess(id)); //return id that is deleted
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};

//UPDATE EXISTING MOVIE 
export const updateMovie = async (id, dispatch, movie) => { //takes in id, dispatch, and existing movie object
  dispatch(updateMovieStart()); //start updating movie action 
  try {
    const res = await axiosInstance.put("/movies/" + id, movie, {  //update movie in DB 
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateMovieSuccess(res.data)); //return updated movie data 
  } catch (err) {
    dispatch(updateMovieFailure()); //update movie failure 
  }
};