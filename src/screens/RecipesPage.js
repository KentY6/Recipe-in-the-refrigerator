import React from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { Recipes } from "../components/Recipes";

export const RecipesPage = ({ recipesData }) => {
  return (
    <div className="recipesPage">
      <div className="returnAndTitle">
        <Link to={"/"} className="returnButton">
          <UndoRoundedIcon fontSize="40px" />
        </Link>
        <PageTitle PageTitle={"レシピ一覧"} />
      </div>
      <Recipes recipesData={recipesData} />
    </div>
  );
};
