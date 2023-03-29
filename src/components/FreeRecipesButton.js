import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export const FreeRecipesButton = () => {
  return (
    <div className="freeRecipesButton">
      <SearchRoundedIcon />
      <div>選択した食材でレシピ検索</div>
    </div>
  );
};
