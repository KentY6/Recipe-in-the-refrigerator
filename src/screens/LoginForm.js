import React from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  return (
    <div>
      <Link to={"/"} className="returnButton">
        <UndoRoundedIcon />
      </Link>
      <div>LoginForm</div>
    </div>
  );
};
