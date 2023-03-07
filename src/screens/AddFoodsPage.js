import React from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";

export const AddFoodsPage = () => {
  return (
    <div>
      <Link to={"/"} className="returnButton">
        <UndoRoundedIcon />
      </Link>
      <div>AddFoodsPage</div>
    </div>
  );
};
