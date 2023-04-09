import React, { useState } from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { AuthenticationInputForm } from "../components/AuthenticationInputForm";
import { auth } from "../firebase";

export const LoginForm = ({ resetFreeRecipes }) => {
  const [mailAddress, setMailAddress] = useState("");
  const [passWord, setPassWord] = useState("");

  const getMailAddressText = (text) => {
    setMailAddress(text);
  };

  const getPassWordText = (text) => {
    setPassWord(text);
  };

  const signIn = () => {
    auth.createUserWithEmailAndPassword(mailAddress, passWord);
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
          text={"・メールアドレス"}
          getText={getMailAddressText}
        />
        <AuthenticationInputForm
          text={"・パスワード"}
          getText={getPassWordText}
        />
      </div>
      <div className="authenticationButton">
        <button>ログイン</button>
        <button onClick={signIn}>サインアップ</button>
      </div>
    </div>
  );
};
