import React from "react";
import "./Styles/Navbar.scss";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext/AuthContext";
import { logout } from "../context/authContext/AuthActions";

function Navbar() {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to="/" className="link">
            <span>Home</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
          <Link to="/mylist" className="link">
          <span>My List</span>
          </Link>
        </div>

        <div className="right"> Admin Dashboard
          <button style={{marginRight: '1rem', marginLeft: '10px', borderRadius: '5px', border: '1px solid white'}}>
            <a target="_blank" href="http://localhost:4000/">
              <SupervisorAccountIcon style={{color:'teal'}} />
            </a>
          </button>
          <span style={{marginRight: '1rem', fontWeight:'bold'}}>Welcome Back: {user.username.toUpperCase()}</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="nothing to see here"
          />
          <div className="profile">
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
