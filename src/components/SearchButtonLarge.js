import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export const SearchButtonLarge = ({ text }) => {
  return (
    <div className="largeButton">
      <div className="largeButtonText">{text}</div>
      <div className="largeButtonIcon">
        <SearchRoundedIcon />
      </div>
    </div>
  );
};
