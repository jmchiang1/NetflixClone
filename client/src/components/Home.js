import "./Styles/Home.scss";
import Navbar from "./Navbar";
import Feature from "./Featured";
import List from "./List";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Home({ type }) {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {  //add in authentication token 
              token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjIxMjYwNmIxMjU1NjI3MjgyMmY1NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MzU5MzkwOSwiZXhwIjoxNjQzNjgwMzA5fQ.pzWhzu0MS_zoP-3ly0CozsXO0RA7Wgb_ytDaoTpWcSY ",
            },
          }
        );
        console.log(res);
        // setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Feature type={type} />
      <List />
      <List />
      <List />
    </div>
  );
}

export default Home;
