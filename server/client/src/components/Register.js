import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config";
// import ReactDOM from "react-dom";
import "./Styles/Register.scss";

export default function Register() {
  //state of existing user, email input, and check???
  const [listUser, setListUser] = useState([]);
  const [check, setCheck] = useState(true);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  //useRef return a mutable ref object whose .current property is initialized to "initialValue".
  //The returned object will persist for the full lifetime of the component.
  //Basically, another way of grabbing the value of the input data
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  useEffect(() => {
    const getListUser = async () => {
      try {
        const res = await axiosInstance.get("users"); //grab all users from DB
        setListUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListUser();
  }, []);

  //check email function
  const handleStart = () => {
    setEmail(emailRef.current.value); //set state of email to email input
    let str = "";
    listUser.forEach((list) => {
      str += list.email;
    });
    let checkEmail = str.includes(emailRef.current.value); //if email exist in the list of users
    if (checkEmail === true) {
      alert('Email already registered! Please, try again') 
    } else {  //if email is unique, set checked to false 
      setCheck(false);
    }
  };

  //check username and create user function
  const handleFinish = async (e) => {
    e.preventDefault();
    let str = "";
    listUser.forEach((list) => {
      str += list.username;
    });
    let checkUsername = str.includes(usernameRef.current.value); //if user is already inside the list of users
    if (checkUsername === true) {
      setCheck(false);
      alert('Username already registered! Please, try again') 
    }
    //if username is not in existing list of users, create new user with axios.post 
    try {
      await axiosInstance.post("auth/register", {
        email: email,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      navigate("/login"); //after user creation, navigate to login page to login new user 
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
            onClick={() => setCheck(true)}
          />
          <Link to="/login">
            <button className="loginButton">Sign In</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {check ? (  //if checked is true, that means email exist, stay on this screen 
          <>
            <div className="input">
              {/* Grab value of email input */}
              <input type="email" placeholder="Email address" ref={emailRef} />
              <button className="registerButton" onClick={handleStart}>
                Get Started
              </button>
            </div>
            <div id="errorEmail"></div>
          </>
        ) : ( //if email is unique, then proceed to username input page 
          <>
            <form className="input">
              <input
                type="username"
                placeholder="Username"
                ref={usernameRef} //grab username input data
                style={{ marginRight: "3px" }}
              />
              {/* Grab password input data  */}
              <input type="password" placeholder="Password" ref={passwordRef} />
              <button className="registerButton" onClick={handleFinish}>
                Start
              </button>
            </form>
            <div id="errorUsername"></div>
          </>
        )}
      </div>
    </div>
  );
}
