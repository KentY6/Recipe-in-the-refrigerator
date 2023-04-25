import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faSquareMinus,
} from "@fortawesome/free-regular-svg-icons";

export const List = ({
  isFood,
  addFood,
  deleteFood,
  attribute,
  foodInTheRefrigerator,
  foodInFreeRecipesBox,
}) => {
  // 冷蔵庫に入っている食材をアクティブにする機能
  const isActiveFood = (data) => {
    if (attribute !== "freeRecipesFoods") {
      return (
        // state配列の初期値が空のため,、findエラー対策で確認をはさむ
        foodInTheRefrigerator &&
        foodInTheRefrigerator.find((food) => food.name === data.name)
      );
    }
    if (attribute === "freeRecipesFoods") {
      return (
        foodInFreeRecipesBox &&
        foodInFreeRecipesBox.find((food) => food.name === data.name)
      );
    }
  };

  return (
    <div>
      {isFood.length === 0 ? (
        <div></div>
      ) : (
        <div className="foods">
          {isFood.map((data) => (
            <div
              className={
                isActiveFood(data) !== undefined
                  ? `activeFood`
                  : `${attribute}NonActiveFood`
              }
              key={data.name}
            >
              <div className="buttonAndName">
                <div
                  // 選択した食材のデータを関数に渡す
                  className={
                    attribute === "refrigerator"
                      ? "nonActiveButton"
                      : "addButton"
                  }
                  onClick={() => addFood(data)}
                >
                  <FontAwesomeIcon icon={faSquarePlus} />
                </div>
                <div className="foodName">{data.name}</div>
                <div
                  className="deleteButton"
                  onClick={() => deleteFood(data.name)}
                >
                  <FontAwesomeIcon icon={faSquareMinus} />
                </div>
              </div>
              <img src={data.image} alt="" className="foodImage" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
