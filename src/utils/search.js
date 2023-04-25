// 食材の種類
export const foodCategory = [
  "TOP",
  "肉・たまご",
  "魚",
  "乳製品",
  "野菜・きのこ",
  "豆類",
  "果物",
  "粉物・麺",
  "穀物",
  "調味料・その他",
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
