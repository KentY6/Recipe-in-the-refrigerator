import React, { useEffect, useRef, useState } from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { auth } from "../firebase";

export const LoginForm = ({
  resetFreeRecipes,
  logInState,
  setLogInState,
  foodInTheRefrigerator,
  recipesData,
  inputUsersData,
}) => {
  const [usersData, setUsersData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // 認証機能用Ref
  const mailAddressRef = useRef();
  const passWordRef = useRef();

  // 登録するユーザー
  const user = firebase.auth().currentUser;

  // 冷蔵庫の中身を保存する機能
  const saveFoodInTheRefrigerator = () => {
    firebase
      .database()
      .ref(`${user.uid}/refrigerator`)
      .set(foodInTheRefrigerator);
  };
  // レシピデータを保存する機能
  const saveRecipesData = () => {
    firebase.database().ref(`${user.uid}/recipesData`).set(recipesData);
  };

  // サインアップ機能
  const signIn = async (e) => {
    e.preventDefault();
    const mailAddress = mailAddressRef.current.value;
    const passWord = passWordRef.current.value;

    try {
      await auth.createUserWithEmailAndPassword(mailAddress, passWord);
      setLogInState(true);
      setErrorMessage("");
    } catch (err) {
      setLogInState(false);
      console.error(err);
      setErrorMessage(
        `メールアドレスかパスワードが間違っています
        パスワードは半角英数字で6文字以上必要です`
      );
    }
  };
  // ログイン機能
  const logIn = async (e) => {
    e.preventDefault();
    const mailAddress = mailAddressRef.current.value;
    const passWord = passWordRef.current.value;

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
    try {
      await auth.currentUser.delete();
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
      saveFoodInTheRefrigerator();
      saveRecipesData();
    } catch (err) {
      console.error(err);
    }
  };

  // ユーザーデータ取得
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const getDataBasesData = await firebase
            .database()
            .ref(user.uid)
            .once(`value`);
          const dataBasesData = getDataBasesData.val();
          setUsersData(dataBasesData);
        } catch (err) {
          console.error(err);
        }
      } else {
        setUsersData([]);
      }
    });
  }, [logInState]);

  // データベースから取得したデータを親に渡す
  useEffect(() => {
    if (usersData && Object.keys(usersData).length > 0) {
      inputUsersData(usersData);
    } else return;
  }, [usersData, inputUsersData]);

  return (
    <div>
      <div className="returnAndTitle">
        <div onClick={resetFreeRecipes}>
          <Link to={"/"} className="returnButton">
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
            <input className="form" type="email" ref={mailAddressRef} />
          </div>
          <div className="authenticationForm">
            <label className="label">・パスワード</label>
            <input className="form" type="password" ref={passWordRef} />
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
            onClick={logInState === false ? (e) => signIn(e) : signOut}
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
