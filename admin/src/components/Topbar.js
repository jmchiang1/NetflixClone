import React, { useContext } from "react";
import "./Styles/Topbar.css"
import { logout } from '../context/authContext/AuthActions';
import { AuthContext } from "../context/authContext/AuthContext";
import { Link } from "react-router-dom";

function Topbar() {

  const { dispatch } = useContext(AuthContext);

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Dashboard</span>
        </div>
        <div className="topRight">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" className="topAvatar" />
          <div className="options">
              <Link to="/login" style={{textDecoration: "none", padding: "6px"}}>
                <span style={{color: 'white', textDecoration:'none'}} onClick={() => dispatch(logout())}>Logout</span>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;