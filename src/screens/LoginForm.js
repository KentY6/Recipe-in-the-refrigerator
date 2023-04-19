import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { db } from "../firebase";

export const LoginForm = ({ resetFreeRecipes, logInState, setLogInState }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [mailAddress, setMailAddress] = useState("");
  const [passWord, setPassWord] = useState("");

  const navigate = useNavigate();

  // サインアップ機能
  const signUp = async (e) => {
    e.preventDefault();

    try {
      await auth.createUserWithEmailAndPassword(mailAddress, passWord);
      setLogInState(true);
      setErrorMessage("");
    } catch (err) {
      setLogInState(false);
      console.log(err);
      setErrorMessage(
        `メールアドレスかパスワードが間違っています
        パスワードは半角英数字で6文字以上必要です`
      );
    }
  };
  // ログイン機能
  const logIn = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(mailAddress, passWord);
      setLogInState(true);
      setErrorMessage("");
    } catch (err) {
      setLogInState(false);
      console.error(err);
      setErrorMessage(`メールアドレスかパスワードが間違っています
      パスワードは半角英数字で6文字以上必要です`);
    }
  };
  // サインアウト機能
  const signOut = async () => {
    const user = firebase.auth().currentUser;
    try {
      // データベースのデータ削除
      await db
        .collection(`users`)
        .doc(user.uid)
        .collection(`refrigerator`)
        .doc(`refrigerator`)
        .delete();
      await db
        .collection(`users`)
        .doc(user.uid)
        .collection(`recipesData`)
        .doc(`recipesData`)
        .delete();
      await db.collection(`users`).doc(user.uid).delete();
      await user.delete();
      setLogInState(false);
    } catch (err) {
      console.error(err);
    }
    navigate("/");
  };
  // ログアウト機能
  const logOut = () => {
    try {
      auth.signOut();
      setLogInState(false);
    } catch (err) {
      console.error(err);
    }
    navigate("/");
  };

  return (
    <div>
      <div className="returnAndTitle">
        <div onClick={resetFreeRecipes}>
          <Link
            to={"/"}
            className={logInState === true ? "returnButton" : "nonActive"}
          >
            <UndoRoundedIcon fontSize="40px" />
          </Link>
        </div>
        <PageTitle
          PageTitle={logInState === false ? "ログイン" : "ログアウト"}
        />
      </div>
      <form>
        <div className={logInState === false ? "loginForm" : "nonActive"}>
          <div className="authenticationForm">
            <label className="label">・メールアドレス</label>
            <input
              className="form"
              type="email"
              onChange={(e) => setMailAddress(e.target.value)}
            />
          </div>
          <div className="authenticationForm">
            <label className="label">・パスワード</label>
            <input
              className="form"
              type="password"
              onChange={(e) => setPassWord(e.target.value)}
            />
          </div>
        </div>
        <div className={logInState === false ? "nonActive" : "loggedText"}>
          ログイン状態です
        </div>
        <div
          className={
            logInState === false
              ? "authenticationButtons"
              : "loggedInStateButtons"
          }
        >
          <button
            className={
              logInState === false
                ? "authenticationButton"
                : "loggedInStateButton"
            }
            onClick={logInState === false ? (e) => logIn(e) : logOut}
          >
            {logInState === false ? "ログイン" : "ログアウト"}
          </button>
          <button
            className={
              logInState === false
                ? "authenticationButton"
                : "loggedInStateButton"
            }
            onClick={logInState === false ? (e) => signUp(e) : signOut}
          >
            {logInState === false ? "サインアップ" : "サインアウト"}
          </button>
        </div>
      </form>
      <div className={errorMessage === "" ? "nonActive" : "errorMessage"}>
        {errorMessage}
      </div>
    </div>
  );
};
