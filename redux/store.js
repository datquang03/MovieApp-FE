import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./reducer/user.reducer";
import * as Category from "./reducer/category.reducer";
import * as Movie from "./reducer/movie.reducer";
import * as Message from "./reducer/message.reducer";

// Kiểm tra dữ liệu hợp lệ trong localStorage
const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Error parsing userInfo:", error);
    localStorage.removeItem("userInfo"); // Xóa dữ liệu lỗi
    return null;
  }
};

const userInfoFromStorage = getUserInfo();

const rootReducer = combineReducers({
  //user reducer
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  userDeleteProfile: User.userDeleteProfileReducer,
  userChangePassword: User.userChangePasswordReducer,
  userGetFavoriteMovies: User.userGetFavoriteMoviesReducer,
  userDeleteAllFavoriteMovies: User.userDeleteAllFavoriteMoviesReducer,
  adminGetAllUsers: User.adminGetAllUsersReducer,
  adminDeleteUser: User.adminDeleteUserReducer,
  userLikeMovie: User.userLikeMovieReducer,
  // category reducer
  getAllCategories: Category.getAllCategoriesReducer,
  adminCreateCategory: Category.createCategoryReducer,
  adminDeleteCategory: Category.deleteCategoryReducer,
  adminUpdateCategory: Category.updateCategoryReducer,

  // movie reducer
  getAllMovies: Movie.getAllMoviesReducer,
  getMovieById: Movie.getMovieByIdReducer,
  getRandomMovies: Movie.getRandomMoviesReducer,
  getTopRatedMovies: Movie.getTopRatedMoviesReducer,
  createMovieReview: Movie.createMovieReviewReducer,
  adminDeleteMovie: Movie.deleteMovieReducer,
  adminDeleteAllMovies: Movie.deleteAllMoviesReducer,
  adminCreateMovie: Movie.createMovieReducer,
  adminUpdateMovie: Movie.updateMovieReducer,
  casts: Movie.addCastReducer,
  // message reducer
  getMessageById: Message.getMessagesByIdReducer,
  sendMessage: Message.sendMessageReducer,
  getMessageForAdmin: Message.getMessagesByIdReducerAdmin,
});

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;
