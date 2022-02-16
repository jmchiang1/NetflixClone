import "./Styles/NewList.css";
import { useContext, useEffect, useState } from "react";
import { createMovie, getMovies } from "../context/movieContext/apiCalls";
import { MovieContext } from "../context/movieContext/MovieContext";
import { ListContext } from "../context/listContext/ListContext";
import { createList } from "../context/listContext/apiCalls";
import { useHistory } from "react-router-dom";

export default function NewList() {
  const [list, setList] = useState(null); //state of lists
  const { dispatch } = useContext(ListContext); //grab dispatch from list
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext); //grab from movie context

  const history = useHistory();

  useEffect(() => {
    getMovies(dispatchMovie); //get movies
  }, [dispatchMovie]);

  const handleChange = (e) => {
    //grab value from input data
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    //save selected options
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createList(list, dispatch); //create list
      history.push("/lists"); //redirect back to lists page 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <select
              type="text"
              placeholder="action"
              name="genre"
              onChange={handleChange}
            >
              <option>Genre</option>
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="animation">Animation</option>
              <option value="horror">Horror</option>
              <option value="romance">Romance</option>
              <option value="drama">Drama</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
      <div className="buttonContainer">
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
}
