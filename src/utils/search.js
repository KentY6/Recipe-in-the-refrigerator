// カテゴリー検索機能
export const categorySearch = (Category, foodList) => {
  console.log("categorySearch");
  const foodListFilter = foodList.filter((food) => food.category === Category);
  return foodListFilter;
};
