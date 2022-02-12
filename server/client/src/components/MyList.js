import React, { useContext } from "react";
import Navbar from "./Navbar";
import { PlayArrow, CheckOutlined, MoreVert } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./Styles/MyList.scss";
import { FavoriteContext } from "../context/favouriteContext/FavoriteContext";

const MyList = () => {
  //grab removeWatchlist and watchlist from context
  const { removeMovieFromWatchList, watchList } = useContext(FavoriteContext);
  return (
    <>
      <Navbar />
      <h1 className="title-list">My List</h1>
      {/* if watchlist is empty, render out message, otherwise render out watchlist */}
      {!watchList.length > 0 ? (
        <h1 className="empty">You don't have a favorite movie yet !!</h1>
      ) : (
        <>
          <div className="my-list">
            {watchList.map((movie, i) => (
              <div className="show-list" key={i}>
                {/* link to single movie page  */}
                <Link to={{ pathname: "/info/" + movie._id, movie: movie }}>
                  <img
                    src={movie.imgSmall}
                    alt={movie.title}
                    className="poster"
                  />
                </Link>
                <div className="itemInfo">
                  <div className="icons">
                    <div className="iconsLeft">
                      {/* link to movie trailer page */}
                      <Link to={{ pathname: "/watch/" + movie._id, movie: movie }}>
                        <PlayArrow className="icon play" />
                      </Link>
                      <CheckOutlined
                        className="icon play"
                        onClick={() => removeMovieFromWatchList(movie._id)} //remove movie from watchlist with exact id
                      />
                    </div>
                    <div className="iconsRight">
                      <Link
                        to={{ pathname: "/info/" + movie._id, movie: movie }}
                        className="link"
                      >
                        <MoreVert
                          className="icon moreInfo"
                          style={{ color: "white", fontSize: "x-large" }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="itemInfoTop">
                    <span className="limit">{movie.limit}+</span>
                    <span>{movie.year}</span>
                  </div>
                  <div
                    style={{ margin: "10px", color: "white" }}
                    className="genre"
                  >
                    Genre: {movie.genre}
                  </div>
                  <div style={{ color: "white" }} className="desc">
                    {movie.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default MyList;
