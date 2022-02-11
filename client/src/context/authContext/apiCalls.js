import { axiosInstance } from "../../config";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {  //pass in user credentials and dispatch function 
  dispatch(loginStart()); //dispatch login start 
  try {
    const res = await axiosInstance.post("auth/login", user); //create user 
    dispatch(loginSuccess(res.data));                 //dispatch login success with user data (email, username, password)
  } catch (err) {
    dispatch(loginFailure()); //if login failed, dispatch loginFailure function 
  }
};
