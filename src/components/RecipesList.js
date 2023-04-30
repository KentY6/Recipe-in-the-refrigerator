import React from "react";

export const RecipesList = ({ isRecipes }) => {
  // 食材の数が少ない順に並べなおす処理
  const sortingRecipesData = isRecipes.sort(
    (a, b) => a.rebuildMaterial.length - b.rebuildMaterial.length
  );

  return (
    <div className="recipesList">
      {sortingRecipesData.map((data) => (
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
              <div className={`foodTag${data.foodTag}`}>{data.foodName}</div>
              <div className="recipeTitle">{data.recipeTitle}</div>
              <ul className="material">
                {/* 冷蔵庫に入っていない食材のみを表示する */}
                {data.rebuildMaterial.map((data, index, array) => (
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
