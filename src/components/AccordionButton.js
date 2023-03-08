import React from "react";

export const AccordionButton = ({ text }) => {
  return (
    <div className="accordionBar">
      <div className="accordionText">{text}</div>
      <div className="accordionButton">↓</div>
    </div>
  );
};
