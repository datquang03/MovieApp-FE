import { logoutAction } from "./action/user.action";

export const ErrorsAction = (error, dispatch, action) => {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === "Not authorized, token failed") {
    // we logout if token failed
    dispatch(logoutAction());
  }
  dispatch({ type: action, payload: message });
};
