import { axiosInstance } from "../../config";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {  //pass in user credentials 
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post("auth/login", user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure()); //if login failed, dispatch loginFailure function 
  }
};
