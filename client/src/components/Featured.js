import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Styles/Featured.scss";
import { Link } from "react-router-dom";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          //feature homepage defaults to random "Movie" only
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  console.log("CONTENT", content);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          {/* if selected type is "movies", display "Movies", etc */}
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)} //grab the value of the selected genre
          >
            {/* value of selected genre must match exactly with list genre in DB! */}
            <option>Genre</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="animation">Animation</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="drama">Drama</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="nothing to see here" />
      <div className="info">
        <img src={content.imgTitle} alt="nothing to see here" />
        <span className="description">{content.description}</span>
        <div className="buttons">
          <button className="play">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                display: "contents",
              }}
              to={{ pathname: "/watch/" + content._id }}
            >
              <PlayArrow />
              <span>Play</span>
            </Link>
          </button>
          <Link style={{textDecorationLine: 'none'}}  to={{ pathname: "/info/" + content._id }} className="link">
            <button style={{textDecorationLine: 'none'}}  className="more">
              <InfoOutlined style={{textDecorationLine: 'none'}} />
              <span style={{textDecorationLine: 'none'}} >Info</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
