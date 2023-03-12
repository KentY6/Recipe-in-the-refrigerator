import React, { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export const SearchBar = ({ searchFood, attribute }) => {
  const [searchWord, setSearchWord] = useState("");

  const getInputText = (e) => {
    e.preventDefault();
    searchFood(searchWord, attribute);
  };

  return (
    <div>
      <form onSubmit={getInputText}>
        <input
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
