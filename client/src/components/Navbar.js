import React from "react";
import "./Styles/Navbar.scss";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext/AuthContext";
import { logout } from "../context/authContext/AuthActions";

function Navbar() {
  const { user, dispatch } = useContext(AuthContext);
  let navigate = useNavigate();

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
          <Link to="/search" className="link">
          <span>
            <SearchOutlinedIcon/>
          </span>
          </Link>
        </div>

        <div className="right"> Admin Dashboard
          <button style={{marginRight: '1rem', marginLeft: '10px', borderRadius: '5px', border: '1px solid white'}}>
            <a target="_blank" rel="noreferrer" href="http://localhost:4000/">
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
              <span onClick={() => dispatch(logout()) //trigger logout function from context then...
              .then(() => {
                navigate('/register') //redirect back to register page
              })}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
