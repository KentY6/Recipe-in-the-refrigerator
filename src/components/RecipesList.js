import React from "react";

export const RecipesList = ({ isRecipes, foodInTheRefrigerator }) => {
  // 冷蔵庫に入っている食材をフィルター用に食材名のみに分解しておく。
  const mapFoodInTheRefrigerator = foodInTheRefrigerator.map(
    (data) => data.name
  );

  return (
    <div className="recipesList">
      {isRecipes.map((data, index) => (
        <div
          className="recipe"
          onClick={() => window.open(data.recipeUrl)}
          key={`${data.recipeTitle}+${data.foodName}`}
        >
          <div className="imageAndOther">
            <div className="recipeImageBox">
              <img className="recipeImage" alt="" src={data.mediumImageUrl} />
            </div>
            <div className="recipeOther">
              <div className="foodTag">{data.foodName}</div>
              <div className="recipeTitle">{data.recipeTitle}</div>
              <ul className="material">
                {/* 冷蔵庫に入っていない食材のみを表示する */}
                {data.recipeMaterial
                  .filter(
                    (material) => !mapFoodInTheRefrigerator.includes(material)
                  )
                  .map((data, index, array) => (
                    <li className="materialList" key={index}>
                      {index === array.length - 1 ? data : `${data}、`}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
