import React from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { RecipesList } from "../components/RecipesList";
import { SearchBar } from "../components/SearchBar";
import { CategoryTab } from "../components/CategoryTab";

export const RecipesPage = ({
  recipesData,
  foodInTheRefrigerator,
  foodCategory,
  searchFood,
  categorySearch,
  categorizedRecipes,
  searchedRecipes,
  selectedRecipesCategory,
}) => {
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

  return (
    <div className="recipesPage">
      <div className="returnAndTitle">
        <Link to={"/"} className="returnButton">
          <UndoRoundedIcon fontSize="40px" />
        </Link>
        <PageTitle PageTitle={"レシピ一覧"} />
      </div>
      <div className="recipesZone">
        <div className="searchContainer"></div>
        <SearchBar searchFood={searchFood} attribute={"recipes"} />
        <div className="tabsBox">
          <div className="categoryTab">
            {foodCategory.map((category, index) => (
              <CategoryTab
                categorySearch={categorySearch}
                category={category}
                attribute={"recipes"}
                selectedCategory={selectedRecipesCategory}
                key={index}
              />
            ))}
          </div>
          <div className="redText">冷蔵庫に無い食材は赤文字で表示されます</div>
        </div>

        <RecipesList
          recipesData={recipesData}
          foodInTheRefrigerator={foodInTheRefrigerator}
          isRecipes={whichRecipeInRecipesListResult}
        />
      </div>
    </div>
  );
};
