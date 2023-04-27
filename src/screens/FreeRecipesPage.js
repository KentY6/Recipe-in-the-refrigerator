import React, { useState } from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { List } from "../components/List";
import { SearchBar } from "../components/SearchBar";
import { CategoryTab } from "../components/CategoryTab";
import { FreeRecipesButton } from "../components/FreeRecipesButton";
import { foodCategory, categorySearch, searchFood } from "../utils/search";

export const FreeRecipesPage = ({
  resetFreeRecipes,
  foodList,
  getFreeRecipesAPI,
  foodInFreeRecipesBox,
  setFoodInFreeRecipesBox,
  freeRecipesData,
  setFreeRecipesData,
}) => {
  // カテゴリー検索されたリスト
  const [categorizedFoodInFreeRecipes, setCategorizedFoodInFreeRecipes] =
    useState([]);
  // ワード検索されたカテゴリータブ
  const [searchedFoodInFreeRecipes, setSearchedFoodInFreeRecipes] = useState(
    []
  );
  // 選択されたカテゴリータブ
  const [
    selectedFreeRecipesFoodsCategory,
    setSelectedFreeRecipesFoodsCategory,
  ] = useState("TOP");

  // フリーレシピ画面用食材を追加する機能
  const addFoodInFreeRecipes = (data, attribute) => {
    // フリーレシピの中に入っている食材は追加されないようにする
    if (
      foodInFreeRecipesBox.find((food) => food.name === data.name) !== undefined
    )
      return;
    else setFoodInFreeRecipesBox([...foodInFreeRecipesBox, data]);
    // 追加した食材でAPIをたたく
    getFreeRecipesAPI(data);
  };

  // 食材を削除する機能
  const deleteFoodInFreeRecipes = (name) => {
    setFoodInFreeRecipesBox(
      foodInFreeRecipesBox.filter((food) => food.name !== name)
    );
    if (freeRecipesData.length > 0) {
      setFreeRecipesData(
        freeRecipesData.filter((food) => food.foodName !== name)
      );
    }
  };

  // カテゴリー検索機能
  const foodsInFreeRecipesCategorySearch = (category) => {
    setSearchedFoodInFreeRecipes("");
    setSelectedFreeRecipesFoodsCategory(category);
    const foodListFilter = categorySearch(category, foodList);
    setCategorizedFoodInFreeRecipes(foodListFilter);
  };

  // ワード検索機能
  const freeRecipesFoodWordSearch = (searchWord) => {
    const foodListFilter = searchFood(searchWord, foodList);
    setSearchedFoodInFreeRecipes(foodListFilter);
    setSelectedFreeRecipesFoodsCategory("TOP");
  };

  // リストに表示する食材を決める
  const whichFoodInFreeRecipes = () => {
    // 配列を作ってそこに入れるようにする
    let whichFoodArray = [];
    // カテゴリーがTOPの時
    if (selectedFreeRecipesFoodsCategory === "TOP") {
      whichFoodArray = foodList;
    }
    if (searchedFoodInFreeRecipes.length > 0) {
      whichFoodArray = searchedFoodInFreeRecipes;
    }
    if (
      categorizedFoodInFreeRecipes.length > 0 &&
      selectedFreeRecipesFoodsCategory !== "TOP"
    ) {
      whichFoodArray = categorizedFoodInFreeRecipes;
    }
    return whichFoodArray;
  };
  const whichFoodInFreeRecipesResult = whichFoodInFreeRecipes();

  return (
    <div className="freeRecipesPage">
      <div className="returnAndTitle">
        <div onClick={resetFreeRecipes}>
          <Link to={"/"} className="returnButton">
            <UndoRoundedIcon fontSize="40px" />
          </Link>
        </div>
        <PageTitle PageTitle={"フリーレシピ検索"} />
      </div>
      <div className="freeRecipesZone">
        <SearchBar
          searchFood={freeRecipesFoodWordSearch}
          attribute={"freeRecipesFoods"}
        />
        <div className="tabsBox">
          <div className="categoryTab">
            {foodCategory.map((category, index) => (
              <CategoryTab
                onClick={(category) =>
                  foodsInFreeRecipesCategorySearch(category)
                }
                category={category}
                attribute={"freeRecipesFoods"}
                selectedCategory={selectedFreeRecipesFoodsCategory}
                key={index}
              />
            ))}
          </div>
          <div className="freeRecipesDescription">
            食材を複数選択してレシピを検索できます
          </div>
        </div>
        <Link to={`/recipesPage`} className="freeRecipesLink">
          <FreeRecipesButton />
        </Link>

        <List
          isFood={whichFoodInFreeRecipesResult}
          foodInFreeRecipesBox={foodInFreeRecipesBox}
          attribute={"freeRecipesFoods"}
          addFood={addFoodInFreeRecipes}
          deleteFood={deleteFoodInFreeRecipes}
        />
      </div>
    </div>
  );
};
