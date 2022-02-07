import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { FavContextProvider } from "./context/favContext/FavContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FavContextProvider>
        <App />
      </FavContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
