import React from "react";
import "./Styles/Watch.scss";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ReactPlayer from "react-player";
import { Link, useLocation } from "react-router-dom";

function Watch() {
  const location = useLocation();
  const movie = location.movie;

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlinedIcon />
          Home
        </div>
      </Link>
      <ReactPlayer
        url={movie.video}
        playing={true}
        width="100vw"
        height="100vh"
        muted={true}
        className="video"
      />
    </div>
  );
}

export default Watch;
