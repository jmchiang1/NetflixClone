const FavoriteReducer = (state, action) => {
    switch (action.type) {
      case "ADD_MOVIE_TO_WATCHLIST":
        return {
          ...state,
          watchList: [action.payload, ...state.watchList],  //return movie object and state of current watchlist 
        };
      case "REMOVE_MOVIE_FROM_WATCHLIST":
        return {
          ...state,
          watchList: state.watchList.filter(
            (movie) => movie._id !== action.payload //filter out movie that matches movie.id
          ),
        };
      default:
        return state;
    }
  };
  
  export default FavoriteReducer;
  