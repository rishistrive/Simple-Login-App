import { RESET_LOGIN_USER, SET_LOGIN_USER, SIGNUP_USER } from ".";

export const signupUserAction = (data) => ({
  type: SIGNUP_USER,
  payload: data,
});

export const resetLoginUser = () => ({
  type: RESET_LOGIN_USER,
});

export const setLoginUser = (payload) => {
  localStorage.setItem("token", payload.token);
  localStorage.setItem("name", payload.name);
  return { type: SET_LOGIN_USER, payload };
};
