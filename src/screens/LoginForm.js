import React, { useState } from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { AuthenticationInputForm } from "../components/AuthenticationInputForm";
import { auth } from "../firebase";

export const LoginForm = ({ resetFreeRecipes, logInState, setLogInState }) => {
  const [mailAddress, setMailAddress] = useState("");
  const [passWord, setPassWord] = useState("");

  const getMailAddressText = (text) => {
    setMailAddress(text);
  };

  const getPassWordText = (text) => {
    setPassWord(text);
  };

  // サインアップ機能
  const signIn = async () => {
    try {
      await auth.createUserWithEmailAndPassword(mailAddress, passWord);
      setLogInState(true);
    } catch (err) {
      setLogInState(false);
      console.log(err);
    }
  };
  // ログイン機能
  const logIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(mailAddress, passWord);
      setLogInState(true);
    } catch (err) {
      setLogInState(false);
      console.log(err);
    }
  };
  // サインアウト機能
  const signOut = async () => {
    try {
      await auth.currentUser.delete();
      setLogInState(false);
    } catch (err) {
      console.log(err);
    }
  };
  // ログアウト機能
  const logOut = async () => {
    try {
      await auth.signOut();
      setLogInState(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="returnAndTitle">
        <div onClick={resetFreeRecipes}>
          <Link to={"/"} className="returnButton">
            <UndoRoundedIcon fontSize="40px" />
          </Link>
        </div>
        <PageTitle PageTitle={"ログイン"} />
      </div>
      <div className="loginForm">
        <AuthenticationInputForm
          type={"text"}
          text={"・メールアドレス"}
          getText={getMailAddressText}
        />
        <AuthenticationInputForm
          type={"password"}
          text={"・パスワード"}
          getText={getPassWordText}
        />
      </div>
      <div className="authenticationButton">
        <button onClick={logInState === false ? logIn : logOut}>
          {logInState === false ? "ログイン" : "ログアウト"}
        </button>
        <button onClick={logInState === false ? signIn : signOut}>
          {logInState === false ? "サインアップ" : "サインアウト"}
        </button>
      </div>
    </div>
  );
};
