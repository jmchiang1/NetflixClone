import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./UserActions";
import { axiosInstance } from "../../config";

//GET USERS
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosInstance.get("/users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUsersSuccess(res.data));
    //   console.log(res.data);
  } catch (error) {
    dispatch(getUsersFailure());
  }
};

//CREATE USERS
export const createUser = async (user, dispatch) => {
  dispatch(createUserStart());
  try {
    const res = await axiosInstance.post("/users", user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createUserSuccess(res.data));
  } catch (error) {
    dispatch(createUserFailure());
  }
};

//DELETE USERS
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axiosInstance.delete("/users/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure());
  }
};

//UPDATE USERS
export const updateUser = async (id, dispatch, user) => {
  dispatch(updateUserStart());
  try {
    const res = await axiosInstance.put("/users/" + id, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateUserSuccess(res.data));
    // console.log(res.data);
  } catch (error) {
    dispatch(updateUserFailure());
  }
};

//UPDATE USER STATUS
export const updateStatus = async (id, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await axiosInstance.put("/users/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
      status: "COMPLETED",
    });
    dispatch(updateUserSuccess(res.data));
  } catch (error) {
    dispatch(updateUserFailure());
  }
};
