import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageName } from "../components/PageName";
import { AccordionButton } from "../components/AccordionButton";
import { SearchButtonLarge } from "../components/SearchButtonLarge";
import { CategoryTab } from "../components/CategoryTab";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { List } from "../components/List";

export const AddFoodsPage = ({
  foodList,
  foodInTheRefrigerator,
  setFoodInTheRefrigerator,
}) => {
  // 食材リストの選択されているカテゴリータブ
  const [categorizedFoodList, setCategorizedFoodList] = useState([]);
  const [categorizedRefrigerator, setCategorizedRefrigerator] = useState([]);
  const [searchedFoodList, setSearchedFoodList] = useState([]);

  // todo:カテゴリーは親コンポーネントで管理して子コンポーネント単体をmapする
  const foodCategory = ["TOP", "肉", "野菜", "魚", "粉物", "調味料"];

  // 冷蔵庫の中身に食材リストで選択した食材を追加する
  const addFoodInRefrigerator = (data) => {
    // 冷蔵庫の中に入っている食材は追加されないようにする
    if (
      foodInTheRefrigerator.find((food) => food.name === data.name) !==
      undefined
    )
      return;
    else setFoodInTheRefrigerator([...foodInTheRefrigerator, data]);
  };

  // 冷蔵庫の中の食材を削除する
  const deleteFood = (name) => {
    setFoodInTheRefrigerator(
      foodInTheRefrigerator.filter((food) => food.name !== name)
    );
  };

  // ワード検索機能
  const searchFood = (searchWord) => {
    const filterFoodList = foodList.filter(
      (food) => food.name.indexOf(searchWord) !== -1
    );
    setSearchedFoodList(filterFoodList);
  };

  // カテゴリー検索機能
  const categorySearch = (selectedCategory, attribute) => {
    if (attribute === "foodList") {
      setSearchedFoodList("");
      setCategorizedFoodList(
        foodList.filter((food) => food.category === selectedCategory)
      );
    } else {
      if (attribute === "refrigerator") {
        setCategorizedRefrigerator(
          foodInTheRefrigerator.filter(
            (food) => food.category === selectedCategory
          )
        );
      } else {
        return;
      }
    }
  };

  return (
    <div>
      <Link to={"/"} className="returnButton">
        <UndoRoundedIcon />
      </Link>
      <PageName pageName={"冷蔵庫に食材を追加する"} />

      {/* 食材リスト */}
      <div className="foodListContainer">
        {/* todo:AccordionButtonの名前が要リファクタリング(アセンブリのイメージで細分化)*/}
        <AccordionButton text={"食材リスト"} />
        <div className="foodListBox">
          <CategoryTab
            categorySearch={categorySearch}
            foodCategory={foodCategory}
            setCategorizedFoodList={setCategorizedFoodList}
            setSearchedFoodList={setSearchedFoodList}
            attribute={"foodList"}
          />
          <SearchBar searchFood={searchFood} />
          <div className="foodList">
            {/* todo:関数を作ってからそれを渡すのが良い(三項演算子でネストを作るのが良くない) */}
            <List
              isFood={
                searchedFoodList.length > 0
                  ? searchedFoodList
                  : categorizedFoodList.length > 0
                  ? categorizedFoodList
                  : foodList
              }
              addFoodInRefrigerator={addFoodInRefrigerator}
              deleteFood={deleteFood}
              attribute={"list"}
            />
          </div>
        </div>
      </div>

      {/* 冷蔵庫の中身 */}
      <div className="RefrigeratorContainer">
        <AccordionButton text={"冷蔵庫の中身"} />
        <div className="refrigeratorBox">
          <CategoryTab
            categorySearch={categorySearch}
            foodCategory={foodCategory}
            setCategorizedRefrigerator={setCategorizedRefrigerator}
            attribute={"refrigerator"}
          />
          <List
            isFood={
              categorizedRefrigerator.length > 0
                ? categorizedRefrigerator
                : foodInTheRefrigerator
            }
            deleteFood={deleteFood}
            attribute={"refrigerator"}
          />
        </div>
      </div>

      {/* レシピ検索ボタン */}
      <div className="searchRecipe">
        <SearchButtonLarge text={"冷蔵庫の中身からレシピ検索"} />
      </div>
    </div>
  );
};
