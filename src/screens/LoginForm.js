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
  const [whatAuth, setWhatAuth] = useState("ログイン");

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

  // 選択ウィンドウ表示
  const signUpOrSignOut = (e, sign) => {
    e.preventDefault();
    let windowText = "";
    let executeFunction = "";
    if (sign === signUp) {
      windowText = "アカウントを登録しますか？";
    } else {
      windowText = "アカウントを削除しますか？";
    }
    if (sign === signUp) {
      executeFunction = signUp;
    } else {
      executeFunction = signOut;
    }
    const choice = window.confirm(windowText);
    if (choice) {
      executeFunction();
    } else {
      console.log("キャンセルされました");
    }
  };

  // アカウント登録画面にする
  const accountRegistration = () => {
    setWhatAuth("アカウント登録");
    setMailAddress("");
    setPassWord("");
  };

  // サインアップ機能
  const signUp = async () => {
    if (errorMessage === "") {
      try {
        await auth.createUserWithEmailAndPassword(mailAddress, passWord);
        authPersistence();
        setWhatAuth("ログアウト");
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
        authPersistence();
        setWhatAuth("ログアウト");
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
      window.alert("アカウントを削除しました");
    } catch (err) {
      console.error(err);
      window.alert("一度ログインし直して再度実行してください");
    }
  };

  // ログアウト機能
  const logOut = (e) => {
    e.preventDefault();
    try {
      auth.signOut();
      setLogInState(false);
    } catch (err) {
      console.error(err);
    }
    navigate("/");
  };

  // ログイン永続化処理
  const authPersistence = () => {
    try {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    } catch (err) {
      console.error(err);
    }
  };

  // どの認証設定をするか決める
  const getAuthFunction = () => {
    let whichAuthFunction = "";
    if (whatAuth === "ログイン") {
      whichAuthFunction = logIn;
    }
    if (whatAuth === "ログアウト") {
      whichAuthFunction = logOut;
    }
    if (whatAuth === "アカウント登録") {
      whichAuthFunction = signUpOrSignOut;
    }
    return whichAuthFunction;
  };
  const getAuthFunctionResult = getAuthFunction();

  // ログイン画面に戻る
  const resetAuthState = () => {
    setWhatAuth("ログイン");
    setMailAddress("");
    setPassWord("");
  };

  // ログイン状態で認証画面を管理する
  useEffect(() => {
    if (logInState === true) {
      setWhatAuth("ログアウト");
    }
    if (logInState === false && whatAuth === "ログアウト") {
      setWhatAuth("ログイン");
    }
  }, [logInState]);

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
        <PageTitle PageTitle={whatAuth} />
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
              value={mailAddress}
              onChange={(e) => setMailAddress(e.target.value)}
            />
          </div>
          <div className="authenticationForm">
            <label className="label">・パスワード</label>
            <input
              className="form"
              type="password"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
            />
          </div>
        </div>
        <div className={logInState === false ? "nonActive" : "loggedText"}>
          ログイン状態です
        </div>

        <div
          className={
            whatAuth === "アカウント登録"
              ? "registrationDescription"
              : "nonActive"
          }
        >
          {`メールアドレスとパスワードを入力して
          アカウントを登録してください`}
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
            onClick={(e) => getAuthFunctionResult(e, signUp)}
          >
            {whatAuth}
          </button>
          <div
            className={
              whatAuth === "ログイン" ? "authenticationText" : "nonActive"
            }
            onClick={accountRegistration}
          >
            アカウント登録
          </div>
          <div
            className={
              whatAuth === "ログアウト" ? "authenticationText" : "nonActive"
            }
            onClick={(e) => signUpOrSignOut(e, signOut)}
          >
            アカウント削除
          </div>
          <div
            className={whatAuth === "アカウント登録" ? "backText" : "nonActive"}
            onClick={resetAuthState}
          >
            戻る
          </div>
        </div>
        <div className="tutorial">
          <Link to={"/onboardingPage"}>アプリの使い方</Link>
        </div>
      </form>
    </div>
  );
};
