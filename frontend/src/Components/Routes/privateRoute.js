import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector((state) => state.Users.token);
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...rest} {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
