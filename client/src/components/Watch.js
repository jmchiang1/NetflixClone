import React from "react";
import "./Styles/Watch.scss";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ReactPlayer from "react-player";

function Watch() {
  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlinedIcon />
        Home
      </div>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=JfVOs4VSpmA&ab_channel=SonyPicturesEntertainment"
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
