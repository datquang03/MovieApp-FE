import * as categoryConstants from "../constant/category.constant";

// get all categories reducer
export const getAllCategoriesReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
      return { isLoading: true };
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      return { isLoading: false, categories: action.payload };
    case categoryConstants.GET_ALL_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// create category
export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoryConstants.CREATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case categoryConstants.CREATE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case categoryConstants.CREATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoryConstants.CREATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

// update category
export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoryConstants.UPDATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case categoryConstants.UPDATE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case categoryConstants.UPDATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoryConstants.UPDATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

// delete category
export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case categoryConstants.DELETE_CATEGORY_REQUEST:
      return { isLoading: true };
    case categoryConstants.DELETE_CATEGORY_SUCCESS:
      return { isLoading: true, isSuccess: true };
    case categoryConstants.DELETE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case categoryConstants.DELETE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
