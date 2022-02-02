export const getMoviesStart = () => ({  //start the get movie process
  type: "GET_MOVIES_START",
});

export const getMoviesSuccess = (movies) => ({  //return all movies
  type: "GET_MOVIES_SUCCESS",
  payload: movies,
});

export const getMoviesFailure = () => ({
  type: "GET_MOVIES_FAILURE",
});

export const createMovieStart = () => ({
  type: "CREATE_MOVIE_START",
});

export const createMovieSuccess = (movie) => ({ //return movie
  type: "CREATE_MOVIE_SUCCESS",
  payload: movie,
});

export const createMovieFailure = () => ({
  type: "CREATE_MOVIE_FAILURE",
});

export const updateMovieStart = () => ({
  type: "UPDATE_MOVIE_START",
});

export const updateMovieSuccess = (movie) => ({
  type: "UPDATE_MOVIE_SUCCESS",
  payload: movie,
});

export const updateMovieFailure = () => ({
  type: "UPDATE_MOVIE_FAILURE",
});

export const deleteMovieStart = () => ({
  type: "DELETE_MOVIE_START",
});

export const deleteMovieSuccess = (id) => ({  //need id to delete specific movie 
  type: "DELETE_MOVIE_SUCCESS",
  payload: id,
});

export const deleteMovieFailure = () => ({
  type: "DELETE_MOVIE_FAILURE",
});
