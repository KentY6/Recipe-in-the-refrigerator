import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Link } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { RectangleButton } from "../components/RectangleButton";
import { CategoryTab } from "../components/CategoryTab";
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { List } from "../components/List";

export const AddFoodsPage = ({
  foodList,
  foodInTheRefrigerator,
  setFoodInTheRefrigerator,
  foodCategory,
  getRecipesAPI,
  recipesData,
  setRecipesData,
}) => {
  // カテゴリー検索されたリスト
  const [categorizedFoodInFoodList, setCategorizedFoodInFoodList] = useState(
    []
  );
  const [categorizedFoodInRefrigerator, setCategorizedFoodInRefrigerator] =
    useState([]);
  const [selectedFoodListCategory, setSelectedFoodListCategory] =
    useState("TOP");
  const [selectedRefrigeratorCategory, setSelectedRefrigeratorCategory] =
    useState("TOP");

  // 検索されたリスト
  const [searchedFoodInFoodList, setSearchedFoodInFoodList] = useState([]);
  const [searchedFoodInRefrigerator, setSearchedFoodInRefrigerator] = useState(
    []
  );

  // アコーディオンボタンがアクティブか否かのシグナル
  const [isActiveFoodList, setIsActiveFoodList] = useState(false);
  const [isActiveRefrigerator, setIsActiveRefrigerator] = useState(false);

  // 冷蔵庫の中身に食材リストで選択した食材を追加する機能
  const addFoodInRefrigerator = (data) => {
    // 冷蔵庫の中に入っている食材は追加されないようにする
    if (
      foodInTheRefrigerator.find((food) => food.name === data.name) !==
      undefined
    )
      return;
    else setFoodInTheRefrigerator([...foodInTheRefrigerator, data]);
    setSelectedRefrigeratorCategory("TOP");
    // 追加した食材でAPIをたたく
    getRecipesAPI(data);
  };

  // 冷蔵庫の中の食材を削除する機能
  const deleteFood = (name) => {
    setFoodInTheRefrigerator(
      foodInTheRefrigerator.filter((food) => food.name !== name)
    );
    if (categorizedFoodInRefrigerator.length !== 0) {
      setCategorizedFoodInRefrigerator(
        categorizedFoodInRefrigerator.filter((food) => food.name !== name)
      );
    }
    if (searchedFoodInRefrigerator.length !== 0) {
      setSearchedFoodInRefrigerator(
        searchedFoodInRefrigerator.filter((food) => food.name !== name)
      );
    }
    if (recipesData.length > 0) {
      setRecipesData(recipesData.filter((food) => food.foodName !== name));
    }
  };

  // ワード検索機能
  const searchFood = (searchWord, attribute) => {
    if (attribute === "foodList") {
      const filterFoodList = foodList.filter(
        (food) => food.name.indexOf(searchWord) !== -1
      );
      setSearchedFoodInFoodList(filterFoodList);
      setSelectedFoodListCategory("TOP");
    }
    if (attribute === "refrigerator") {
      const filterRefrigerator = foodInTheRefrigerator.filter(
        (food) => food.name.indexOf(searchWord) !== -1
      );
      setSearchedFoodInRefrigerator(filterRefrigerator);
      setSelectedRefrigeratorCategory("TOP");
    }
  };

  // カテゴリー検索機能
  const categorySearch = (Category, attribute) => {
    if (attribute === "foodList") {
      setSearchedFoodInFoodList("");
      setSelectedFoodListCategory(Category);
      setCategorizedFoodInFoodList(
        foodList.filter((food) => food.category === Category)
      );
    }
    if (attribute === "refrigerator") {
      setSearchedFoodInRefrigerator("");
      setSelectedRefrigeratorCategory(Category);
      setCategorizedFoodInRefrigerator(
        foodInTheRefrigerator.filter((food) => food.category === Category)
      );
      return;
    }
  };

  // リストに表示する食材を決める
  const whichFoodInFoodList = () => {
    // 配列を作ってそこに入れるようにする
    let whichFoodArray = [];
    // カテゴリーがTOPの時
    if (selectedFoodListCategory === "TOP") {
      whichFoodArray = foodList;
    }
    if (searchedFoodInFoodList.length > 0) {
      whichFoodArray = searchedFoodInFoodList;
    }
    if (
      categorizedFoodInFoodList.length > 0 &&
      selectedFoodListCategory !== "TOP"
    ) {
      whichFoodArray = categorizedFoodInFoodList;
    }
    return whichFoodArray;
  };
  const whichFoodInFoodListResult = whichFoodInFoodList();

  const whichFoodInRefrigerator = () => {
    // 配列を作ってそこに入れるようにする
    let whichFoodArray = [];
    // カテゴリーがTOPの時
    if (selectedRefrigeratorCategory === "TOP") {
      whichFoodArray = foodInTheRefrigerator;
    }
    if (searchedFoodInRefrigerator.length > 0) {
      whichFoodArray = searchedFoodInRefrigerator;
    }
    if (
      categorizedFoodInRefrigerator.length > 0 &&
      selectedRefrigeratorCategory !== "TOP"
    ) {
      whichFoodArray = categorizedFoodInRefrigerator;
    }
    return whichFoodArray;
  };
  const whichFoodInRefrigeratorResult = whichFoodInRefrigerator();

  return (
    <div>
      <div className="returnAndTitle">
        <Link to={"/"} className="returnButton">
          <UndoRoundedIcon fontSize="40px" />
        </Link>
        <PageTitle PageTitle={"冷蔵庫に食材を追加する"} />
      </div>

      {/* 食材リスト */}
      <div className="foodListContainer">
        {/* todo:RectangleButtonの名前が要リファクタリング(アセンブリのイメージで細分化)*/}
        <RectangleButton
          text={"食材リスト"}
          isActive={isActiveFoodList}
          setIsActive={setIsActiveFoodList}
          attribute={"foodList"}
        />
        <div
          className={isActiveFoodList === true ? "foodListBox" : "nonActive"}
        >
          <SearchBar searchFood={searchFood} attribute={"foodList"} />
          <div className="categoryTab">
            {foodCategory.map((category, index) => (
              <CategoryTab
                categorySearch={categorySearch}
                category={category}
                attribute={"foodList"}
                selectedCategory={selectedFoodListCategory}
                key={index}
              />
            ))}
          </div>

          <div className="foodList">
            <List
              isFood={whichFoodInFoodListResult}
              addFoodInRefrigerator={addFoodInRefrigerator}
              deleteFood={deleteFood}
              attribute={"foodList"}
              foodInTheRefrigerator={foodInTheRefrigerator}
            />
          </div>
        </div>
      </div>

      {/* 冷蔵庫の中身 */}
      <div className="RefrigeratorContainer">
        <RectangleButton
          text={"冷蔵庫の中身"}
          isActive={isActiveRefrigerator}
          setIsActive={setIsActiveRefrigerator}
          attribute={"refrigerator"}
        />
        <div
          className={
            isActiveRefrigerator === true ? "refrigeratorBox" : "nonActive"
          }
        >
          <SearchBar searchFood={searchFood} attribute={"refrigerator"} />
          <div className="categoryTab">
            {foodCategory.map((category, index) => (
              <CategoryTab
                categorySearch={categorySearch}
                category={category}
                attribute={"refrigerator"}
                selectedCategory={selectedRefrigeratorCategory}
                key={index}
              />
            ))}
          </div>
          <List
            isFood={whichFoodInRefrigeratorResult}
            deleteFood={deleteFood}
            attribute={"refrigerator"}
          />
        </div>
      </div>

      {/* レシピ検索ボタン */}
      <div className="searchRecipe">
        <Link to={`/recipesPage`} className="link">
          <RectangleButton
            text={"冷蔵庫の中身からレシピ検索"}
            attribute={"goToRecipesPage"}
          />
        </Link>
      </div>
    </div>
  );
};
