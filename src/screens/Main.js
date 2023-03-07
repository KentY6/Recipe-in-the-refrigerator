import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddFoodsPage } from "./AddFoodsPage";
import { FreeRecipesPage } from "./FreeRecipesPage";
import { LoginForm } from "./LoginForm";
import { MenuPage } from "./MenuPage";
import { RecipesPage } from "./RecipesPage";

export const Main = () => {
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
