import React from "react";

export const CategoryTab = ({
  categorySearch,
  category,
  attribute,
  selectedCategory,
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
      onClick={() => inputCategory(category)}
    >
      {category}
    </div>
  );
};
