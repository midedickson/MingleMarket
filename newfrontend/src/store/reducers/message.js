import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  messages: [],
  chats: [],
  online_users: [],
};

const addMessage = (state, action) => {
  return updateObject(state, {
    messages: [...state.messages, action.message],
  });
};

const setMessages = (state, action) => {
  return updateObject(state, {
    messages: action.messages.reverse(),
  });
};

const activeUsers = (state, action) => {
  return updateObject(state, { online_users: action.payload });
};

const setChats = (state, action) => {
  return updateObject(state, {
    chats: action.chats,
  });
};

const msgReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE:
      return addMessage(state, action);
    case actionTypes.SET_MESSAGES:
      return setMessages(state, action);
    case actionTypes.GET_CHATS_SUCCESS:
      return setChats(state, action);
    case actionTypes.GET_ONLINE_USERS:
      return activeUsers(state, action);
    default:
      return state;
  }
};

export default msgReducer;
