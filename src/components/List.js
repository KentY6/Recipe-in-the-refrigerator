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
}) => {
  return (
    <div>
      {isFood.map((data) => (
        <div className="food" key={data.categoryId}>
          <div className="buttonAndName">
            <div
              // 選択した食材のデータを関数に渡す
              className={attribute === "list" ? "addButton" : "nonActive"}
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
