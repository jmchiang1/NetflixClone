import "./Styles/Watch.scss";
import React, { useState, useEffect } from "react";
import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
import Navbar from "./Navbar";

const Watch = () => {
  const [movie, setMovie] = useState({});
  const params = useParams();

  console.log("WATCHID", params.watchID); //returns correct movie id
  console.log("MOVIE", movie); //return empty object

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + params.watchID, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [params.watchID]);

  return (
    <>
      <Navbar />
      <div className="watch">
        <Link to="/">
          <div className="back">
            <ArrowBackOutlined />
            Home
          </div>
        </Link>
        <ReactPlayer
          controls
          playing={true}
          loop={true}
          url={movie.video}
          className="video"
          width="80vw"
          height="80vh"
        />
      </div>
    </>
  );
};

export default Watch;
