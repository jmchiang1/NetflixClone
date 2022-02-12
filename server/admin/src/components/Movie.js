import { useParams, useHistory } from "react-router-dom";
// import { Publish } from "@material-ui/icons";
import "./Styles/Movie.css";
import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../context/movieContext/MovieContext";
import { updateMovie } from "../context/movieContext/apiCalls";
import { axiosInstance } from "../config";

export default function Movie() {
  const [movie, setMovie] = useState([]); //state of single movie object
  const { dispatch } = useContext(MovieContext);
  const params = useParams(); //grabs movie id

  // console.log("DISPATCH", dispatch);
  console.log("MOVIE", movie);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axiosInstance.get("/movies/find/" + params.movieId, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [params]);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(movie._id, dispatch, movie);
    alert("Edit successfully");
    history.push("/movies");
  };

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
            <select
              type="text"
              name="genre"
              value={movie.genre}
              onChange={handleChange}
            >
              <option>Genre</option>
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="animation">Animation</option>
              <option value="fantasy">Fantasy</option>
              <option value="horror">Horror</option>
              <option value="romance">Romance</option>
              <option value="drama">Drama</option>
            </select>
            <label>Limit</label>
            <input
              type="text"
              name="limit"
              value={movie.limit}
              onChange={handleChange}
            />
            <label>Feature Image</label>
            <input
              type="text"
              name="img"
              value={movie.img}
              onChange={handleChange}
            />
            <img src={movie.img} alt="" className="productUploadImg" />
            <label>Title Image</label>
            <input
              type="text"
              name="imgTitle"
              value={movie.imgTitle}
              onChange={handleChange}
            />
            <img src={movie.imgTitle} alt="" className="productUploadImg" />
            <label>Thumbnail Image</label>
            <input
              type="text"
              name="imgSmall"
              value={movie.imgSmall}
              onChange={handleChange}
            />
            <img src={movie.imgSmall} alt="" className="productUploadImg" />
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
        </form>
      <button className="productButton" onClick={handleSubmit}>
        Update
      </button>
      </div>
    </div>
  );
}