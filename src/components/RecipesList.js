import React from "react";

export const RecipesList = ({ isRecipes, foodInTheRefrigerator }) => {
  // 冷蔵庫に入っている食材をフィルター用に食材名のみに分解しておく。
  const mapFoodInTheRefrigerator = foodInTheRefrigerator.map(
    (data) => data.name
  );

  return (
    <div className="recipeList">
      {isRecipes.map((data) => (
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
              {/* 冷蔵庫に入っていない食材のみを表示する */}
              {data.recipeMaterial
                .filter(
                  (material) => !mapFoodInTheRefrigerator.includes(material)
                )
                .map((data, index) => (
                  <li className="material-list" key={index}>{`${data}`}</li>
                ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
