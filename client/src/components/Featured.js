import React from "react";
import "./Styles/Featured.scss";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function Featured({ type }) {
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
      <img
        src="https://wallpaperboat.com/wp-content/uploads/2021/12/19/79926/spider-man-no-way-home-12.jpg"
        alt=""
      />
      <div className="info">
        <img
          src="https://preview.redd.it/z27ujlkl0qp61.png?auto=webp&s=0ca3f97833cd2280f5fac0c17595d11ca7bf9631"
          alt=""
        />
        <span className="description">
          With Spider-Man's identity now revealed, our friendly neighborhood
          web-slinger is unmasked and no longer able to separate his normal life
          as Peter Parker from the high stakes of being a superhero. When Peter
          asks for help from Doctor Strange, the stakes become even more
          dangerous, forcing him to discover what it truly means to be
          Spider-Man.
        </span>
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
