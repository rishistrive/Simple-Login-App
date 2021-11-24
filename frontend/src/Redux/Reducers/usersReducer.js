import {
  RESET_LOGIN_USER,
  SET_LOGIN_USER,
  SIGNUP_USER,
} from "../Actions";

const initialState = {
  users:[],
  token: localStorage.getItem("token"),
  username: localStorage.getItem("name"),
};

const Users = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return {
        ...state,
        users: action.payload,
      };
    case SET_LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.name,
      };
    case RESET_LOGIN_USER:
      return {
        ...state,
        token: null,
        _id: null,
        username: null,
        email: null,
        city: null,
      };
    default:
      return state;
  }
};

export default Users;
