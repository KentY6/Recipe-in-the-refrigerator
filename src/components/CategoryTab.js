import React from "react";

export const CategoryTab = ({
  categorySearch,
  category,
  attribute,
  selectedCategory,
  onClick,
}) => {
  const inputCategory = (category) => {
    categorySearch(category, attribute);
  };

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
