import React from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { AuthenticationInputForm } from "../components/AuthenticationInputForm";

export const LoginForm = ({ resetFreeRecipes }) => {
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
        <AuthenticationInputForm text={"・メールアドレス"} />
        <AuthenticationInputForm text={"・パスワード"} />
      </div>
      <div className="authenticationButton">
        <button>ログイン</button>
        <button>ログアウト</button>
      </div>
    </div>
  );
};
