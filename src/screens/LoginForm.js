import React, { useEffect, useState } from "react";
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

  // ヴァリデーション設定
  const getErrorMessage = () => {
    let message = "";
    if (
      mailAddress.length > 0 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailAddress)
    ) {
      message = `メールアドレスが正しい形式で
      入力されていません`;
    }
    if (passWord.length > 0 && passWord.length < 6) {
      message = "パスワードは6文字以上入力してください";
    }
    if (
      (mailAddress.length > 0 && !/^[!-~]+$/.test(mailAddress)) ||
      (passWord.length > 0 && !/^[!-~]+$/.test(passWord))
    ) {
      message = "半角英数字で記載してください";
    }
    return setErrorMessage(message);
  };

  useEffect(() => {
    getErrorMessage();
  }, [mailAddress, passWord]);

  // サインアップ機能
  const signUp = async (e) => {
    e.preventDefault();

    if (errorMessage === "") {
      try {
        await auth.createUserWithEmailAndPassword(mailAddress, passWord);
        setLogInState(true);
        setErrorMessage("");
        navigate("/onboardingPage");
      } catch (err) {
        setLogInState(false);
        console.log(err);
        setErrorMessage(
          `メールアドレス・パスワードが間違っている、
          もしくは既に登録済みのユーザーです`
        );
      }
    }
  };
  // ログイン機能
  const logIn = async (e) => {
    e.preventDefault();
    if (errorMessage === "") {
      try {
        await auth.signInWithEmailAndPassword(mailAddress, passWord);
        setLogInState(true);
        setErrorMessage("");
      } catch (err) {
        setLogInState(false);
        console.error(err);
        setErrorMessage(
          `メールアドレス・パスワードが間違っている、
          もしくはユーザーが登録されていません`
        );
      }
    }
  };
  // サインアウト機能
  const signOut = async () => {
    const user = firebase.auth().currentUser;
    try {
      // データベースのデータ削除
      navigate("/");
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
    <div className="logInFormPage">
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
      <form className={logInState === true ? "loggedForm" : "logInForm"}>
        <div
          className={logInState === false ? "loginFormContainer" : "nonActive"}
        >
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

        {/* エラーメッセージ */}
        <div className={errorMessage === "" ? "nonActive" : "errorMessage"}>
          {errorMessage}
        </div>

        <div
          className={logInState === true ? "loggedSubmitArea" : "submitArea"}
        >
          <button
            className={"authenticationButton"}
            onClick={logInState === false ? (e) => logIn(e) : logOut}
          >
            {logInState === false ? "ログイン" : "ログアウト"}
          </button>
          <button
            className={"authenticationButton"}
            onClick={logInState === false ? (e) => signUp(e) : signOut}
          >
            {logInState === false ? "アカウント登録" : "アカウント削除"}
          </button>
        </div>
        <div className="tutorial">
          <Link to={"/onboardingPage"}>アプリの使い方</Link>
        </div>
      </form>
    </div>
  );
};
