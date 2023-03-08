import React from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faSquareMinus,
} from "@fortawesome/free-regular-svg-icons";
import { PageName } from "../components/PageName";
import { AccordionButton } from "../components/AccordionButton";
import { SearchButtonLarge } from "../components/SearchButtonLarge";

export const AddFoodsPage = ({ foodList }) => {
  return (
    <div>
      <Link to={"/"} className="returnButton">
        <UndoRoundedIcon />
      </Link>
      <PageName pageName={"冷蔵庫に食材を追加する"} />
      <div className="foodListContainer">
        <AccordionButton text={"食材リスト"} />
        <div className="foodListBox">
          <div className="foodList">
            {foodList.map((data, index) => (
              <div className="food" key={index}>
                <div className="buttonAndName">
                  <FontAwesomeIcon icon={faSquarePlus} />
                  <div className="foodName">{data.name}</div>
                  <FontAwesomeIcon icon={faSquareMinus} />
                </div>
                <img src={data.image} alt="" className="foodImage" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="inTheRefrigerator"></div>
      <AccordionButton text={"冷蔵庫の中身"} />
      <div className="searchRecipe">
        <SearchButtonLarge text={"冷蔵庫の中身からレシピ検索"} />
      </div>
    </div>
  );
};
