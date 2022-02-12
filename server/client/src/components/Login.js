import { useContext, useState } from "react";
import { login } from "../context/authContext/apiCalls";
import { AuthContext } from "../context/authContext/AuthContext";
import { Link } from 'react-router-dom';
import "./Styles/Login.scss";

export default function Login() {

  //state of email and password inputs 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, error } = useContext(AuthContext);
  
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch); //login with email and password input 
    if(error){
      return (
        <p>Wrong password or username</p>
      )
    }
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <Link to="/register">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>

        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}  //grab value of email input 
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} //grab value of password input 
          />
          {/* execute handleLogin function when you press sign in */}
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>
          <span>
            New to Netflix? <Link to="/register" style={{textDecoration: "none"}}><b>Sign up now.</b></Link>
          </span>
        </form>
        <div id="error"></div>
      </div>
    </div>
  );
}