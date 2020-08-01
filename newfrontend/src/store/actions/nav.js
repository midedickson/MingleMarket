import * as actionTypes from "./actionTypes";

export const openAddChatPopup = () => {
  return {
    type: actionTypes.OPEN_ADD_CHAT_POPUP,
  };
};

export const closeAddChatPopup = () => {
  return {
    type: actionTypes.CLOSE_ADD_CHAT_POPUP,
  };
};

export const showAlert = (content) => {
  return {
    type: actionTypes.GET_ERRORS,
    payload: content,
  };
};
