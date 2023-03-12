import React from "react";

export const CategoryTab = ({ categorySearch, foodCategory, attribute }) => {
  const inputCategory = (category) => {
    categorySearch(category, attribute);
    if (attribute === "foodList") categorySearch(category, attribute);
    else if (attribute === "refrigerator") categorySearch(category, attribute);
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
