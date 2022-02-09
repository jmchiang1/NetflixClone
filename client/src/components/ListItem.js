import "./Styles/ListItem.scss";
import { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player/lazy";
import axios from "axios";
import { Link } from "react-router-dom";
import { PlayArrow, MoreVert, CheckOutlined, Add } from "@material-ui/icons";
import { FavoriteContext } from "../context/favouriteContext/FavoriteContext";

const Listitem = ({ index, item }) => {

  //grab watchlist functions from context
  const { addMovieToWatchList, removeMovieFromWatchList } = useContext(FavoriteContext);
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("movies/find/" + item, {  //grab single movie from DB
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);

  return (
    <>
      <div className="listItemContainer">
        <div
          className="listItem"
          style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
          onMouseEnter={() => setIsHovered(true)} //when mouse is on the container, set hovered to true
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (  //if hovered, display the Video Player instead of movie image
            <>
              <ReactPlayer
                controls
                playing={true}
                loop={true}
                url={movie.trailer}
                className="trailer"
                width="100%"
                height="60%"
                muted={true}
              />
            </>
          ) : (
            <>
              <img src={movie.imgSmall} alt="nothing to see here" />
            </>
          )}
          {/* Then display the rest of the movie data underneath it  */}
          <div className="itemInfo">
            <div className="icons">
              <div className="iconsLeft">
                <Link to={{ pathname: "/watch/" + movie?._id, movie: movie }}>
                  <PlayArrow className="icon play" style={{ color: "white" }} />
                </Link>

                {/* If icon is checked, render checked icon, otherwise render "Add" */}
                {check ? (
                  <CheckOutlined
                    className="icon"
                    onClick={
                      () => removeMovieFromWatchList(movie, setCheck(!check)) //remove item from watchlist
                    }
                  />
                ) : (
                  <Add
                    className="icon add"
                    onClick={() => addMovieToWatchList(movie, setCheck(!check))} //add item from watchlist
                  />
                )}
              </div>

              <div className="iconsRight">
                <Link
                  to={{ pathname: "/info/" + movie._id, movie: movie }} //link to single movie page
                  className="link"
                >
                  <MoreVert
                    style={{ color: "white" }}
                    className="icon moreInfo"
                  />
                </Link>
              </div>
            </div>
            <div className="itemInfoTop">
              <span className="limit">{movie.limit}+</span>
              <span>{movie.year}</span>
            </div>
            <div style={{ marginBottom: "10px" }} className="genre">
              Genre: {movie.genre}
            </div>
            <div className="desc">{movie.description}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Listitem;
