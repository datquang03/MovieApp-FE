import * as userConstants from "../constant/user.constant";
import * as userAPIs from "../APIs/user.services";
import { ErrorsAction } from "../protection";

const loginAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const response = await userAPIs.loginService(data);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

const registerAction = (data) => async (dispatch) => {
  try {
    dispatch;
    ({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userAPIs.registerService(data);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};

// logout action
const logoutAction = () => async (dispatch) => {
  dispatch({ type: userConstants.USER_LOGOUT });
  dispatch({ type: userConstants.USER_LOGIN_RESET });
  dispatch({ type: userConstants.USER_REGISTER_RESET });
};
export { loginAction, registerAction, logoutAction };
