import React, { useState, useEffect } from "react";
import "./Styles/ListItem.scss";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReactPlayer from 'react-player';
import axios from 'axios';


function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  console.log(item);  //returns movie id

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(`movies/find/${item}`, {
          headers: {
            token: 
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjIxMjYwNmIxMjU1NjI3MjgyMmY1NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MzU5MzkwOSwiZXhwIjoxNjQzNjgwMzA5fQ.pzWhzu0MS_zoP-3ly0CozsXO0RA7Wgb_ytDaoTpWcSY",
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }} //center the hovered image
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {isHovered ? (
        <ReactPlayer 
        url={movie.trailer}
        playing={true}
        width="100%"
        height="140px"
        muted={true}
        />
        ) :
        <img src={movie.img} alt="" />
      }
      <div className="itemInfo">
        <div className="icons">
          <PlayArrowOutlinedIcon className="icon" />
          <AddOutlinedIcon className="icon" />
          <ThumbUpIcon className="icon" />
          <ThumbDownIcon className="icon" />
        </div>
        <div className="itemInfoTop">
          <span>{movie.duration}</span>
          <span className="limit">{movie.limit}</span>
          <span>{movie.year}</span>
        </div>
        <div className="desc"> {movie.description} </div>
        <div className="genre">{movie.genre}</div>
      </div>
    </div>
  );
}

export default ListItem;
