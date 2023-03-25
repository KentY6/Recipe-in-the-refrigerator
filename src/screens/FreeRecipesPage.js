import React from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { List } from "../components/List";
import { SearchBar } from "../components/SearchBar";
import { CategoryTab } from "../components/CategoryTab";

export const FreeRecipesPage = ({
  foodList,
  foodCategory,
  searchFood,
  categorySearch,
  getRecipesAPI,
  foodInFreeRecipesBox,
  setFoodInFreeRecipesBox,
  searchedFoodInFreeRecipes,
  categorizedFoodInFreeRecipes,
  selectedFreeRecipesCategory,
  setSelectedFreeRecipesCategory,
}) => {
  // フリーレシピ検索用に食材リストで選択した食材を追加する機能
  const addFoodInFreeRecipes = (data) => {
    // フリーレシピの中に入っている食材は追加されないようにする
    if (
      foodInFreeRecipesBox.find((food) => food.name === data.name) !== undefined
    )
      return;
    else setFoodInFreeRecipesBox([...foodInFreeRecipesBox, data]);
    setSelectedFreeRecipesCategory("TOP");
    // 追加した食材でAPIをたたく
    getRecipesAPI(data);
  };

  // 冷蔵庫の中の食材を削除する機能
  const deleteFoodInFreeRecipes = (name) => {
    // setFoodInTheRefrigerator(
    //   foodInTheRefrigerator.filter((food) => food.name !== name)
    // );
    // if (categorizedFoodInRefrigerator.length !== 0) {
    //   setCategorizedFoodInRefrigerator(
    //     categorizedFoodInRefrigerator.filter((food) => food.name !== name)
    //   );
    // }
    // if (searchedFoodInRefrigerator.length !== 0) {
    //   setSearchedFoodInRefrigerator(
    //     searchedFoodInRefrigerator.filter((food) => food.name !== name)
    //   );
    // }
    // if (recipesData.length > 0) {
    //   setRecipesData(recipesData.filter((food) => food.foodName !== name));
    // }
  };

  // リストに表示する食材を決める
  const whichFoodInFreeRecipes = () => {
    // 配列を作ってそこに入れるようにする
    let whichFoodArray = [];
    // カテゴリーがTOPの時
    if (selectedFreeRecipesCategory === "TOP") {
      whichFoodArray = foodList;
    }
    if (searchedFoodInFreeRecipes.length > 0) {
      whichFoodArray = searchedFoodInFreeRecipes;
    }
    if (
      categorizedFoodInFreeRecipes.length > 0 &&
      selectedFreeRecipesCategory !== "TOP"
    ) {
      whichFoodArray = categorizedFoodInFreeRecipes;
    }
    return whichFoodArray;
  };
  const whichFoodInFreeRecipesResult = whichFoodInFreeRecipes();

  return (
    <div>
      <div className="returnAndTitle">
        <Link to={"/"} className="returnButton">
          <UndoRoundedIcon fontSize="40px" />
        </Link>
        <PageTitle PageTitle={"フリーレシピ検索"} />
      </div>
      <SearchBar searchFood={searchFood} attribute={"freeRecipes"} />
      <div className="tabsBox">
        <div className="categoryTab">
          {foodCategory.map((category, index) => (
            <CategoryTab
              categorySearch={categorySearch}
              category={category}
              attribute={"freeRecipes"}
              selectedCategory={selectedFreeRecipesCategory}
              key={index}
            />
          ))}
        </div>
      </div>

      <List
        isFood={whichFoodInFreeRecipesResult}
        attribute={"freeRecipes"}
        addFood={addFoodInFreeRecipes}
        deleteFood={deleteFoodInFreeRecipes}
      />
    </div>
  );
};
