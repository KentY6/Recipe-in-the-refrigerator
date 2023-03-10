import React from "react";

export const CategoryTab = ({ categorySearch }) => {
  const foodCategory = ["TOP", "肉", "野菜", "魚", "粉物", "調味料"];

  return (
    <div className="categoryTab">
      {foodCategory.map((category, index) => (
        <div
          className="categoryText"
          onClick={() => categorySearch(category)}
          key={index}
        >
          {category}
        </div>
      ))}
    </div>
  );
};
