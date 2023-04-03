import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { RectangleButton } from "../components/RectangleButton";
import { CategoryTab } from "../components/CategoryTab";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { List } from "../components/List";
import { foodCategory, categorySearch } from "../utils/search";

export const AddFoodsPage = ({
  resetFreeRecipes,
  foodList,
  foodInTheRefrigerator,
  setFoodInTheRefrigerator,
  getRecipesAPI,
  recipesData,
  setRecipesData,
  searchFood,
}) => {
  // カテゴリー検索されたリスト
  const [categorizedFoodInFoodList, setCategorizedFoodInFoodList] = useState(
    []
  );
  const [categorizedFoodInRefrigerator, setCategorizedFoodInRefrigerator] =
    useState([]);

  // ワード検索されたリスト
  const [searchedFoodInFoodList, setSearchedFoodInFoodList] = useState([]);
  const [searchedFoodInRefrigerator, setSearchedFoodInRefrigerator] = useState(
    []
  );

  // 選択されたカテゴリータブ
  const [selectedFoodListCategory, setSelectedFoodListCategory] =
    useState("TOP");
  const [selectedRefrigeratorCategory, setSelectedRefrigeratorCategory] =
    useState("TOP");

  // アコーディオンボタンがアクティブか否かのシグナル
  const [isActiveFoodList, setIsActiveFoodList] = useState(false);
  const [isActiveRefrigerator, setIsActiveRefrigerator] = useState(false);

  // フードリストのカテゴリー検索機能
  const foodListCategorySearch = (category) => {
    setSearchedFoodInFoodList("");
    setSelectedFoodListCategory(category);
    const foodListFilter = categorySearch(category, foodList);
    setCategorizedFoodInFoodList(foodListFilter);
  };
  // 冷蔵庫の中身のカテゴリー検索機能
  const refrigeratorCategorySearch = (category) => {
    setSearchedFoodInRefrigerator("");
    setSelectedRefrigeratorCategory(category);
    const foodListFilter = categorySearch(category, foodInTheRefrigerator);
    setCategorizedFoodInRefrigerator(foodListFilter);
  };

  // 冷蔵庫の中身に食材リストで選択した食材を追加する機能
  const addFoodInRefrigerator = (data) => {
    // 冷蔵庫の中に入っている食材は追加されないようにする
    if (
      foodInTheRefrigerator.find((food) => food.name === data.name) !==
      undefined
    )
      return;
    else setFoodInTheRefrigerator([...foodInTheRefrigerator, data]);
    setSelectedRefrigeratorCategory("TOP");
    // 追加した食材でAPIをたたく
    getRecipesAPI(data);
  };

  // 冷蔵庫の中の食材を削除する機能
  const deleteFood = (name) => {
    setFoodInTheRefrigerator(
      foodInTheRefrigerator.filter((food) => food.name !== name)
    );
    if (categorizedFoodInRefrigerator.length !== 0) {
      setCategorizedFoodInRefrigerator(
        categorizedFoodInRefrigerator.filter((food) => food.name !== name)
      );
    }
    if (searchedFoodInRefrigerator.length !== 0) {
      setSearchedFoodInRefrigerator(
        searchedFoodInRefrigerator.filter((food) => food.name !== name)
      );
    }
    if (recipesData.length > 0) {
      setRecipesData(recipesData.filter((food) => food.foodName !== name));
    }
  };

  // リストに表示する食材を決める
  const whichFoodInFoodList = () => {
    // 配列を作ってそこに入れるようにする
    let whichFoodArray = [];
    // カテゴリーがTOPの時
    if (selectedFoodListCategory === "TOP") {
      whichFoodArray = foodList;
    }
    if (searchedFoodInFoodList.length > 0) {
      whichFoodArray = searchedFoodInFoodList;
    }
    if (
      categorizedFoodInFoodList.length > 0 &&
      selectedFoodListCategory !== "TOP"
    ) {
      whichFoodArray = categorizedFoodInFoodList;
    }
    return whichFoodArray;
  };
  const whichFoodInFoodListResult = whichFoodInFoodList();

  const whichFoodInRefrigerator = () => {
    // 配列を作ってそこに入れるようにする
    let whichFoodArray = [];
    // カテゴリーがTOPの時
    if (selectedRefrigeratorCategory === "TOP") {
      whichFoodArray = foodInTheRefrigerator;
    }
    if (searchedFoodInRefrigerator.length > 0) {
      whichFoodArray = searchedFoodInRefrigerator;
    }
    if (
      categorizedFoodInRefrigerator.length > 0 &&
      selectedRefrigeratorCategory !== "TOP"
    ) {
      whichFoodArray = categorizedFoodInRefrigerator;
    }
    return whichFoodArray;
  };
  const whichFoodInRefrigeratorResult = whichFoodInRefrigerator();

  return (
    <div className="addFoodsPage">
      <div className="returnAndTitle">
        <div onClick={resetFreeRecipes}>
          <Link to={"/"} className="returnButton">
            <UndoRoundedIcon fontSize="40px" />
          </Link>
        </div>
        <PageTitle PageTitle={"冷蔵庫に食材を追加する"} />
      </div>

      {/* 食材リスト */}
      <div className="foodListContainer">
        {/* todo:RectangleButtonの名前が要リファクタリング(アセンブリのイメージで細分化)*/}
        <RectangleButton
          text={"食材リスト"}
          isActive={isActiveFoodList}
          setIsActive={setIsActiveFoodList}
          attribute={"foodList"}
        />
        <div
          className={isActiveFoodList === true ? "foodListBox" : "nonActive"}
        >
          <SearchBar searchFood={searchFood} attribute={"foodList"} />
          <div className="tabsBox">
            <div className="categoryTab">
              {foodCategory.map((category, index) => (
                <CategoryTab
                  category={category}
                  selectedCategory={selectedFoodListCategory}
                  onClick={(category) => foodListCategorySearch(category)}
                  key={index}
                />
              ))}
            </div>
          </div>

          <div className="foodList">
            <List
              isFood={whichFoodInFoodListResult}
              addFood={addFoodInRefrigerator}
              deleteFood={deleteFood}
              attribute={"foodList"}
              foodInTheRefrigerator={foodInTheRefrigerator}
            />
          </div>
        </div>
      </div>

      {/* 冷蔵庫の中身 */}
      <div className="RefrigeratorContainer">
        <RectangleButton
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
          <div className="tabsBox">
            <div className="categoryTab">
              {foodCategory.map((category, index) => (
                <CategoryTab
                  onClick={(category) => refrigeratorCategorySearch(category)}
                  category={category}
                  selectedCategory={selectedRefrigeratorCategory}
                  key={index}
                />
              ))}
            </div>
          </div>
          <List
            isFood={whichFoodInRefrigeratorResult}
            deleteFood={deleteFood}
            attribute={"refrigerator"}
          />
        </div>
      </div>

      {/* レシピ検索ボタン */}
      <div className="searchRecipe">
        <Link to={`/recipesPage`} className="link">
          <RectangleButton
            text={"冷蔵庫の中身からレシピ検索"}
            attribute={"goToRecipesPage"}
          />
        </Link>
      </div>
    </div>
  );
};
