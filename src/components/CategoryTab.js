import React from "react";

export const CategoryTab = ({ categorySearch, foodCategory, attribute }) => {
  const inputCategory = (category) => {
    categorySearch(category, attribute);
  };

  return (
    <div className="categoryTab">
      {foodCategory.map((category, index) => (
        <div
          className="categoryText"
          onClick={() => inputCategory(category)}
          key={index}
        >
          {category}
        </div>
      ))}
    </div>
  );
};
