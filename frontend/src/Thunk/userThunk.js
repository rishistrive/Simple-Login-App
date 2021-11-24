import { setLoginUser } from "../Redux/Actions/usersAction";
import { signupUserAction } from "../Redux/Actions/usersAction";
import UserService from "../Services/UserService";

export const signupUser = (data) => async (dispatch) => {
  try {
    const res = await UserService.signup(data);
    dispatch(signupUserAction(res.data));
  } catch (err) {
    alert(err);
  }
};

export const loginUser = (data) => async (dispatch) => {
  try {
    const res = await UserService.login(data);
    dispatch(setLoginUser(res.data));
  } catch (err) {
    alert("Incorrect Email or Password");
  }
};
