import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
import ListList from "./components/ListList";
import List from "./components/List";
import { AuthContext } from "./context/authContext/AuthContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext); //logged in user context information 
  return (
    <Router>
      <Switch>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        {user && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/movies">
                <MovieList />
              </Route>
              <Route path="/movie/:movieId">
                <Movie />
              </Route>
              <Route path="/newMovie">
                <NewMovie />
              </Route>
              <Route path="/lists">
                <ListList />
              </Route>
              <Route path="/list/:listId">
                <List />
              </Route>
              {/* <Route path="/newlist">
                <NewList />
              </Route> */}
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
