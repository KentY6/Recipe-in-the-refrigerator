import React, { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export const SearchBar = ({ searchFood, attribute }) => {
  const [searchWord, setSearchWord] = useState("食材を検索");

  const getInputText = (e) => {
    e.preventDefault();
    searchFood(searchWord, attribute);
  };

  return (
    <div>
      <form className="searchBar" onSubmit={getInputText}>
        <input
          className="textBox"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          type="text"
        />
        <div onClick={getInputText}>
          <SearchRoundedIcon />
        </div>
      </form>
    </div>
  );
};
