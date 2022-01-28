import React, { useState } from "react";
import "./Styles/ListItem.scss";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReactPlayer from 'react-player'


function ListItem({index, item}) {
  const [isHovered, setIsHovered] = useState(false);
  // const [movie, setMovie] = useState({});

  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }} //center the hovered image
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {isHovered ? (
        <ReactPlayer 
        url="https://www.youtube.com/watch?v=JfVOs4VSpmA&ab_channel=SonyPicturesEntertainment"
        playing={true}
        width="100%"
        height="140px"
        muted={true}
        />) 
        :
        <img
        src="https://wallpaperboat.com/wp-content/uploads/2021/12/19/79926/spider-man-no-way-home-12.jpg"
        alt=""
      />
      }
      <div className="itemInfo">
        <div className="icons">
          <PlayArrowOutlinedIcon className="icon" />
          <AddOutlinedIcon className="icon" />
          <ThumbUpIcon className="icon" />
          <ThumbDownIcon className="icon" />
        </div>
        <div className="itemInfoTop">
          <span>1 Hour 14 minutes</span>
          <span className="limit">18+</span>
          <span>2021</span>
        </div>
        <div className="desc">
          With Spider-Man's identity now revealed, our friendly neighborhood
          web-slinger is unmasked and no longer able to separate his normal life
          as Peter Parker from the high stakes of being a superhero. When Peter
          asks for help from Doctor Strange, the stakes become even more
          dangerous, forcing him to discover what it truly means to be
          Spider-Man.
        </div>
        <div className="genre">Action</div>
      </div>
    </div>
  );
}

export default ListItem;
