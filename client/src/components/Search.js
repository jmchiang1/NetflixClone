import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Styles/Search.scss";
import Navbar from "./Navbar";

function Search() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      //if searchterm input box is not empty,
      const searchMovie = async () => {
        try {
          const res = await axios.get(`/movies/search?title=${searchTerm}`); //grab the movie from DB
          setMovies(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      searchMovie();
    } else {
      setMovies([]);
    }
  }, [searchTerm]); //trigger this useEffect everytime searchTerm is changed

  useEffect(() => {
    if (movies) {
      //if movie exist, then show the searched movie
      setShowSearch(true);
    }
    if (movies === []) {
      setShowSearch(false);
    }
  }, [movies]);

  return (
    <>
      <div>
        <Navbar />
        <h1 style={{color: 'white'}}>Testing</h1>
        <form
          className="search-form"
          onSubmit={(e) => e.preventDefault()}  //submitting on form doesnt refresh the page
          onChange={(e) => setSearchTerm(e.target.value)}   //save the input to "searchTerm"
        >
          <input
            type="search"
            className="search"
            placeholder="Movies or Series"
          />
        </form>
      </div>
      <div className="listitem">
        {!showSearch ? (    //if showSearch is false, then render "No Found"
          <h1>No Found</h1>
        ) : (
          movies.map((movie) => {   //otherwise, map all the matching movies 
            return (
              <Link to={{ pathname: "/info/" + movie._id, movie: movie }}>
                <img
                  src={movie.imgSmall}
                  alt={movie.title}
                  key={movie._id}
                  className="poster"
                />
              </Link>
            );
          })
        )}
      </div>
    </>
  );
}
export default Search;
