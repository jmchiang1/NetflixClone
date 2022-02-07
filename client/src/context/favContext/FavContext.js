import React, { createContext, useReducer, useEffect } from "react";
import FavReducer from "./FavReducer";

// initial state
const INITIAL_STATE = {
    watchList: localStorage.getItem("watchList")
    ? JSON.parse(localStorage.getItem("watchList"))
    : [],
}

// create context
export const FavContext= createContext(INITIAL_STATE);

// provider components
export const FavProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FavReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("watchList", JSON.stringify(state.watchList));
    },[state])

    //actions
    const addMovieToWatchList = (movie) => {
        dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
      };

      const removeMovieFromWatchList = (id) => {
        dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
      };

    return (
        <FavContext.Provider
        value={{
            watchList: state.watchList,
            addMovieToWatchList,
            removeMovieFromWatchList,
          }}
        >
            {children}
        </FavContext.Provider>
    )

};