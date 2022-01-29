import "./Styles/Login.scss";

function Login() {

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
          <form>
              <h1 style={{fontSize: "xxx-large", margin: 'inherit'}}>Sign In </h1>
              <input type="email" placeholder="Email or phone number" />
              <input type="password" placeholder="Password" />
              <button className="loginButton">Sign In</button>
              <span>New to Netflex? <b>Sign up now.</b> </span>
          </form>
      </div>
    </div>
  );
}

export default Login;
