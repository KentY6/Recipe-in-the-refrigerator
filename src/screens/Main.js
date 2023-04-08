import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddFoodsPage } from "./AddFoodsPage";
import { FreeRecipesPage } from "./FreeRecipesPage";
import { LoginForm } from "./LoginForm";
import { MenuPage } from "./MenuPage";
import { RecipesPage } from "./RecipesPage";
import { foodCategory } from "../utils/search";
import { catalogList } from "../utils/catalogList";

export const Main = () => {
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
            />
          }
        />
        <Route
          path={"/addFoodsPage"}
          element={
            <AddFoodsPage
              resetFreeRecipes={resetFreeRecipes}
              foodList={catalogList}
              foodInTheRefrigerator={foodInTheRefrigerator}
              setFoodInTheRefrigerator={setFoodInTheRefrigerator}
              getRecipesAPI={getRecipesAPI}
              recipesData={recipesData}
              setRecipesData={setRecipesData}
            />
          }
        />
        <Route
          path={"/loginForm"}
          element={<LoginForm resetFreeRecipes={resetFreeRecipes} />}
        />
        <Route
          path={"/freeRecipesPage"}
          element={
            <FreeRecipesPage
              resetFreeRecipes={resetFreeRecipes}
              foodList={catalogList}
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
