// 食材の種類
export const foodCategory = [
  "TOP",
  "肉",
  "乳製品",
  "野菜",
  "豆類",
  "果物",
  "魚",
  "粉物",
  "穀物",
  "調味料",
];

// カテゴリー検索機能
export const categorySearch = (Category, foodList) => {
  const foodListFilter = foodList.filter((food) => food.category === Category);
  return foodListFilter;
};

// ワード検索機能
export const searchFood = (searchWord, foodList) => {
  const foodListFilter = foodList.filter((food) =>
    food.name.includes(searchWord)
  );
  return foodListFilter;
};

export const searchRecipesFood = (searchWord, foodList) => {
  const foodListFilter = foodList.filter((food) =>
    food.recipeMaterial.includes(searchWord)
  );
  return foodListFilter;
};
