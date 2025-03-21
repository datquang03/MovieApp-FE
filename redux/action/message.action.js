import toast from "react-hot-toast";
import * as messageAPIs from "../APIs/message.services";
import * as messageConstants from "../constant/message.constants";
import { ErrorsAction, tokenProtection } from "../protection";

// Get message by id (giữ nguyên)
export const getMessagesByIdAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: messageConstants.GET_MESSAGES_BY_ID_REQUEST });

    // Lấy token từ state
    const token = tokenProtection(getState);

    const response = await messageAPIs.getMessagesByIdService(id, token);
    dispatch({
      type: messageConstants.GET_MESSAGES_BY_ID_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, messageConstants.GET_MESSAGES_BY_ID_FAIL);
  }
};

// Send message (sửa lại)
export const sendMessageAction =
  (receiverId, messageContent) => async (dispatch, getState) => {
    try {
      dispatch({ type: messageConstants.SEND_MESSAGE_REQUEST });

      // Lấy token từ state
      const token = tokenProtection(getState);

      const response = await messageAPIs.sendMessageService(
        receiverId,
        messageContent,
        token
      );
      dispatch({
        type: messageConstants.SEND_MESSAGE_SUCCESS,
        payload: response,
      });

      // Hiển thị thông báo thành công
      toast.success("Message sent successfully!");
    } catch (error) {
      ErrorsAction(error, dispatch, messageConstants.SEND_MESSAGE_FAIL);
    }
  };

// get message for admin
export const getAllMessagesForAdminAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: messageConstants.GET_MESSAGES_BY_ID_REQUEST_ADMIN });

      // Lấy token từ state
      const token = tokenProtection(getState);

      const response = await messageAPIs.getAllMessagesForAdminService(token);
      dispatch({
        type: messageConstants.GET_MESSAGES_BY_ID_SUCCESS_ADMIN,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(
        error,
        dispatch,
        messageConstants.GET_MESSAGES_BY_ID_FAIL_ADMIN
      );
    }
  };
