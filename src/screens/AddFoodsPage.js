import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageName } from "../components/PageName";
import { AccordionButton } from "../components/AccordionButton";
import { CategoryTab } from "../components/CategoryTab";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { List } from "../components/List";

export const AddFoodsPage = ({
  foodList,
  foodInTheRefrigerator,
  setFoodInTheRefrigerator,
}) => {
  // 選択されているカテゴリータブで検索されたリスト
  const [categorizedFoodList, setCategorizedFoodList] = useState([]);
  const [categorizedRefrigerator, setCategorizedRefrigerator] = useState([]);
  const [selectedFoodListCategory, setSelectedFoodListCategory] =
    useState("TOP");
  const [selectedRefrigeratorCategory, setSelectedRefrigeratorCategory] =
    useState("TOP");

  // 検索されたリスト
  const [searchedFoodList, setSearchedFoodList] = useState([]);
  const [searchedRefrigerator, setSearchedRefrigerator] = useState([]);

  // アコーディオンボタンがアクティブか否かのシグナル
  const [isActiveFoodList, setIsActiveFoodList] = useState(false);
  const [isActiveRefrigerator, setIsActiveRefrigerator] = useState(false);

  // todo:カテゴリーは親コンポーネントで管理して子コンポーネント単体をmapする
  const foodCategory = ["TOP", "肉", "野菜", "魚", "粉物", "調味料"];

  // 冷蔵庫の中身に食材リストで選択した食材を追加する機能
  const addFoodInRefrigerator = (data) => {
    // 冷蔵庫の中に入っている食材は追加されないようにする
    if (
      foodInTheRefrigerator.find((food) => food.name === data.name) !==
      undefined
    )
      return;
    else setFoodInTheRefrigerator([...foodInTheRefrigerator, data]);
  };

  // 冷蔵庫の中の食材を削除する機能
  const deleteFood = (name) => {
    setFoodInTheRefrigerator(
      foodInTheRefrigerator.filter((food) => food.name !== name)
    );
    if (categorizedRefrigerator.length !== 0) {
      setCategorizedRefrigerator(
        categorizedRefrigerator.filter((food) => food.name !== name)
      );
    }
    if (searchedRefrigerator.length !== 0) {
      setSearchedRefrigerator(
        searchedRefrigerator.filter((food) => food.name !== name)
      );
    }
  };

  // ワード検索機能
  const searchFood = (searchWord, attribute) => {
    if (attribute === "foodList") {
      const filterFoodList = foodList.filter(
        (food) => food.name.indexOf(searchWord) !== -1
      );
      setSearchedFoodList(filterFoodList);
    } else {
      if (attribute === "refrigerator") {
        const filterRefrigerator = foodInTheRefrigerator.filter(
          (food) => food.name.indexOf(searchWord) !== -1
        );
        setSearchedRefrigerator(filterRefrigerator);
      }
    }
  };

  // カテゴリー検索機能
  const categorySearch = (Category, attribute) => {
    if (attribute === "foodList") {
      setSearchedFoodList("");
      setSelectedFoodListCategory(Category);
      setCategorizedFoodList(
        foodList.filter((food) => food.category === Category)
      );
    } else {
      if (attribute === "refrigerator") {
        setSearchedRefrigerator("");
        setSelectedRefrigeratorCategory(Category);
        setCategorizedRefrigerator(
          foodInTheRefrigerator.filter((food) => food.category === Category)
        );
      } else {
        return;
      }
    }
  };

  // リストに表示する食材を決める
  const inFoodList = () => {
    if (searchedFoodList.length > 0) {
      return searchedFoodList;
    } else {
      if (categorizedFoodList.length > 0) {
        return categorizedFoodList;
      } else {
        return foodList;
      }
    }
  };
  const isFoodList = inFoodList();

  const inRefrigerator = () => {
    if (searchedRefrigerator.length > 0) {
      return searchedRefrigerator;
    } else {
      if (categorizedRefrigerator.length > 0) {
        return categorizedRefrigerator;
      } else {
        if (selectedRefrigeratorCategory === "TOP") {
          return foodInTheRefrigerator;
        } else {
          if (
            selectedRefrigeratorCategory !== "TOP" &&
            foodInTheRefrigerator.length === 0
          ) {
            return foodInTheRefrigerator;
          } else {
            if (
              selectedRefrigeratorCategory !== "TOP" &&
              categorizedRefrigerator.length === 0
            ) {
              return "notFound";
            } else {
              if (
                selectedRefrigeratorCategory !== "TOP" &&
                searchedRefrigerator.length === 0
              ) {
                return "notFound";
              }
            }
          }
        }
      }
    }
  };
  const isRefrigerator = inRefrigerator();

  return (
    <div>
      <div className="returnAndTitle">
        <Link to={"/"} className="returnButton">
          <UndoRoundedIcon fontSize="40px" />
        </Link>
        <PageName pageName={"冷蔵庫に食材を追加する"} />
      </div>

      {/* 食材リスト */}
      <div className="foodListContainer">
        {/* todo:AccordionButtonの名前が要リファクタリング(アセンブリのイメージで細分化)*/}
        <AccordionButton
          text={"食材リスト"}
          isActive={isActiveFoodList}
          setIsActive={setIsActiveFoodList}
          attribute={"foodList"}
        />
        <div
          className={isActiveFoodList === true ? "foodListBox" : "nonActive"}
        >
          <SearchBar searchFood={searchFood} attribute={"foodList"} />
          <CategoryTab
            categorySearch={categorySearch}
            foodCategory={foodCategory}
            setCategorizedFoodList={setCategorizedFoodList}
            setSearchedFoodList={setSearchedFoodList}
            attribute={"foodList"}
            selectedCategory={selectedFoodListCategory}
          />
          <div className="foodList">
            <List
              isFood={isFoodList}
              addFoodInRefrigerator={addFoodInRefrigerator}
              deleteFood={deleteFood}
              attribute={"foodList"}
              foodInTheRefrigerator={foodInTheRefrigerator}
            />
          </div>
        </div>
      </div>

      {/* 冷蔵庫の中身 */}
      <div className="RefrigeratorContainer">
        <AccordionButton
          text={"冷蔵庫の中身"}
          isActive={isActiveRefrigerator}
          setIsActive={setIsActiveRefrigerator}
          attribute={"refrigerator"}
        />
        <div
          className={
            isActiveRefrigerator === true ? "refrigeratorBox" : "nonActive"
          }
        >
          <SearchBar searchFood={searchFood} attribute={"refrigerator"} />
          <CategoryTab
            categorySearch={categorySearch}
            foodCategory={foodCategory}
            setCategorizedRefrigerator={setCategorizedRefrigerator}
            attribute={"refrigerator"}
            selectedCategory={selectedRefrigeratorCategory}
          />
          <List
            isFood={isRefrigerator}
            deleteFood={deleteFood}
            attribute={"refrigerator"}
          />
        </div>
      </div>

      {/* レシピ検索ボタン */}
      <div className="searchRecipe">
        <Link to={`/recipesPage`} className="link">
          <AccordionButton
            text={"冷蔵庫の中身からレシピ検索"}
            attribute={"goToRecipesPage"}
          />
        </Link>
      </div>
    </div>
  );
};
