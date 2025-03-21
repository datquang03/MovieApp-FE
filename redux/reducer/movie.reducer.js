import * as movieConstants from "../constant/movie.constant";

// get all movies
export const getAllMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case movieConstants.MOVIE_LIST_REQUEST:
      return { isLoading: true };
    case movieConstants.MOVIE_LIST_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload.movies,
        pages: action.payload.pages,
        page: action.payload.page,
        totalMovies: action.payload.totalMovies,
      };
    case movieConstants.MOVIE_LIST_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// get random movies
export const getRandomMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case movieConstants.MOVIES_RANDOM_REQUEST:
      return { isLoading: true };
    case movieConstants.MOVIES_RANDOM_SUCCESS:
      return { isLoading: false, movies: action.payload };
    case movieConstants.MOVIES_RANDOM_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// get movie by id
export const getMovieByIdReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case movieConstants.MOVIE_DETAILS_REQUEST:
      return { isLoading: true };
    case movieConstants.MOVIE_DETAILS_SUCCESS:
      return { isLoading: false, movie: action.payload };
    case movieConstants.MOVIE_DETAILS_FAIL:
      return { isLoading: false, isError: action.payload };
    case movieConstants.MOVIE_DETAILS_RESET:
      return { movie: {} };
    default:
      return state;
  }
};

// get top rated movies
export const getTopRatedMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case movieConstants.MOVIE_TOP_RATED_REQUEST:
      return { isLoading: true };
    case movieConstants.MOVIE_TOP_RATED_SUCCESS:
      return { isLoading: false, movies: action.payload };
    case movieConstants.MOVIE_TOP_RATED_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// create movie review
export const createMovieReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case movieConstants.MOVIE_REVIEW_REQUEST:
      return { isLoading: true };
    case movieConstants.MOVIE_REVIEW_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case movieConstants.MOVIE_REVIEW_FAIL:
      return { isLoading: false, isError: action.payload };
    case movieConstants.MOVIE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// delete movie
export const deleteMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case movieConstants.MOVIE_DELETE_REQUEST:
      return { isLoading: true };
    case movieConstants.MOVIE_DELETE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case movieConstants.MOVIE_DELETE_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// delete all movies
export const deleteAllMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case movieConstants.DELETE_ALL_MOVIES_REQUEST:
      return { isLoading: true };
    case movieConstants.DELETE_ALL_MOVIES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case movieConstants.DELETE_ALL_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// create movie
export const createMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case movieConstants.MOVIE_CREATE_REQUEST:
      return { isLoading: true };
    case movieConstants.MOVIE_CREATE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case movieConstants.MOVIE_CREATE_FAIL:
      return { isLoading: false, isError: action.payload };
    case movieConstants.MOVIE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// add casts
export const addCastReducer = (state = { casts: [] }, action) => {
  switch (action.type) {
    case movieConstants.ADD_CAST:
      return { casts: [...state.casts, action.payload] };
    case movieConstants.UPDATE_CAST: {
      const updatedCasts = state.casts.map((cast) =>
        cast.id === action.payload.id ? action.payload : cast
      );
      return { casts: updatedCasts };
    }
    case movieConstants.DELETE_CAST:
      return {
        ...state,
        casts: state.casts.filter((cast) => cast.id !== action.payload),
      };
    case movieConstants.RESET_CAST:
      return { casts: [] };
    default:
      return state;
  }
};

// update movie
export const updateMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case movieConstants.UPDATE_MOVIE_REQUEST:
      return { isLoading: true };
    case movieConstants.UPDATE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case movieConstants.UPDATE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case movieConstants.UPDATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};
