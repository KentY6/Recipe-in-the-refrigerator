import React from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";

export const RecipesPage = () => {
  return (
    <div>
      <Link to={"/"} className="returnButton">
        <UndoRoundedIcon />
      </Link>
      <div> RecipesPage</div>
    </div>
  );
};
