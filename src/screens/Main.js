import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddFoodsPage } from "./AddFoodsPage";
import { FreeRecipesPage } from "./FreeRecipesPage";
import { LoginForm } from "./LoginForm";
import { MenuPage } from "./MenuPage";
import { RecipesPage } from "./RecipesPage";

export const Main = () => {
  const foodList = [
    {
      name: "豚バラ肉",
      category: "肉",
      categoryId: `${10}-${276}-${830}`,
      picture: "/picture/豚バラ肉.jpeg",
    },
    {
      name: "豚ロース肉",
      category: "肉",
      categoryId: `${10}-${276}-${1485}`,
      picture: "/picture/豚ロース肉.jpeg",
    },
    {
      name: "豚ひき肉",
      category: "肉",
      categoryId: `${10}-${278}-${836}`,
      picture: "/picture/豚ひき肉.jpeg",
    },
    {
      name: "牛バラ肉",
      category: "肉",
      categoryId: `${10}-${275}-${2134}`,
      picture: "/picture/牛バラ肉.jpeg",
    },
    {
      name: "牛小間肉",
      category: "肉",
      categoryId: `${10}-${275}-${2135}`,
      picture: "/picture/牛小間肉.jpeg",
    },
    {
      name: "牛ひき肉",
      category: "肉",
      categoryId: `${10}-${275}-${2135}`,
      picture: "/picture/牛ひき肉.jpeg",
    },
    {
      name: "キャベツ",
      category: "野菜",
      categoryId: `${12}-${98}-${1}`,
      picture: "/picture/キャベツ.jpeg",
    },
    {
      name: "レタス",
      category: "野菜",
      categoryId: `${12}-${100}-${2}`,
      picture: "/picture/レタス.jpeg",
    },
    {
      name: "サーモン",
      category: "魚",
      categoryId: `${11}-${70}-${839}`,
      picture: "/picture/サーモン.jpeg",
    },
    {
      name: "うどん",
      category: "粉物",
      categoryId: `${16}-${152}-${1336}`,
      picture: "/picture/うどん.jpeg",
    },
    {
      name: "塩",
      category: "調味料",
      categoryId: `${13}-${484}-${1657}`,
      picture: "/picture/塩.jpeg",
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MenuPage />} />
        <Route path={"/recipesPage"} element={<RecipesPage />} />
        <Route path={"/addFoodsPage"} element={<AddFoodsPage />} />
        <Route path={"/loginForm"} element={<LoginForm />} />
        <Route path={"/freeRecipesPage"} element={<FreeRecipesPage />} />
      </Routes>
    </BrowserRouter>
  );
};
