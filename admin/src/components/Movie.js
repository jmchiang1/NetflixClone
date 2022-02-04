import { useParams, useHistory } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import "./Styles/Movie.css";
import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../context/movieContext/MovieContext";
import { updateMovie } from "../context/movieContext/apiCalls";
import axios from "axios";

export default function Movie() {
  const [movie, setMovie] = useState([]); //state of single movie object
  const { dispatch } = useContext(MovieContext);
  const params = useParams(); //grabs movie id

  // console.log("DISPATCH", dispatch);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + params.movieId, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }
        });
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMovie();
  },[params])

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({...movie, [e.target.name]: value});
  }

  let history = useHistory();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(movie._id, dispatch, movie);
    alert("Edit successfully");
    history.push("/movies")
  }

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
            <input
              type="text"
              name="title"
              value={movie.title}
              onChange={handleChange}
            />
            <label>Year</label>
            <input
              type="text"
              name="year"
              value={movie.year}
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              value={movie.genre}
              onChange={handleChange}
            />
            <label>Limit</label>
            <input
              type="text"
              name="limit"
              value={movie.limit}
              onChange={handleChange}
            />
            <label>Image</label>
            <input
              type="text"
              name="img"
              value={movie.img}
              onChange={handleChange}
            />
            <label>Trailer</label>
            <input
              type="text"
              name="trailer"
              value={movie.trailer}
              onChange={handleChange}
            />
            <label>Video</label>
            <input
              type="text"
              name="video"
              value={movie.video}
              onChange={handleChange}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              {/* <label htmlFor="text"> */}
                {/* <Publish /> */}
              {/* </label> */}
              <input type="text" id="text" style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

//NOT USED CODE
// const [movies, setMovie] = useState({
//   title: "",
//   description: "",
//   img: "",
//   imgTitle: "",
//   imgSmall: "",
//   trailer: "",
//   video: "",
//   year: "",
//   limit: "",
//   genre: "",
//   isSeries: false,
// });

// const location = useLocation();
// const movie = location.movie;
// console.log("LOCATION",location)  //returns correct path name
// console.log("MOVIE",movie)        //returns entire movie object
