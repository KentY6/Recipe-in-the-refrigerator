import React from "react";

export const Recipes = ({ recipesData }) => {
  return (
    <div className="recipeList">
      {recipesData.map((data, index) => (
        <div className="recipes" key={data.recipeId}>
          <div
            className="recipe"
            onClick={() => window.open(data.recipeUrl)}
            key={data.recipesTitle}
          >
            <div>{data.recipeTitle}</div>
            <div>{data.foodName}</div>
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
