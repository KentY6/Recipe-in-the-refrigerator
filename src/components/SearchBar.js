import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

export const SearchBar = ({ searchFood, attribute }) => {
  const [searchWord, setSearchWord] = useState("");

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
          placeholder="食材を絞り込み"
          onChange={(e) => setSearchWord(e.target.value)}
          type="text"
        />
        <div className="searchIcon" onClick={getInputText}>
          <FilterAltOutlinedIcon />
        </div>
      </form>
    </div>
  );
};
