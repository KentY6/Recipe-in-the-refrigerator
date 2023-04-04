import React from "react";

export const CategoryTab = ({ category, selectedCategory, onClick }) => {
  return (
    <div
      className={
        category === selectedCategory
          ? "activeCategoryText"
          : "nonActiveCategoryText"
      }
      onClick={() => onClick(category)}
    >
      {category}
    </div>
  );
};
