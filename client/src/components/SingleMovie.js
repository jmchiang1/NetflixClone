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


  let storedMovie = watchList.find((item) => item._id === movie._id);
  const watchListDisable = storedMovie ? true : false;

  return (
    <>
      <Navbar />
      <div className="coverWrapper">
        <div
          className="cover"
          style={{
            backgroundImage: `url(${movie.img})`,
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
                      to={{ pathname: "/watch/" + movie._id, movie: movie }}
                    >
                      <button className="info-btn btn-play">Play Trailer</button>
                    </Link>
                    <button
                      className="info-btn btn-myList"
                      onClick={() => addMovieToWatchList(movie)}
                      disabled={watchListDisable}
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
      {/* <Comment movieID={movie._id} /> */}
      <Footer />
    </>
  );
};

export default Info;
