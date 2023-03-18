import React from "react";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export const RectangleButton = ({ text, isActive, setIsActive, attribute }) => {
  //

  // アコーディオン起動
  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`${attribute}Bar`}>
      <div className="accordionText">{text}</div>
      <div
        className={
          isActive === true
            ? "activeRectangleButton"
            : "nonActiveRectangleButton"
        }
        onClick={() => toggleIsActive()}
      >
        {attribute === "goToRecipesPage" ? (
          <SearchRoundedIcon fontSize="20px" />
        ) : (
          <ArrowCircleDownRoundedIcon fontSize="20px" />
        )}
      </div>
    </div>
  );
};
