import * as userConstants from "../constant/user.constant";

// LOGIN REDUCER
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_LOGIN_REQUEST:
      return { isLoading: true };
    case userConstants.USER_LOGIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case userConstants.USER_LOGIN_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.USER_LOGIN_RESET:
      return {};
    case userConstants.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// REGISTER REDUCER

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      return { isLoading: true };
    case userConstants.USER_REGISTER_SUCCESS:
      return { isLoading: true, userInfo: action.payload, isSuccess: true };
    case userConstants.USER_REGISTER_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE PROFILE

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_UPDATE_PROFILE_REQUEST:
      return { isLoading: true };
    case userConstants.USER_UPDATE_PROFILE_SUCCESS:
      return { isLoading: true, userInfo: action.payload, isSuccess: true };
    case userConstants.USER_UPDATE_PROFILE_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userDeleteProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_DELETE_PROFILE_REQUEST:
      return { isLoading: true };
    case userConstants.USER_DELETE_PROFILE_SUCCESS:
      return { isLoading: true, isSuccess: true };
    case userConstants.USER_DELETE_PROFILE_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.USER_DELETE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.USER_CHANGE_PASSWORD_REQUEST:
      return { isLoading: true };
    case userConstants.USER_CHANGE_PASSWORD_SUCCESS:
      return {
        isLoading: true,
        message: action.payload.message,
        isSuccess: true,
      };
    case userConstants.USER_CHANGE_PASSWORD_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.USER_CHANGE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

// get all favorite movies
export const userGetFavoriteMoviesReducer = (
  state = { likedMovies: [] },
  action
) => {
  switch (action.type) {
    case userConstants.GET_FAVORITE_MOVIES_REQUEST:
      return { isLoading: true, likedMovies: [] };
    case userConstants.GET_FAVORITE_MOVIES_SUCCESS:
      return { isLoading: false, likedMovies: action.payload };
    case userConstants.GET_FAVORITE_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };

    case userConstants.DELETE_ALL_FAVORITE_MOVIES_SUCCESS:
      return { ...state, likedMovies: [] }; // Khi xóa thành công, cập nhật lại state

    case userConstants.DELETE_ALL_FAVORITE_MOVIES_RESET:
      return { ...state };

    default:
      return state;
  }
};

// delete all favorite movies
export const userDeleteAllFavoriteMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.DELETE_ALL_FAVORITE_MOVIES_REQUEST:
      return { isLoading: true };
    case userConstants.DELETE_ALL_FAVORITE_MOVIES_SUCCESS:
      return { isLoading: false, message: action.payload.message };
    case userConstants.DELETE_ALL_FAVORITE_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.DELETE_ALL_FAVORITE_MOVIES_RESET:
      return {};
    default:
      return state;
  }
};
// admin get all users

export const adminGetAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case userConstants.GET_ALL_USERS_REQUEST:
      return { isLoading: true };
    case userConstants.GET_ALL_USERS_SUCCESS:
      return { isLoading: false, users: action.payload };
    case userConstants.GET_ALL_USERS_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.GET_ALL_USERS_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const adminDeleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.DELETE_USER_REQUEST:
      return { isLoading: true };
    case userConstants.DELETE_USER_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case userConstants.DELETE_USER_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.DELETE_USER_RESET:
      return {};
    default:
      return state;
  }
};

// like movie
export const userLikeMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case userConstants.LIKE_MOVIE_REQUEST:
      return { isLoading: true };
    case userConstants.LIKE_MOVIE_SUCCESS:
      return { isLoading: false, message: action.payload.message };
    case userConstants.LIKE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case userConstants.LIKE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};
