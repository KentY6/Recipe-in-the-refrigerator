import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faSquareMinus,
} from "@fortawesome/free-regular-svg-icons";

export const List = ({
  isFood,
  addFoodInRefrigerator,
  deleteFood,
  attribute,
  foodInTheRefrigerator,
}) => {
  // 冷蔵庫に入っている食材をアクティブにする機能
  const isActiveFood = (data) => {
    return (
      // state配列の初期値が空のため,、findエラー対策で確認をはさむ
      foodInTheRefrigerator &&
      foodInTheRefrigerator.find((food) => food.name === data.name)
    );
  };

  return (
    <div className="foods">
      {isFood.map((data) => (
        <div
          className={
            isActiveFood(data) !== undefined
              ? `activeFood`
              : `${attribute}NonActiveFood`
          }
          key={data.categoryId}
        >
          <div className="buttonAndName">
            <div
              // 選択した食材のデータを関数に渡す
              className={
                attribute === "foodList" ? "addButton" : "nonActiveButton"
              }
              onClick={() => addFoodInRefrigerator(data)}
            >
              <FontAwesomeIcon icon={faSquarePlus} />
            </div>
            <div className="foodName">{data.name}</div>
            <div className="deleteButton" onClick={() => deleteFood(data.name)}>
              <FontAwesomeIcon icon={faSquareMinus} />
            </div>
          </div>
          <img src={data.image} alt="" className="foodImage" />
        </div>
      ))}
    </div>
  );
};
