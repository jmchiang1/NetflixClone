import "./Styles/List.css";
import { useLocation, useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { ListContext } from "../context/listContext/ListContext";
import { updateList } from "../context/listContext/apiCalls";
import { getMovies } from "../context/movieContext/apiCalls";
import { MovieContext } from "../context/movieContext/MovieContext";

export default function List() {
  const location = useLocation();
  const getList = location.list;

  console.log("location", location);
  console.log("getList", getList);

  const [list, setList] = useState(getList);
  const { dispatch } = useContext(ListContext); //dispatch list
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext); //dispatch movie

  let history = useHistory();

  useEffect(() => {
    //grab all movies
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    //grab values of input data
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    //select movies from options
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateList(list._id, dispatch, list); //update list with id, dispatch, list object
      alert("Edit List Successful");
      history.push("/lists"); //redirect back to lists view
    } catch (err) {
      console.log(err);
      alert("Edit List Not Successful");
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input
              type="text"
              name="title"
              value={list.title}
              onChange={handleChange}
            />
            <label>Type</label>
            <input
              type="text"
              name="type"
              value={list.type}
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              value={list.genre}
              onChange={handleChange}
            />
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
          <div className="productFormRight">
            <button className="productButton" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
