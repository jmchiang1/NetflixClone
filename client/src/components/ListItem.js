import "./Styles/ListItem.scss";
import { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player/lazy";
import axios from "axios";
import { Link } from "react-router-dom";
import { PlayArrow, MoreVert, CheckOutlined, Add } from "@material-ui/icons";
import { FavoriteContext } from "../context/favouriteContext/FavoriteContext";

const Listitem = ({ index, item }) => {
  const { addMovieToWatchList, removeMovieFromWatchList } =
    useContext(FavoriteContext); //grab removeWatchlist and watchlist from context
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [check, setCheck] = useState(false);

  useEffect(() => {
    // setTimeout(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("movies/find/" + item, {
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
    // }, 500);
  }, [item]);

  return (
    <>
      {/* <Link to={{ pathname: "/watch/" + movie?._id, movie: movie }}> */}
      <div className="listItemContainer">
        <div
          className="listItem"
          style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <>
              <ReactPlayer
                controls
                playing={true}
                loop={true}
                url={movie.trailer}
                className="trailer"
                width="100%"
                height="60%"
                muted={true}
              />
            </>
          ) : (
            <>
              <img src={movie.imgSmall} alt="nothing to see here" />
            </>
          )}
          <div className="itemInfo">
            <div className="icons">
              <div className="iconsLeft">
                <Link to={{ pathname: "/watch/" + movie?._id, movie: movie }}>
                  <PlayArrow className="icon play" style={{ color: "white" }} />
                </Link>

                {/* if icon is Checked, render checked icon, otherwise render Add */}
                {check ? (
                  <CheckOutlined
                    className="icon"
                    onClick={
                      () => removeMovieFromWatchList(movie, setCheck(!check)) //remove item from watchlist
                    }
                  />
                ) : (
                  <Add
                    className="icon add"
                    onClick={() => addMovieToWatchList(movie, setCheck(!check))} //add item from watchlist
                  />
                )}
              </div>

              <div className="iconsRight">
                <Link
                  to={{ pathname: "/info/" + movie._id, movie: movie }}
                  className="link"
                >
                  <MoreVert
                    style={{ color: "white" }}
                    className="icon moreInfo"
                  />
                </Link>
              </div>
            </div>
            <div className="itemInfoTop">
              <span className="limit">{movie.limit}+</span>
              <span>{movie.year}</span>
            </div>
            <div style={{ marginBottom: "10px" }} className="genre">
              Genre: {movie.genre}
            </div>
            <div className="desc">{movie.description}</div>
          </div>
        </div>
      </div>
      {/* </Link> */}
    </>
  );
};

export default Listitem;

//PREVIOUS CODE...DO NOT ERASE
// import "./Styles/ListItem.scss";
// import { useState, useEffect } from "react";
// import ReactPlayer from "react-player/lazy";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function ListItem({ index, item }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [movie, setMovie] = useState({});

//   useEffect(() => {
//     const getMovie = async () => {
//       try {
//         const res = await axios.get("/movies/find/" + item, {
//           headers: {
//             token:
//               "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
//           },
//         });
//         setMovie(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMovie();
//   }, [item]);

//   return (
//     <Link to={{ pathname: "/watch/" + movie?._id, movie: movie }}>
//       <div className="listItemContainer">
//         <div
//           className="listItem"
//           style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {isHovered ? (
//             <>
//               <ReactPlayer
//                 controls
//                 playing={true}
//                 loop={true}
//                 url={movie.trailer}
//                 className="trailer"
//                 width="100%"
//                 height="60%"
//                 muted={true}
//               />
//               {/* <div className="itemInfo">
//                 <div className="icons"></div>
//                 <div className="itemInfoTop">
//                   <span>{movie.duration}</span>
//                   <span className="limit">{movie.limit}+</span>
//                   <span>{movie.year}</span>
//                 </div>
//                 <div className="desc">{movie.description}</div>
//                 <div className="genre">{movie.genre}</div>
//               </div> */}
//             </>
//           ) : (
//             <>
//               <img src={movie.imgSmall} alt="nothing to see here" />
//             </>
//           )}
//           <div className="itemInfo">
//             <div className="itemInfoTop">
//               <span>{movie.duration}</span>
//               <span className="limit">{movie.limit}+</span>
//               <span>{movie.year}</span>
//             </div>
//             <div className="desc">{movie.description}</div>
//             <div className="genre">{movie.genre}</div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }
