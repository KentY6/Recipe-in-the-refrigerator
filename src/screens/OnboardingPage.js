import React from "react";
import { PageTitle } from "../components/PageTitle";

export const OnboardingPage = () => {
  return (
    <div className="onboardingPage">
      <PageTitle PageTitle={"アプリの使い方"} />
      <div className="onboardingUI">
        <div className="onboardingButton">←</div>
        <div className="onboardingImg">img</div>
        <div className="onboardingButton">→</div>
      </div>
      <div className="description">
        <div>descriptionTitle</div>
        <div>description</div>
      </div>
      <div className="skipAndDots">
        <div>スキップ</div>
        <div className="dots">
          <div className="dot">・</div>
          <div className="dot">・</div>
          <div className="dot">・</div>
          <div className="dot">・</div>
        </div>
      </div>
    </div>
  );
};
