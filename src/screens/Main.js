import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddFoodsPage } from "./AddFoodsPage";
import { FreeRecipesPage } from "./FreeRecipesPage";
import { LoginForm } from "./LoginForm";
import { MenuPage } from "./MenuPage";
import { RecipesPage } from "./RecipesPage";
import { foodCategory } from "../utils/search";

export const Main = () => {
  const foodList = [
    {
      name: "豚バラ肉",
      category: "肉",
      categoryId: `${10}-${276}-${830}`,
      image: "/image/豚バラ肉.jpeg",
    },
    {
      name: "豚ロース肉",
      category: "肉",
      categoryId: `${10}-${276}-${1485}`,
      image: "/image/豚ロース肉.jpeg",
    },
    {
      name: "豚ひき肉",
      category: "肉",
      categoryId: `${10}-${278}-${836}`,
      image: "/image/豚ひき肉.jpeg",
    },
    {
      name: "牛バラ肉",
      category: "肉",
      categoryId: `${10}-${275}-${2134}`,
      image: "/image/牛バラ肉.jpeg",
    },
    {
      name: "牛小間肉",
      category: "肉",
      categoryId: `${10}-${275}-${2135}`,
      image: "/image/牛小間肉.jpeg",
    },
    {
      name: "牛ひき肉",
      category: "肉",
      categoryId: `${10}-${278}-${835}`,
      image: "/image/牛ひき肉.jpeg",
    },
    {
      name: "キャベツ",
      category: "野菜",
      categoryId: `${12}-${98}-${1}`,
      image: "/image/キャベツ.jpeg",
    },
    {
      name: "レタス",
      category: "野菜",
      categoryId: `${12}-${100}-${2}`,
      image: "/image/レタス.jpeg",
    },
    {
      name: "サーモン",
      category: "魚",
      categoryId: `${11}-${70}-${839}`,
      image: "/image/サーモン.jpeg",
    },
    {
      name: "うどん",
      category: "粉物",
      categoryId: `${16}-${152}-${1336}`,
      image: "/image/うどん.jpeg",
    },
    {
      name: "塩",
      category: "調味料",
      categoryId: `${13}-${484}-${1657}`,
      image: "/image/塩.jpeg",
    },
  ];

  // 冷蔵庫の中身
  const [foodInTheRefrigerator, setFoodInTheRefrigerator] = useState([]);
  // フリーレシピ検索用食材
  const [foodInFreeRecipesBox, setFoodInFreeRecipesBox] = useState([]);

  // 取得したレシピAPI
  const [recipesData, setRecipesData] = useState([]);
  const [freeRecipesData, setFreeRecipesData] = useState([]);

  // APIキー
  const appID = process.env.REACT_APP_Application_ID;

  // API取得
  const getRecipesAPI = (food) => {
    axios
      .get(
        `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${appID}&categoryId=${food.categoryId}`
      )

      .then((res) => {
        const apiData = res.data.result;

        // 取得したAPIのオブジェクトにAPI取得に使用した食材を項目として追加する
        const mapApiData = apiData.map((source) => ({
          ...source,
          foodName: food.name,
          category: food.category,
        }));
        setRecipesData([...recipesData, ...mapApiData]);
      })

      .catch((err) => console.log(err));
  };

  // フリーレシピ用API取得
  const getFreeRecipesAPI = (food) => {
    axios
      .get(
        `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${appID}&categoryId=${food.categoryId}`
      )

      .then((res) => {
        const apiData = res.data.result;

        // 取得したAPIのオブジェクトにAPI取得に使用した食材を項目として追加する
        const mapApiData = apiData.map((source) => ({
          ...source,
          foodName: food.name,
          category: food.category,
        }));
        setFreeRecipesData([...freeRecipesData, ...mapApiData]);
      })

      .catch((err) => console.log(err));
  };

  // フリーレシピ検索用のState・レシピ一覧のカテゴリータブをリセットする
  const resetFreeRecipes = () => {
    if (foodInFreeRecipesBox.length > 0) {
      setFoodInFreeRecipesBox([]);
    }
    if (freeRecipesData.length > 0) {
      setFreeRecipesData([]);
    }
  };

  // ワード検索機能
  const searchFood = (searchWord, attribute) => {
    // if (attribute === "foodList") {
    //   const filterFoodList = foodList.filter((food) =>
    //     food.name.includes(searchWord)
    //   );
    //   setSearchedFoodInFoodList(filterFoodList);
    //   setSelectedFoodListCategory("TOP");
    // }
    // if (attribute === "refrigerator") {
    //   const filterRefrigerator = foodInTheRefrigerator.filter((food) =>
    //     food.name.includes(searchWord)
    //   );
    //   setSearchedFoodInRefrigerator(filterRefrigerator);
    //   setSelectedRefrigeratorCategory("TOP");
    // }
    // if (attribute === "recipes") {
    //   const filterRecipes = recipesData.filter((data) =>
    //     data.recipeMaterial.includes(searchWord)
    //   );
    //   setSearchedRecipes(filterRecipes);
    //   setSelectedRecipesCategory("TOP");
    // }
    // if (attribute === "freeRecipesFoods") {
    //   const filterFreeRecipesFoods = foodList.filter((food) =>
    //     food.name.includes(searchWord)
    //   );
    //   setSearchedFoodInFreeRecipes(filterFreeRecipesFoods);
    //   setSelectedFreeRecipesFoodsCategory("TOP");
    // }
    // if (attribute === "freeRecipes") {
    //   const filterFreeRecipes = freeRecipesData.filter((data) =>
    //     data.recipeMaterial.includes(searchWord)
    //   );
    //   setSearchedFreeRecipes(filterFreeRecipes);
    //   setSelectedFreeRecipesCategory("TOP");
    // }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MenuPage />} />
        <Route
          path={"/recipesPage"}
          element={
            <RecipesPage
              resetFreeRecipes={resetFreeRecipes}
              recipesData={recipesData}
              freeRecipesData={freeRecipesData}
              foodInTheRefrigerator={foodInTheRefrigerator}
              foodCategory={foodCategory}
              searchFood={searchFood}
            />
          }
        />
        <Route
          path={"/addFoodsPage"}
          element={
            <AddFoodsPage
              resetFreeRecipes={resetFreeRecipes}
              foodList={foodList}
              foodInTheRefrigerator={foodInTheRefrigerator}
              setFoodInTheRefrigerator={setFoodInTheRefrigerator}
              getRecipesAPI={getRecipesAPI}
              recipesData={recipesData}
              setRecipesData={setRecipesData}
              searchFood={searchFood}
            />
          }
        />
        <Route path={"/loginForm"} element={<LoginForm />} />
        <Route
          path={"/freeRecipesPage"}
          element={
            <FreeRecipesPage
              resetFreeRecipes={resetFreeRecipes}
              foodList={foodList}
              foodCategory={foodCategory}
              searchFood={searchFood}
              getFreeRecipesAPI={getFreeRecipesAPI}
              freeRecipesData={freeRecipesData}
              setFreeRecipesData={setFreeRecipesData}
              foodInFreeRecipesBox={foodInFreeRecipesBox}
              setFoodInFreeRecipesBox={setFoodInFreeRecipesBox}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
