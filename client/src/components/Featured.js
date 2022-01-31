import React, { useState, useEffect } from "react";
import "./Styles/Featured.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import axios from 'axios'

function Featured({ type }) {
  const [content, setContent] = useState({})

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/find/random?type=${type}`, 
        {
          headers: {
            token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjIxMjYwNmIxMjU1NjI3MjgyMmY1NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MzU5MzkwOSwiZXhwIjoxNjQzNjgwMzA5fQ.pzWhzu0MS_zoP-3ly0CozsXO0RA7Wgb_ytDaoTpWcSY",
          },
        })
        setContent(res.data[0])
      } catch (err) {
        console.log(err)
      }
    }
    getRandomContent()
  }, [type])

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series "}</span>
          <select
            name="genre"
            id="genre"
            // onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
      <img src={content.imgTitle} alt="" />
        <span className="description">{content.description} </span>
        <div className="buttons">
          <button className="play">
            <PlayArrowIcon />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlinedIcon />
            <span>Information</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Featured;
