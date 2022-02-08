import './Styles/SingleMovie.css';
import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactPlayer from "react-player/lazy";
import { FavoriteContext } from '../context/favouriteContext/FavoriteContext'

const Info = () => {

  const [movie, setMovie] = useState({});
  const { addMovieToWatchList, watchList } = useContext(FavoriteContext);
  const params = useParams();

  //GET movie by id 
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + params.infoID, {
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
  }, [params.infoID]);


  let storedMovie = watchList.find((item) => item._id === movie._id); //find movie in the watchlist
  const watchListDisable = storedMovie ? true : false;  //if movie is in watchlist, watchListDisable is true, otherwise it's false

  return (
    <>
      <Navbar />
      <div className="coverWrapper">
        <div
          className="cover"
          style={{
            backgroundImage: `url(${movie.img})`, //background image 
          }}
        >
          <div className="singleColumn">
            <div className="posterWrapper">
              <div className="poster-info">
                <img src={movie.imgSmall} alt={movie.title} />
              </div>
            </div>
            <div className="detailWrapper">
              <div className="detail">
                <div className="title-info">
                  <h2 className="">
                    <p>
                      {" "}
                      {movie.title} ({movie.year}){" "}
                    </p>
                  </h2>
                  <div className="fact">
                    <span className="certification">Age Limit {movie.limit}+</span>
                    <span className="genre-info">
                      <p>Genre: {movie.genre}</p>
                    </span>
                  </div>
                </div>
                <div className="action">
                  <div className="playFilm">
                    <Link
                      to={{ pathname: "/watch/" + movie._id, movie: movie }}  //links to watch trailer page 
                    >
                      <button className="info-btn btn-play">Play Trailer</button>
                    </Link>
                    <button
                      className="info-btn btn-myList"
                      onClick={() => addMovieToWatchList(movie)}  //adds movie to watchlist 
                      disabled={watchListDisable} //disable the button according to "watchListDisable" boolean 
                    >
                      Add to My List
                    </button>
                  </div>
                </div>
                <div className="headerInfo">
                  <h3 className="overview">Overview</h3>
                  <p className="des">{movie.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* render trailer on the bottom  */}
      <div className="trailer">
        <ReactPlayer
          controls
          playing={true}
          loop={true}
          url={movie.trailer}
          className="video"
          width="100%"
          height="100%"
        />
      </div>
      <Footer />
    </>
  );
};

export default Info;
