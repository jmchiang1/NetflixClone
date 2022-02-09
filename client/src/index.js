import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { FavouriteProvider } from './context/favouriteContext/FavoriteContext'

//Need to wrap context around the App component so it will access to both Auth and Favorite Context
//Import any context into the components to use them freely
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FavouriteProvider>
        <App />
      </FavouriteProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
