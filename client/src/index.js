import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { FavouriteProvider } from './context/favouriteContext/FavoriteContext'

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
