import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetLoginUser } from "../Redux/Actions/usersAction";

export default function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetLoginUser());
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    alert("You are SuccessFully LogOut");
    history.push("/login");
  }, [dispatch, history]);

  return <div></div>;
}
