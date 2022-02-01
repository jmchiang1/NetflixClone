//REDUCER: update context state based on action type

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":     //at the start of login process...
      return {
        user: null,         //user is null
        isFetching: true,   //fetch data
        error: false,       //no error yet, since no info has been inputted yet 
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload, //return user 
        isFetching: false,    //no more data fetching
        error: false,         //no error
      };
    case "LOGIN_FAILURE":
      return {
        user: null,         //user back to null
        isFetching: false,
        error: true,        //throw error
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
