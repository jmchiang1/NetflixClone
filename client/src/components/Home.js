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
              const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
                  headers: {
                      token:
                          "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                  },
              });
              setLists(res.data);
              // console.log(res.data);
          } catch (error) {
              console.log(error);
          }
      }
      getRandomLists();
  }, [type, genre])

  return (
      <div className="home">
          <Navbar />
          <Featured type={type} setGenre={setGenre} />
          {lists.map((list) => (
              <List list={list} key={list._id} />
          ))}
          {/* <Footer /> */}
      </div>
  )
}

export default Home