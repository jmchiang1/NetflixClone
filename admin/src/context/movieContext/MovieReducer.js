const MovieReducer = (state, action) => {
  switch (action.type) {

    //GET MOVIES
    case "GET_MOVIES_START": //initial state of movies
      return {
        movies: [],
        isFetching: true,
        error: false,
      };
    case "GET_MOVIES_SUCCESS":
      return {
        movies: action.payload, //if successful, return movie object data
        isFetching: false,
        error: false,
      };
    case "GET_MOVIES_FAILURE":
      return {
        movies: [], //if failure return empty array
        isFetching: false,
        error: true,
      };

    //CREATE MOVIE
    case "CREATE_MOVIE_START":
      return {
        ...state, //return previous state
        isFetching: true,
        error: false,
      };
    case "CREATE_MOVIE_SUCCESS":
      return {
        movies: [...state.movies, action.payload], //add movie to existing list of movies
        isFetching: false,
        error: false,
      };
    case "CREATE_MOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    //UPDATE MOVIE
    case "UPDATE_MOVIE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_MOVIE_SUCCESS":
      return {
        movies: state.movies.map( //map movies that match movie id?
          (movie) => movie._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_MOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    //DELETE MOVIE
    case "DELETE_MOVIE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_MOVIE_SUCCESS":
      return {
        movies: state.movies.filter((movie) => movie._id !== action.payload), //delete single movie that matches id
        isFetching: false,
        error: false,
      };
    case "DELETE_MOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default MovieReducer;
