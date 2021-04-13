import React, { useState } from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./Reducer";
function login() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user,
        });
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://www.vectorico.com/download/social_media/Whatsapp-Icon.svg"
          alt=""
        />
        <div className="login__text">
          <h1> Sign in to whatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default login;
