import "./App.css";
import Home from "./components/Home";
import Watch from "./components/Watch";
import Register from "./components/Register";
import Login from "./components/Login";
import Feature from "./components/Featured";
import SingleMovie from "./components/SingleMovie";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from './context/authContext/AuthContext'

function App() {
  
  const { user } = useContext(AuthContext)
  return ( 
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/register" />} //if no user, redirect to register page
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />} //if user redirect to home
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        {user && ( //if user logged in, able to see these pages
          <>
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/watch/:watchID" element={<Watch />} />
            <Route path="/info/:infoID" element={<SingleMovie />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
