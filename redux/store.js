import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./reducer/user.reducer";

const rootReducer = combineReducers({
  // user reducer
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
});

// get info from local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
export default store;
