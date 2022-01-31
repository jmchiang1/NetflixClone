import "./Styles/Home.scss";
import Navbar from "./Navbar";
import Featured from "./Featured";
import List from "./List";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ type }) => {
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
              headers: {
                token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjIxMjYwNmIxMjU1NjI3MjgyMmY1NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MzU5MzkwOSwiZXhwIjoxNjQzNjgwMzA5fQ.pzWhzu0MS_zoP-3ly0CozsXO0RA7Wgb_ytDaoTpWcSY",
              },
            }
          );
          setLists(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getRandomLists();
    }, [type, genre]);
  
    return (
      <div className="home">
        <Navbar />
        <Featured type={type} setGenre={setGenre} />
        {lists.map((list) => (
          <List list={list} />
        ))}
      </div>
    );
  };
  
  export default Home;
