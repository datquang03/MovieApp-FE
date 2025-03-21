import toast from "react-hot-toast";
import * as movieAPIs from "../APIs/movie.services";
import * as movieConstants from "../constant/movie.constant";
import { ErrorsAction, tokenProtection } from "../protection";

// get all movies
export const getAllMoviesAction =
  ({
    category = "",
    language = "",
    year = "",
    time = "",
    rate = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: movieConstants.MOVIE_LIST_REQUEST });
      const response = await movieAPIs.getAllMoviesService(
        category,
        language,
        year,
        time,
        rate,
        search,
        pageNumber
      );
      dispatch({ type: movieConstants.MOVIE_LIST_SUCCESS, payload: response });
    } catch (error) {
      ErrorsAction(error, dispatch, movieConstants.MOVIE_LIST_FAIL);
    }
  };

// get random movies
export const getRandomMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: movieConstants.MOVIES_RANDOM_REQUEST });
    const response = await movieAPIs.getRandomMoviesService();
    dispatch({ type: movieConstants.MOVIES_RANDOM_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, movieConstants.MOVIES_RANDOM_FAIL);
  }
};

// get movie by id
export const getMovieByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: movieConstants.MOVIE_DETAILS_REQUEST });
    const response = await movieAPIs.getMovieByIdService(id);
    dispatch({ type: movieConstants.MOVIE_DETAILS_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, movieConstants.MOVIE_DETAILS_FAIL);
  }
};

// get top rated movies
export const getTopRatedMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: movieConstants.MOVIE_TOP_RATED_REQUEST });
    const response = await movieAPIs.getTopRatedMoviesService();
    dispatch({
      type: movieConstants.MOVIE_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, movieConstants.MOVIE_TOP_RATED_FAIL);
  }
};

// review movie action
export const reviewMovieAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: movieConstants.MOVIE_REVIEW_REQUEST });
      const response = await movieAPIs.reviewMovieService(
        tokenProtection(getState),
        id,
        review
      );
      dispatch({
        type: movieConstants.MOVIE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success("Review added successfully");
      dispatch({
        type: movieConstants.MOVIE_DETAILS_RESET,
      });
      dispatch(getMovieByIdAction(id));
    } catch (error) {
      ErrorsAction(error, dispatch, movieConstants.MOVIE_REVIEW_FAIL);
    }
  };

// delete movie
export const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: movieConstants.MOVIE_DELETE_REQUEST });
    const response = await movieAPIs.deleteMovieService(
      id,
      tokenProtection(getState)
    );
    dispatch({
      type: movieConstants.MOVIE_DELETE_SUCCESS,
      payload: response,
    });
    toast.success("Movie deleted successfully");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, movieConstants.MOVIE_DELETE_FAIL);
  }
};

// delete movies
export const deleteAllMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: movieConstants.MOVIES_DELETE_ALL_REQUEST });
    await movieAPIs.deleteAllMoviesService(tokenProtection(getState));
    dispatch({ type: movieConstants.MOVIES_DELETE_ALL_SUCCESS });
    toast.success("All movies deleted successfully");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, movieConstants.MOVIES_DELETE_ALL_FAIL);
  }
};

// create movie
export const createMovieAction = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: movieConstants.MOVIE_CREATE_REQUEST });
    const response = await movieAPIs.createMovieService(
      tokenProtection(getState),
      movie
    );
    dispatch({
      type: movieConstants.MOVIE_CREATE_SUCCESS,
      payload: response,
    });
    toast.success("Movie created successfully");
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorsAction(error, dispatch, movieConstants.MOVIE_CREATE_FAIL);
  }
};

// update movie
export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: movieConstants.MOVIE_UPDATE_REQUEST });
    const response = await movieAPIs.updateMovieService(
      tokenProtection(getState),
      id,
      movie
    );
    dispatch({
      type: movieConstants.MOVIE_UPDATE_SUCCESS,
      payload: response,
    });
    toast.success("Movie updated successfully");
    dispatch(getMovieByIdAction(id));
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorsAction(error, dispatch, movieConstants.MOVIE_UPDATE_FAIL);
  }
};
// CASTS //
// add cast
export const addCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: movieConstants.ADD_CAST, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// delete cast
export const deleteCastAction = (id) => async (dispatch, getState) => {
  dispatch({ type: movieConstants.DELETE_CAST, payload: id });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// update cast
export const updateCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: movieConstants.UPDATE_CAST, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// delete all cast
export const deleteAllCastAction = () => async (dispatch) => {
  dispatch({ type: movieConstants.RESET_CAST });
  localStorage.removeItem("casts");
};
