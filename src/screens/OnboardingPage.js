import React, { useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretRight,
  faSquareCaretLeft,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

export const OnboardingPage = () => {
  // 表示変更用Num
  const [pageNum, setPageNum] = useState(0);

  // 表示変更用Num増減機能
  const incrementNum = () => {
    if (pageNum < 3) setPageNum(pageNum + 1);
  };
  const decrementNum = () => {
    if (pageNum > 0) {
      setPageNum(pageNum - 1);
    }
  };

  // 表示画像設定
  const getImg = () => {
    let screenImg = "";
    if (pageNum === 0) {
      screenImg =
        "/image/onboardingScreen/オンボーディング画面レシピページ.jpeg";
    }
    if (pageNum === 1) {
      screenImg = "/image/onboardingScreen/オンボーディング画面食材追加.jpeg";
    }
    if (pageNum === 2) {
      screenImg = "/image/onboardingScreen/オンボーディング画面ログアウト.jpeg";
    }
    if (pageNum === 3) {
      screenImg =
        "/image/onboardingScreen/オンボーディング画面フリーレシピページ.jpeg";
    }
    return screenImg;
  };
  const getImgResult = getImg();

  // 説明文タイトル設定
  const getDescriptionTitle = () => {
    let text = "";
    if (pageNum === 0) {
      text = "冷蔵庫→レシピ検索ボタン";
    }
    if (pageNum === 1) {
      text = "食材追加ボタン";
    }
    if (pageNum === 2) {
      text = "ログアウトボタン";
    }
    if (pageNum === 3) {
      text = "フリーレシピ検索ボタン";
    }
    return text;
  };
  const getDescriptionTitleResult = getDescriptionTitle();

  // 説明文テキスト設定
  const getDescriptionText = () => {
    let text = "";
    if (pageNum === 0) {
      text = `冷凍庫の中身からレシピを検索するボタン。
        食材ごとに4つずつレシピを提案します。`;
    }
    if (pageNum === 1) {
      text = `食材を冷蔵庫に追加するボタン。
      実際に冷蔵庫に入っている食材を入れて
      みましょう。`;
    }
    if (pageNum === 2) {
      text = `ログアウト・もしくはアカウントの
      削除ができます。`;
    }
    if (pageNum === 3) {
      text = "食材を複数選んでレシピを検索できます。";
    }
    return text;
  };
  const getDescriptionTextResult = getDescriptionText();

  return (
    <div className="onboardingPage">
      <div className="returnAndTitle">
        <PageTitle PageTitle={"アプリの使い方"} />
      </div>

      <div className="onboardingUI">
        <div
          className={
            pageNum === 0 ? "nonActiveOnboardingButton" : "onboardingButton"
          }
          onClick={decrementNum}
        >
          <FontAwesomeIcon icon={faSquareCaretLeft} />
        </div>
        <div className="onboardingImg">
          <img className="onboardingImg" src={getImgResult} alt="" />
        </div>
        <div
          className={
            pageNum === 3 ? "nonActiveOnboardingButton" : "onboardingButton"
          }
          onClick={incrementNum}
        >
          <FontAwesomeIcon icon={faSquareCaretRight} />
        </div>
      </div>
      <div className="description">
        <div className="descriptionTitle">{getDescriptionTitleResult}</div>
        <div className="descriptionText">{getDescriptionTextResult}</div>
      </div>
      <div className="skipAndDots">
        <div className="skip">
          <Link to={"/"}>{pageNum === 3 ? "閉じる" : "スキップ"}</Link>
        </div>
        <div className="dots">
          <div className={pageNum === 0 ? "dot" : "nonActiveDot"}>●</div>
          <div className={pageNum === 1 ? "dot" : "nonActiveDot"}>●</div>
          <div className={pageNum === 2 ? "dot" : "nonActiveDot"}>●</div>
          <div className={pageNum === 3 ? "dot" : "nonActiveDot"}>●</div>
        </div>
      </div>
    </div>
  );
};
