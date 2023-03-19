import React from "react";
import { Link } from "react-router-dom";
import { MainTitle } from "../components/MainTitle";
import KitchenRoundedIcon from "@mui/icons-material/KitchenRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarrot, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export const MenuPage = () => {
  return (
    <div className="refrigerator">
      <div className="mainTitle">
        <MainTitle MainTitle={`Recipe in the refrigerator`} />
      </div>
      <div className="upperContainer">
        <div className="recipesContainer">
          <Link to={`/recipesPage`} className="linkRange">
            <div className="iconsContainer">
              <div className="upperIcons">
                <div className="boxIcon">
                  <KitchenRoundedIcon fontSize="80px" />
                </div>
                <div className="arrowIcon">
                  <ArrowDownwardRoundedIcon fontSize="100px" />
                </div>
                <div className="recipeIcon">
                  <RestaurantRoundedIcon fontSize="100px" />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="foodsContainer">
          <Link to={`/addFoodsPage`} className="linkRange">
            <div className="iconsContainer">
              <div className="upperIcons">
                <div className="boxIcon">
                  <KitchenRoundedIcon fontSize="80px" />
                </div>
                <div className="arrowIcon">
                  <ArrowUpwardRoundedIcon fontSize="80px" />
                </div>
                <div className="carrot">
                  <FontAwesomeIcon icon={faCarrot} fontSize="60px" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="lowerContainer">
        <div className="loginContainer">
          <Link to={`/loginForm`} className="linkRange">
            <div className="iconsContainer">
              <div className="loginIconText">
                <div className="loginIcon">
                  <FontAwesomeIcon icon={faRightToBracket} />
                </div>
                <div className="loginText">ログイン</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="freeRecipesContainer">
          <Link to={`/freeRecipesPage`} className="linkRange">
            <div className="iconsContainer">
              <div className="freeRecipeIconText">
                <div className="freeRecipeIcon">
                  <SearchRoundedIcon fontSize="40px" />
                </div>
                <div className="freeRecipeText">フリーレシピ検索</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
