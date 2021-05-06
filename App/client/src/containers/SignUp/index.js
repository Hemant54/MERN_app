import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SignupContainer } from "./signup.style";
import authAction from "redux/auth/actions";
import AuthComponent from "Component/AuthComponent";

const { register } = authAction;

export default (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const handleSignup = (data) => {
    dispatch(register(data));
  };

  useEffect(() => {
    if (isLoggedIn) {
      props.history.push("/admin");
    }
  });
  return (
    <SignupContainer>
      <AuthComponent
        handleSubmit={handleSignup}
        title="Sign Up"
        link={{
          to: "/signin",
          desc: "Have an account",
        }}
        buttonTitle="Sign Up"
      />
    </SignupContainer>
  );
};
