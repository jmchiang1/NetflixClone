//TPYE: actions to dispatch to Reducer

//LOGIN
export const loginStart = () => ({
  type: "LOGIN_START",
});
export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,  //if user is logged in, return the user object 
});
export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});

//LOGOUT
export const logout = () => ({
  type: "LOGOUT",
});
