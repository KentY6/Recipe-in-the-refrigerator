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

export const AddFoodsPage = ({
  foodList,
  foodInTheRefrigerator,
  setFoodInTheRefrigerator,
}) => {
  // 冷蔵庫の中身に食材リストで選択した食材を追加する
  const addFoodInRefrigerator = (data) => {
    setFoodInTheRefrigerator([...foodInTheRefrigerator, data]);
  };

  return (
    <div>
      <Link to={"/"} className="returnButton">
        <UndoRoundedIcon />
      </Link>
      <PageName pageName={"冷蔵庫に食材を追加する"} />

      {/* 食材リスト */}
      <div className="foodListContainer">
        <AccordionButton text={"食材リスト"} />
        <div className="foodListBox">
          <div className="foodList">
            {foodList.map((data) => (
              <div className="food" key={data.categoryId}>
                <div className="buttonAndName">
                  <div
                    // 選択した食材のデータを関数に渡す
                    className="addButton"
                    onClick={() => addFoodInRefrigerator(data)}
                  >
                    <FontAwesomeIcon icon={faSquarePlus} />
                  </div>
                  <div className="foodName">{data.name}</div>
                  <div className="deleteButton">
                    <FontAwesomeIcon icon={faSquareMinus} />
                  </div>
                </div>
                <img src={data.image} alt="" className="foodImage" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 冷蔵庫の中身 */}
      <div className="RefrigeratorContainer">
        <AccordionButton text={"冷蔵庫の中身"} />
        <div className="refrigeratorBox">
          <div className="foodInTheRefrigerator">
            {foodInTheRefrigerator.map((data) => (
              <div key={data.categoryId}>
                <div className="buttonAndName">
                  <div>{data.name}</div>
                  <div className="deleteButton">
                    <FontAwesomeIcon icon={faSquareMinus} />
                  </div>
                </div>
                <img src={data.image} alt="" className="foodImage" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* レシピ検索ボタン */}
      <div className="searchRecipe">
        <SearchButtonLarge text={"冷蔵庫の中身からレシピ検索"} />
      </div>
    </div>
  );
};
