import "./Styles/NewMovie.css";
import { useContext, useState } from "react";
import { createMovie } from "../context/movieContext/apiCalls";
import { MovieContext } from "../context/movieContext/MovieContext";
import { useHistory } from "react-router-dom";


export default function NewMovie() {
  const { dispatch } = useContext(MovieContext);
  let history = useHistory();

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    img: "",
    imgTitle: "",
    imgSmall: "",
    trailer: "",
    video: "",
    year: "",
    limit: "",
    genre: "",
    isSeries: false,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };
  console.log("movie", movie);


  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      createMovie(movie, dispatch);
      alert("Movie Successfully created");
      history.push("/movies")
    } catch (err) {
      console.log("Error in creating movie");
      alert("Error in creating movie");
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Image</label>
          <input type="text" id="img" name="img" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <input
            type="text"
            id="imgTitle"
            name="imgTitle"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input type="text" id="imgSmall" name="imgSmall" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="text" name="trailer" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="text" name="video" onChange={handleChange} />
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
