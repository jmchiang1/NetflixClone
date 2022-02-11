import axios from "axios";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  updateListFailure,
  updateListStart,
  updateListSuccess,
} from "./ListActions";

//GET LISTS
export const getLists = async (dispatch) => {
    dispatch(getListsStart());  //initiate getList start action 
    try {
      const res = await axios.get("/lists", {   //get all lists from DB
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(getListsSuccess(res.data));  //if successful, return list object data (action.payload from Reducer)
    } catch (error) {
      dispatch(getListsFailure());  //if failed, dispatch the list failure action 
    }
};

//CREATE
export const createList = async (list, dispatch) => {
    dispatch(createListStart());    //initiate list creation action 
    try {
        const res = await axios.post("/lists", list, {  //create new list in DB 
            headers: {
                token: "Bearer" + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(createListSuccess(res.data));  //return list data if successful 
    } catch (error) {
        dispatch(createListFailure());  //if failed, dispatch the list failure action 
    }
};

//DELETE
export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try {
        await axios.delete("/lists/" + id, {    //delete list by ID from DB
            headers: {
                token: "Bearer" + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(deleteListSuccess(id));
    } catch (error) {
        dispatch(deleteListFailure());
    }
};

//UPDATE
export const updateList = async (id, dispatch, list) => {
    dispatch(updateListStart());
    try {
        const res = await axios.put("/lists/" + id, list, { //update list from DB
            headers: {
                token: "Bearer" + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(updateListSuccess(res.data))   //return list data 
        // console.log(res.data);
    } catch (error) {
        dispatch(updateListFailure());
    }
}