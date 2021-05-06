import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { SigninContainer } from "./signin.style";
import authAction from "redux/auth/actions";
import AuthComponent from "Component/AuthComponent";

const { login } = authAction;

export default (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const handleLogin = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      props.history.push("/admin");
    }
  });
  return (
    <SigninContainer>
      <AuthComponent
        handleSubmit={handleLogin}
        title="Sign In"
        link={{
          to: "/signup",
          desc: "Create an account",
        }}
        buttonTitle="Sign In"
      />
    </SigninContainer>
  );
};
