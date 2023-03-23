import React from "react";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { List } from "../components/List";

export const FreeRecipesPage = ({
  foodList,
  attribute,
  getRecipesAPI,
  foodInFreeRecipesBox,
  setFoodInFreeRecipesBox,
  setSelectedFreeRecipesCategory,
}) => {
  // フリーレシピ検索用に食材リストで選択した食材を追加する機能
  const addFoodInFreeRecipesBox = (data) => {
    // フリーレシピの中に入っている食材は追加されないようにする
    if (
      foodInFreeRecipesBox.find((food) => food.name === data.name) !== undefined
    )
      return;
    else setFoodInFreeRecipesBox([...foodInFreeRecipesBox, data]);
    setSelectedFreeRecipesCategory("TOP");
    // 追加した食材でAPIをたたく
    getRecipesAPI(data);
  };

  // 冷蔵庫の中の食材を削除する機能
  const deleteFoodInFreeRecipes = (name) => {
    // setFoodInTheRefrigerator(
    //   foodInTheRefrigerator.filter((food) => food.name !== name)
    // );
    // if (categorizedFoodInRefrigerator.length !== 0) {
    //   setCategorizedFoodInRefrigerator(
    //     categorizedFoodInRefrigerator.filter((food) => food.name !== name)
    //   );
    // }
    // if (searchedFoodInRefrigerator.length !== 0) {
    //   setSearchedFoodInRefrigerator(
    //     searchedFoodInRefrigerator.filter((food) => food.name !== name)
    //   );
    // }
    // if (recipesData.length > 0) {
    //   setRecipesData(recipesData.filter((food) => food.foodName !== name));
    // }
  };

  return (
    <div>
      <div className="returnAndTitle">
        <Link to={"/"} className="returnButton">
          <UndoRoundedIcon fontSize="40px" />
        </Link>
        <PageTitle PageTitle={"フリーレシピ検索"} />
      </div>
      <List
        isFood={foodList}
        attribute={"foodList"}
        addFood={addFoodInFreeRecipesBox}
        deleteFood={deleteFoodInFreeRecipes}
      />
    </div>
  );
};
