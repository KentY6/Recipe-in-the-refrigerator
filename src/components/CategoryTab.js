import React from "react";

export const CategoryTab = ({
  categorySearch,
  foodCategory,
  attribute,
  selectedCategory,
}) => {
  const inputCategory = (category) => {
    categorySearch(category, attribute);
  };

  return (
    <div className="categoryTab">
      {foodCategory.map((category, index) => (
        <div
          className={
            category === selectedCategory
              ? "activeCategoryText"
              : "nonActiveCategoryText"
          }
          onClick={() => inputCategory(category)}
          key={index}
        >
          {category}
        </div>
      ))}
    </div>
  );
};
