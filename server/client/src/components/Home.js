import "./Styles/Home.scss";
import Navbar from "./Navbar";
import Featured from "./Featured";
import List from "./List";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../config";

//pass in type from ???
const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  //GET random movie lists
  useEffect(() => {
      const getRandomLists = async () => {
          try {
              //select movie/series type and specific genre 
              const res = await axiosInstance.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
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
          {/* make sure Feature page has access to type and setGenre */}
          <Featured type={type} setGenre={setGenre} />
          {lists.map((list) => (
              <List list={list} key={list._id} />
          ))}
          <Footer />
      </div>
  )
}

export default Home