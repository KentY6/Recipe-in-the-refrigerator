import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddFoodsPage } from "./AddFoodsPage";
import { FreeRecipesPage } from "./FreeRecipesPage";
import { LoginForm } from "./LoginForm";
import { MenuPage } from "./MenuPage";
import { RecipesPage } from "./RecipesPage";
import { catalogList } from "../utils/catalogList";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { db } from "../firebase";
import { OnboardingPage } from "./OnboardingPage";

export const Main = () => {
  // 冷蔵庫の中身
  const [foodInTheRefrigerator, setFoodInTheRefrigerator] = useState([]);
  // フリーレシピ検索用食材
  const [foodInFreeRecipesBox, setFoodInFreeRecipesBox] = useState([]);

  // 取得したレシピAPI
  const [recipesData, setRecipesData] = useState([]);
  const [freeRecipesData, setFreeRecipesData] = useState([]);
  // 材料をフィルタリングしたレシピデータ
  const [rebuildRecipesData, setRebuildRecipesData] = useState([]);
  const [rebuildFreeRecipesData, setRebuildFreeRecipesData] = useState([]);

  //ログインされているかどうかのサイン
  const [logInState, setLogInState] = useState(false);
  // ログイン後取得するデータ
  const [usersRefrigeratorData, setUsersRefrigeratorData] = useState([]);
  const [usersRecipesData, setUsersRecipesData] = useState([]);

  // APIキー
  const appID = process.env.REACT_APP_Application_ID;

  // API取得
  const getRecipesAPI = (food) => {
    axios
      .get(
        `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${appID}&categoryId=${food.categoryId}`
      )

      .then((res) => {
        const apiData = res.data.result;

        // 取得したAPIのオブジェクトにAPI取得に使用した食材を項目として追加する
        const mapApiData = apiData.map((source) => ({
          ...source,
          foodName: food.name,
          category: food.category,
          foodTag: food.tag,
        }));
        setRecipesData([...recipesData, ...mapApiData]);
      })

      .catch((err) => console.log(err));
  };

  // フリーレシピ用API取得
  const getFreeRecipesAPI = (food) => {
    axios
      .get(
        `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?applicationId=${appID}&categoryId=${food.categoryId}`
      )

      .then((res) => {
        const apiData = res.data.result;

        // 取得したAPIのオブジェクトにAPI取得に使用した食材を項目として追加する
        const mapApiData = apiData.map((source) => ({
          ...source,
          foodName: food.name,
          category: food.category,
          foodTag: food.tag,
        }));
        setFreeRecipesData([...freeRecipesData, ...mapApiData]);
      })

      .catch((err) => console.log(err));
  };

  // 冷蔵庫に入っている食材をフィルター用に食材名のみに分解しておく。
  const mapFoodInTheRefrigerator = foodInTheRefrigerator.map(
    (data) => data.name
  );
  // レシピの食材から冷蔵庫の中身を抜く処理
  const addRebuildMaterial = (recipes) => {
    const rebuildData = recipes.map((data) => ({
      ...data,
      rebuildMaterial: data.recipeMaterial.filter(
        (material) => !mapFoodInTheRefrigerator.includes(material)
      ),
    }));
    if (recipes === recipesData) {
      setRebuildRecipesData(rebuildData);
    } else {
      setRebuildFreeRecipesData(rebuildData);
    }
  };

  useEffect(() => {
    addRebuildMaterial(recipesData);
  }, [recipesData]);

  useEffect(() => {
    addRebuildMaterial(freeRecipesData);
  }, [freeRecipesData]);

  // フリーレシピ検索用のState・レシピ一覧のカテゴリータブをリセットする
  const resetFreeRecipes = () => {
    if (foodInFreeRecipesBox.length > 0) {
      setFoodInFreeRecipesBox([]);
    }
    if (freeRecipesData.length > 0) {
      setFreeRecipesData([]);
    }
  };

  // 登録するユーザー
  const user = firebase.auth().currentUser;

  // ユーザーデータ取得
  const getRefrigeratorData = () => {
    if (user) {
      db.collection(`users`)
        .doc(user.uid)
        .collection(`refrigerator`)
        .doc(`refrigerator`)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setUsersRefrigeratorData(userData);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setUsersRefrigeratorData([]);
    }
  };
  const getRecipesData = () => {
    if (user) {
      db.collection(`users`)
        .doc(user.uid)
        .collection(`recipesData`)
        .doc(`recipesData`)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setUsersRecipesData(userData);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setUsersRecipesData([]);
    }
  };

  useEffect(() => {
    if (logInState === true) {
      getRefrigeratorData();
      getRecipesData();
    }
    return;
  }, [logInState]);

  useEffect(() => {
    if (
      usersRefrigeratorData &&
      Object.keys(usersRefrigeratorData).length > 0
    ) {
      setFoodInTheRefrigerator(usersRefrigeratorData.foodInTheRefrigerator);
      setRecipesData(usersRecipesData.recipesData);
      setUsersRefrigeratorData([]);
      setUsersRecipesData([]);
    }
  }, [
    setFoodInTheRefrigerator,
    setRecipesData,
    usersRecipesData,
    usersRefrigeratorData,
  ]);

  // オートログイン機能
  useEffect(() => {
    const checkLogIn = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLogInState(true);
      }
      return checkLogIn;
    }, []);
  });

  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={logInState === true ? "/" : "menuPage"}
          element={
            <MenuPage
              logInState={logInState}
              setFoodInTheRefrigerator={setFoodInTheRefrigerator}
              setRecipesData={setRecipesData}
            />
          }
        />
        <Route
          path={"/recipesPage"}
          element={
            <RecipesPage
              resetFreeRecipes={resetFreeRecipes}
              recipesData={rebuildRecipesData}
              freeRecipesData={rebuildFreeRecipesData}
              foodInTheRefrigerator={foodInTheRefrigerator}
            />
          }
        />
        <Route
          path={"/addFoodsPage"}
          element={
            <AddFoodsPage
              resetFreeRecipes={resetFreeRecipes}
              foodList={catalogList}
              foodInTheRefrigerator={foodInTheRefrigerator}
              setFoodInTheRefrigerator={setFoodInTheRefrigerator}
              getRecipesAPI={getRecipesAPI}
              recipesData={recipesData}
              setRecipesData={setRecipesData}
            />
          }
        />
        <Route
          path={logInState === true ? "/loginForm" : "/"}
          element={
            <LoginForm
              resetFreeRecipes={resetFreeRecipes}
              logInState={logInState}
              setLogInState={setLogInState}
              foodInTheRefrigerator={foodInTheRefrigerator}
              recipesData={recipesData}
            />
          }
        />
        <Route
          path={"/freeRecipesPage"}
          element={
            <FreeRecipesPage
              resetFreeRecipes={resetFreeRecipes}
              foodList={catalogList}
              getFreeRecipesAPI={getFreeRecipesAPI}
              freeRecipesData={freeRecipesData}
              setFreeRecipesData={setFreeRecipesData}
              foodInFreeRecipesBox={foodInFreeRecipesBox}
              setFoodInFreeRecipesBox={setFoodInFreeRecipesBox}
            />
          }
        />
        <Route path={"/onboardingPage"} element={<OnboardingPage />} />
      </Routes>
    </BrowserRouter>
  );
};
