import { useLocation } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import "./Styles/Movie.css";
import { useContext, useState } from "react";
import { MovieContext } from "../context/movieContext/MovieContext";
import { updateMovie } from "../context/movieContext/apiCalls";


export default function Movie() {
  const { dispatch } = useContext(MovieContext);

  const [movies, setMovie] = useState({
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
    setMovie({ ...movies, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(movies, dispatch);
  };

  const location = useLocation();
  const movie = location.movie;

  console.log("LOCATION",location)  //returns correct path name
  console.log("MOVIE",movie)        //returns entire movie object 
  
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" placeholder={movie.title} id="title" name="title" onChange={handleChange} />
            <label>Year</label>
            <input type="text" placeholder={movie.year} id="year" name="year" onChange={handleChange} />
            <label>Genre</label>
            <input type="text" placeholder={movie.genre} id="genre" name="genre" onChange={handleChange} />
            <label>Limit</label>
            <input type="text" placeholder={movie.limit} id="limit" name="limit" onChange={handleChange} />
            <label>Trailer</label>
            <input type="text" placeholder={movie.trailer} id="trailer" name="trailer" onChange={handleChange} />
            <label>Video</label>
            <input type="text" placeholder={movie.video} id="video" name="video" onChange={handleChange} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={movie.img}
                alt=""
                className="productUploadImg"
              />
              <label for="text">
                <Publish />
              </label>
              <input type="text" id="img" name="img" style={{ display: "none" }} onChange={handleChange} />
            </div>
            <button className="productButton" onChange={handleSubmit}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
