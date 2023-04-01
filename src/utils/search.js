// カテゴリー検索機能
export const testCategorySearch = (Category, foodList) => {
  const foodListFilter = foodList.filter((food) => food.category === Category);
  return foodListFilter;
};
