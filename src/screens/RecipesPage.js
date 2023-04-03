import React, { useState } from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { RecipesList } from "../components/RecipesList";
import { SearchBar } from "../components/SearchBar";
import { CategoryTab } from "../components/CategoryTab";
import { foodCategory, testCategorySearch } from "../utils/search";

export const RecipesPage = ({
  resetFreeRecipes,
  recipesData,
  freeRecipesData,
  foodInTheRefrigerator,
  searchFood,
  categorizedFreeRecipes,
  searchedFreeRecipes,
  selectedFreeRecipesCategory,
}) => {
  // カテゴリー検索されたリスト
  const [categorizedRecipes, setCategorizedRecipes] = useState([]);
  // ワード検索されたカテゴリータブ
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  // 選択されたカテゴリータブ
  const [selectedRecipesCategory, setSelectedRecipesCategory] = useState("TOP");

  // カテゴリー検索機能
  const recipesCategorySearch = (category) => {
    setSearchedRecipes("");
    setSelectedRecipesCategory(category);
    const foodListFilter = testCategorySearch(category, recipesData);
    setCategorizedRecipes(foodListFilter);
  };

  // リストに表示するレシピを決める
  const whichRecipeInRecipesList = () => {
    // 配列を作ってそこに入れるようにする
    let whichRecipesArray = [];
    const randomRecipesArray = recipesData.sort(() => Math.random() - 0.5);
    // カテゴリーがTOPの時
    if (selectedRecipesCategory === "TOP") {
      whichRecipesArray = randomRecipesArray;
    }
    if (searchedRecipes.length > 0) {
      whichRecipesArray = searchedRecipes;
    }
    if (categorizedRecipes.length > 0 && selectedRecipesCategory !== "TOP") {
      whichRecipesArray = categorizedRecipes;
    }
    return whichRecipesArray;
  };
  const whichRecipeInRecipesListResult = whichRecipeInRecipesList();

  // リストに表示するレシピを決める
  const whichFreeRecipeInRecipesList = () => {
    // 配列を作ってそこに入れるようにする
    let whichFreeRecipesArray = [];
    // カテゴリーがTOPの時
    if (selectedFreeRecipesCategory === "TOP") {
      whichFreeRecipesArray = freeRecipesData;
    }
    if (searchedFreeRecipes.length > 0) {
      whichFreeRecipesArray = searchedFreeRecipes;
    }
    if (
      categorizedFreeRecipes.length > 0 &&
      selectedFreeRecipesCategory !== "TOP"
    ) {
      whichFreeRecipesArray = categorizedFreeRecipes;
    }
    return whichFreeRecipesArray;
  };
  const whichFreeRecipeInRecipesListResult = whichFreeRecipeInRecipesList();

  return (
    <div className="recipesPage">
      <div className="returnAndTitle">
        <div onClick={resetFreeRecipes}>
          <Link to={"/"} className="returnButton">
            <UndoRoundedIcon fontSize="40px" />
          </Link>
        </div>
        <PageTitle PageTitle={"レシピ一覧"} />
      </div>
      <div className="recipesZone">
        <div className="searchContainer"></div>
        <SearchBar
          searchFood={searchFood}
          attribute={freeRecipesData.length > 0 ? "freeRecipes" : "recipes"}
        />
        <div className="tabsBox">
          <div className="categoryTab">
            {foodCategory.map((category, index) => (
              <CategoryTab
                onClick={(category) => recipesCategorySearch(category)}
                category={category}
                attribute={
                  freeRecipesData.length > 0 ? "freeRecipes" : "recipes"
                }
                selectedCategory={
                  freeRecipesData.length > 0
                    ? selectedFreeRecipesCategory
                    : selectedRecipesCategory
                }
                key={index}
              />
            ))}
          </div>
          <div className="redText">冷蔵庫に無い食材は赤文字で表示されます</div>
        </div>

        <RecipesList
          foodInTheRefrigerator={foodInTheRefrigerator}
          isRecipes={
            freeRecipesData.length > 0
              ? whichFreeRecipeInRecipesListResult
              : whichRecipeInRecipesListResult
          }
        />
      </div>
    </div>
  );
};
