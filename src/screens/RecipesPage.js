import React from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";

export const RecipesPage = ({ recipesData }) => {
  return (
    <div className="recipesPage">
      <div className="returnAndTitle">
        <Link to={"/"} className="returnButton">
          <UndoRoundedIcon fontSize="40px" />
        </Link>
        <PageTitle PageTitle={"レシピ一覧"} />
      </div>
      {recipesData.map((data, index) => (
        <div className="recipes" key={data.recipeId}>
          <div
            className="recipe"
            onClick={() => window.open(data.recipeUrl)}
            key={data.recipesTitle}
          >
            <div>{data.recipeTitle}</div>
            {/* <div>{data.name}</div> */}
            <img className="recipe-image" alt="" src={data.mediumImageUrl} />
            <ul className="material">
              {data.recipeMaterial.map((material, index) => (
                <li className="material-list" key={index}>{`${material}`}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
