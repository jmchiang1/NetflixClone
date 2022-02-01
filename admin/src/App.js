import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import UserList from "./components/UserList";
import User from "./components/User";
import NewUser from "./components/NewUser";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import NewMovie from "./components/NewMovie";
import Login from "./components/Login";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route exact path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:movieId" element={<Movie />} />
          <Route path="/newMovie/" element={<NewMovie />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
