import * as categoriesConstants from "../constant/category.constant";
import * as categoriesAPIs from "../APIs/category.services";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../protection";

// get all categories action
export const getAllCategoriesAction = () => async (dispatch) => {
  try {
    dispatch({ type: categoriesConstants.GET_ALL_CATEGORIES_REQUEST });
    const response = await categoriesAPIs.getAllCategoriesService();
    dispatch({
      type: categoriesConstants.GET_ALL_CATEGORIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, categoriesConstants.GET_ALL_CATEGORIES_FAIL);
  }
};

// create category action
export const createCategoryAction = (title) => async (dispatch, getState) => {
  try {
    dispatch({ type: categoriesConstants.CREATE_CATEGORY_REQUEST });
    await categoriesAPIs.createCategoryService(
      title,
      tokenProtection(getState)
    );
    dispatch({
      type: categoriesConstants.CREATE_CATEGORY_SUCCESS,
    });
    toast.success("Category created successfully");
  } catch (error) {
    ErrorsAction(error, dispatch, categoriesConstants.CREATE_CATEGORY_FAIL);
  }
};

// update category action
export const updateCategoryAction =
  (id, title) => async (dispatch, getState) => {
    try {
      dispatch({ type: categoriesConstants.UPDATE_CATEGORY_REQUEST });
      await categoriesAPIs.updateCategoryService(
        id,
        title,
        tokenProtection(getState)
      );
      dispatch({
        type: categoriesConstants.UPDATE_CATEGORY_SUCCESS,
      });
      toast.success("Category updated successfully");
    } catch (error) {
      ErrorsAction(error, dispatch, categoriesConstants.UPDATE_CATEGORY_FAIL);
    }
  };

// delete category action
export const deleteCategoryAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: categoriesConstants.DELETE_CATEGORY_REQUEST });
    await categoriesAPIs.deleteCategoryService(id, tokenProtection(getState));
    dispatch({
      type: categoriesConstants.DELETE_CATEGORY_SUCCESS,
    });
    toast.success("Category deleted successfully");
  } catch (error) {
    ErrorsAction(error, dispatch, categoriesConstants.DELETE_CATEGORY_FAIL);
  }
};
