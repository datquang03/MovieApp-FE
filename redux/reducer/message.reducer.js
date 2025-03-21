import * as messageConstants from "../constant/message.constants";

// Get message by id
export const getMessagesByIdReducer = (
  state = { messages: [], isLoading: false, isError: null },
  action
) => {
  switch (action.type) {
    case messageConstants.GET_MESSAGES_BY_ID_REQUEST:
      return { ...state, isLoading: true, isError: null };
    case messageConstants.GET_MESSAGES_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: action.payload.data, // Chỉ lưu mảng data vào messages
      };
    case messageConstants.GET_MESSAGES_BY_ID_FAIL:
      return { ...state, isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// Send message
export const sendMessageReducer = (
  state = { isLoading: false, isSuccess: false, isError: null },
  action
) => {
  switch (action.type) {
    case messageConstants.SEND_MESSAGE_REQUEST:
      return { ...state, isLoading: true, isSuccess: false, isError: null };
    case messageConstants.SEND_MESSAGE_SUCCESS:
      return { ...state, isLoading: false, isSuccess: true };
    case messageConstants.SEND_MESSAGE_FAIL:
      return { ...state, isLoading: false, isError: action.payload };
    case messageConstants.SEND_MESSAGE_RESET:
      return { isLoading: false, isSuccess: false, isError: null };
    default:
      return state;
  }
};

export const getMessagesByIdReducerAdmin = (
  state = { messages: [], isLoading: false, isError: null },
  action
) => {
  switch (action.type) {
    case messageConstants.GET_MESSAGES_BY_ID_REQUEST_ADMIN:
      return { ...state, isLoading: true, isError: null };
    case messageConstants.GET_MESSAGES_BY_ID_SUCCESS_ADMIN:
      return {
        ...state,
        isLoading: false,
        messages: action.payload.data, // Chỉ lưu mảng data vào messages
      };
    case messageConstants.GET_MESSAGES_BY_ID_FAIL_ADMIN:
      return { ...state, isLoading: false, isError: action.payload };
    default:
      return state;
  }
};
