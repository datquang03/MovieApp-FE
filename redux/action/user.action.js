import * as userConstants from "../constant/user.constant";
import * as userAPIs from "../APIs/user.services";
import { ErrorsAction, tokenProtection } from "../protection";
import { toast } from "react-hot-toast";
export const loginAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const response = await userAPIs.loginService(data);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

export const registerAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userAPIs.registerService(data);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};

// logout action
export const logoutAction = () => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGOUT });

    localStorage.removeItem("userInfo");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGOUT);
  }
};

// update action
export const updateAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
    const response = await userAPIs.updateUserProfile(
      user,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
    toast.success("Profile update successful");
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_RESET,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

// delete action
export const deleteAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
    await userAPIs.deleteUserProfile(tokenProtection(getState));
    dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
    toast.success("Profile deleted successfully");
    dispatch(logoutAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
  }
};

export const changePasswordAction =
  (password) => async (dispatch, getState) => {
    try {
      dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
      const response = await userAPIs.changeUserPassword(
        password,
        tokenProtection(getState)
      );
      dispatch({
        type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
    }
  };

export const getFavoriteMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_FAVORITE_MOVIES_REQUEST });
    const response = await userAPIs.getFavoriteMovies(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.GET_FAVORITE_MOVIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_FAVORITE_MOVIES_FAIL);
  }
};

export const deleteAllFavoriteMoviesAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: userConstants.DELETE_ALL_FAVORITE_MOVIES_REQUEST });
      const response = await userAPIs.deleteAllFavoriteMovies(
        tokenProtection(getState)
      );
      dispatch({
        type: userConstants.DELETE_ALL_FAVORITE_MOVIES_SUCCESS,
        payload: response,
      });
      toast.success("All favorite movies deleted successfully");
    } catch (error) {
      ErrorsAction(
        error,
        dispatch,
        userConstants.DELETE_ALL_FAVORITE_MOVIES_FAIL
      );
    }
  };

// admin get all user action
export const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
    const response = await userAPIs.getAllUsersService(
      tokenProtection(getState)
    );
    dispatch({ type: userConstants.GET_ALL_USERS_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
  }
};

// admin delete user action
export const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });

    const token = tokenProtection(getState);

    const response = await userAPIs.deleteUserService(id, token);
    dispatch({
      type: userConstants.DELETE_USER_SUCCESS,
      payload: response,
    });

    toast.success("User deleted successfully");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL);
  }
};

// like movie action
export const likeMovieAction = (movieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.LIKE_MOVIE_REQUEST });
    const response = await userAPIs.likeMovieService(
      movieId,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.LIKE_MOVIE_SUCCESS,
      payload: response,
    });
    toast.success("Movie added to favorite successfully");
    dispatch(getFavoriteMoviesAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.LIKE_MOVIE_FAIL);
  }
};
