import "./Styles/NewUser.css";
import { useContext, useState } from "react";
import { createUser } from "../context/userContext/apiCalls";
import { UserContext } from "../context/userContext/UserContext";
import { useHistory } from "react-router-dom";

export default function NewUser() {
  const { dispatch } = useContext(UserContext);
  let history = useHistory();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };
  console.log("User", user);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      createUser(user, dispatch);
      alert("User Successfully created");
      history.push("/users");
    } catch (err) {
      console.log("Error in creating new User");
      alert("Error in creating new User");
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="username..."
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com..."
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password..."
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>IsAdmin</label>
          <select
            name="isAdmin"
            id="isAdmin"
            value={user.isAdmin}
            className="userUpdateInput"
            onChange={handleChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
