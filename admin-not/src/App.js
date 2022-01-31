import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import Login from "./pages/Login";
import ListList from "./pages/ListList";
import List from "./pages/List";
import NewList from "./pages/NewList";
import MovieList from "./pages/MovieList";
import { Movie } from "@material-ui/icons";
import NewMovie from "./pages/NewMovie";
import { AuthContext } from "./context/authContext/AuthContext";
import "./app.css";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        {user && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/" element={<Home/>} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movie/:movieId" element={<Movie />} />
              <Route path="/newMovie" element={<NewMovie />} />
              <Route path="/lists" element={<ListList />} />
              <Route path="/list/:listId" element={<List />} />
              <Route path="/newlist" element={<NewList />} />
            </div>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
