import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddFoodsPage } from "./AddFoodsPage";
import { FreeRecipesPage } from "./FreeRecipesPage";
import { LoginForm } from "./LoginForm";
import { MenuPage } from "./MenuPage";
import { RecipesPage } from "./RecipesPage";
import { categorySearch } from "../utils/search";

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

  const foodCategory = ["TOP", "肉", "野菜", "魚", "粉物", "調味料"];
  // 冷蔵庫の中身
  const [foodInTheRefrigerator, setFoodInTheRefrigerator] = useState([]);
  // フリーレシピ検索用食材
  const [foodInFreeRecipesBox, setFoodInFreeRecipesBox] = useState([]);

  // カテゴリー検索されたリスト
  const [categorizedFoodInFoodList, setCategorizedFoodInFoodList] = useState(
    []
  );
  const [categorizedFoodInRefrigerator, setCategorizedFoodInRefrigerator] =
    useState([]);
  const [categorizedRecipes, setCategorizedRecipes] = useState([]);
  const [categorizedFoodInFreeRecipes, setCategorizedFoodInFreeRecipes] =
    useState([]);
  const [categorizedFreeRecipes, setCategorizedFreeRecipes] = useState([]);

  // 選択されたカテゴリータブ
  const [selectedFoodListCategory, setSelectedFoodListCategory] =
    useState("TOP");
  const [selectedRefrigeratorCategory, setSelectedRefrigeratorCategory] =
    useState("TOP");
  const [selectedRecipesCategory, setSelectedRecipesCategory] = useState("TOP");
  const [
    selectedFreeRecipesFoodsCategory,
    setSelectedFreeRecipesFoodsCategory,
  ] = useState("TOP");
  const [selectedFreeRecipesCategory, setSelectedFreeRecipesCategory] =
    useState("TOP");

  // ワード検索されたリスト
  const [searchedFoodInFoodList, setSearchedFoodInFoodList] = useState([]);
  const [searchedFoodInRefrigerator, setSearchedFoodInRefrigerator] = useState(
    []
  );
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchedFoodInFreeRecipes, setSearchedFoodInFreeRecipes] = useState(
    []
  );
  const [searchedFreeRecipes, setSearchedFreeRecipes] = useState([]);

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

    if (categorizedFoodInFreeRecipes.length > 0) {
      setCategorizedFoodInFreeRecipes([]);
    }

    if (searchedFoodInFreeRecipes.length > 0) {
      setSearchedFoodInFreeRecipes([]);
    }

    if (selectedFreeRecipesFoodsCategory !== "TOP") {
      setSelectedFreeRecipesFoodsCategory("TOP");
    }

    if (freeRecipesData.length > 0) {
      setFreeRecipesData([]);
    }

    if (selectedRecipesCategory !== "TOP") {
      setSelectedRecipesCategory("TOP");
    }
  };

  // ワード検索機能
  const searchFood = (searchWord, attribute) => {
    if (attribute === "foodList") {
      const filterFoodList = foodList.filter((food) =>
        food.name.includes(searchWord)
      );
      setSearchedFoodInFoodList(filterFoodList);
      setSelectedFoodListCategory("TOP");
    }
    if (attribute === "refrigerator") {
      const filterRefrigerator = foodInTheRefrigerator.filter((food) =>
        food.name.includes(searchWord)
      );
      setSearchedFoodInRefrigerator(filterRefrigerator);
      setSelectedRefrigeratorCategory("TOP");
    }
    if (attribute === "recipes") {
      const filterRecipes = recipesData.filter((data) =>
        data.recipeMaterial.includes(searchWord)
      );
      setSearchedRecipes(filterRecipes);
      setSelectedRecipesCategory("TOP");
    }
    if (attribute === "freeRecipesFoods") {
      const filterFreeRecipesFoods = foodList.filter((food) =>
        food.name.includes(searchWord)
      );
      setSearchedFoodInFreeRecipes(filterFreeRecipesFoods);
      setSelectedFreeRecipesFoodsCategory("TOP");
    }
    if (attribute === "freeRecipes") {
      const filterFreeRecipes = freeRecipesData.filter((data) =>
        data.recipeMaterial.includes(searchWord)
      );
      setSearchedFreeRecipes(filterFreeRecipes);
      setSelectedFreeRecipesCategory("TOP");
    }
  };

  // カテゴリー検索機能
  const categorySearch = (Category, attribute) => {
    if (attribute === "foodList") {
      setSearchedFoodInFoodList("");
      setSelectedFoodListCategory(Category);
      setCategorizedFoodInFoodList(
        foodList.filter((food) => food.category === Category)
      );
    }
    if (attribute === "refrigerator") {
      setSearchedFoodInRefrigerator("");
      setSelectedRefrigeratorCategory(Category);
      setCategorizedFoodInRefrigerator(
        foodInTheRefrigerator.filter((food) => food.category === Category)
      );
    }
    if (attribute === "recipes") {
      setSearchedRecipes("");
      setSelectedRecipesCategory(Category);
      setCategorizedRecipes(
        recipesData.filter((data) => data.category === Category)
      );
    }
    if (attribute === "freeRecipesFoods") {
      setSearchedFoodInFreeRecipes("");
      setSelectedFreeRecipesFoodsCategory(Category);
      setCategorizedFoodInFreeRecipes(
        foodList.filter((data) => data.category === Category)
      );
    }
    if (attribute === "freeRecipes") {
      setSearchedFreeRecipes("");
      setSelectedFreeRecipesCategory(Category);
      setCategorizedFreeRecipes(
        freeRecipesData.filter((data) => data.category === Category)
      );
    }

    return;
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
              categorySearch={categorySearch}
              // カテゴリー検索されたリスト
              categorizedRecipes={categorizedRecipes}
              categorizedFreeRecipes={categorizedFreeRecipes}
              // ワード検索されたリスト
              searchedRecipes={searchedRecipes}
              searchedFreeRecipes={searchedFreeRecipes}
              // 選択されたカテゴリータブ
              selectedRecipesCategory={selectedRecipesCategory}
              selectedFreeRecipesCategory={selectedFreeRecipesCategory}
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
              foodCategory={foodCategory}
              getRecipesAPI={getRecipesAPI}
              recipesData={recipesData}
              setRecipesData={setRecipesData}
              searchFood={searchFood}
              categorySearch={categorySearch}
              // カテゴリー検索されたリスト
              categorizedFoodInFoodList={categorizedFoodInFoodList}
              categorizedFoodInRefrigerator={categorizedFoodInRefrigerator}
              setCategorizedFoodInRefrigerator={
                setCategorizedFoodInRefrigerator
              }
              // ワード検索されたリスト
              searchedFoodInFoodList={searchedFoodInFoodList}
              searchedFoodInRefrigerator={searchedFoodInRefrigerator}
              setSearchedFoodInRefrigerator={setSearchedFoodInRefrigerator}
              // 選択されたカテゴリータブ
              selectedFoodListCategory={selectedFoodListCategory}
              selectedRefrigeratorCategory={selectedRefrigeratorCategory}
              setSelectedRefrigeratorCategory={setSelectedRefrigeratorCategory}
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
              categorySearch={categorySearch}
              searchFood={searchFood}
              getFreeRecipesAPI={getFreeRecipesAPI}
              freeRecipesData={freeRecipesData}
              setFreeRecipesData={setFreeRecipesData}
              foodInFreeRecipesBox={foodInFreeRecipesBox}
              setFoodInFreeRecipesBox={setFoodInFreeRecipesBox}
              searchedFoodInFreeRecipes={searchedFoodInFreeRecipes}
              setSearchedFoodInFreeRecipes={setSearchedFoodInFreeRecipes}
              categorizedFoodInFreeRecipes={categorizedFoodInFreeRecipes}
              setCategorizedFoodInFreeRecipes={setCategorizedFoodInFreeRecipes}
              selectedFreeRecipesFoodsCategory={
                selectedFreeRecipesFoodsCategory
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
