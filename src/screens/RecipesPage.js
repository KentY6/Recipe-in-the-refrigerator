import React, { useState } from "react";
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
}) => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [selectedRecipesCategory, setSelectedRecipesCategory] = useState("TOP");
  const [categorizedRecipes, setCategorizedRecipes] = useState([]);

  // ワード検索機能
  const searchFood = (searchWord, attribute) => {
    if (attribute === "recipes") {
      const filterRecipes = recipesData.filter((data) =>
        data.recipeMaterial.includes(searchWord)
      );
      setSearchedRecipes(filterRecipes);
      setSelectedRecipesCategory("TOP");
    }
    return;
  };

  // カテゴリー検索機能
  const categorySearch = (Category, attribute) => {
    if (attribute === "recipes") {
      setSearchedRecipes("");
      setSelectedRecipesCategory(Category);
      setCategorizedRecipes(
        recipesData.filter((data) => data.category === Category)
      );
    }
    return;
  };

  // リストに表示するレシピを決める
  const whichRecipeInRecipesList = () => {
    // 配列を作ってそこに入れるようにする
    let whichRecipesArray = [];
    // カテゴリーがTOPの時
    if (selectedRecipesCategory === "TOP") {
      whichRecipesArray = recipesData;
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
