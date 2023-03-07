import React from "react";
import { Link } from "react-router-dom";

export const MenuPage = () => {
  return (
    <div>
      <Link to={`/recipesPage`}>レシピページ</Link>
      <Link to={`/addFoodsPage`}>食材追加ページ</Link>
      <Link to={`/loginForm`}>ログインフォーム</Link>
      <Link to={`/freeRecipesPage`}>フリーレシピページ</Link>
    </div>
  );
};
