import React, { useContext } from "react";
import "./Styles/Topbar.css";
import { logout } from "../context/authContext/AuthActions";
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
        Netflix Home
          <button
            style={{
              marginRight: "1rem",
              marginLeft: "10px",
              borderRadius: "5px",
              border: "1px solid white",
            }}
          >
            <a target="_blank" rel="noreferrer" href="https://netflix-clone-jonathan.herokuapp.com/">
              <img
                src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png"
                alt="nothing to see here"
                width={25}
                height={25}
              />
            </a>
          </button>

          <div className="options">
            <Link
              to="/login"
              style={{ textDecoration: "none", padding: "6px", display:'flex', alignItems:'center' }}
            >
              <span
                style={{ color: "white", textDecoration: "none", marginRight: '10px' }}
                onClick={() => dispatch(logout())}
              >
                Logout
              </span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt=""
                className="topAvatar"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
