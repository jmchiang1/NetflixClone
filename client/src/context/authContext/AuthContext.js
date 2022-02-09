import AuthReducer from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = { //initial state of context, basically same as "LOGIN_START"
  user: JSON.parse(localStorage.getItem("user")) || null, //keep user logged in from local storage 
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);  //create context with the initial state above

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user)); //store user state in local storage
  }, [state.user]); //fire this everytime user state changes 

  return (
    <AuthContext.Provider
      value={{
        user: state.user,             //pass in user, fetching, and error states to context 
        isFetching: state.isFetching,
        error: state.error,
        dispatch,                     //way to dispatch the actions from AuthActions.js
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
