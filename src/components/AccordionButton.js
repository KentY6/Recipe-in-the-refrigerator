import React from "react";
import ArrowCircleDownRoundedIcon from "@mui/icons-material/ArrowCircleDownRounded";

export const AccordionButton = ({ text }) => {
  return (
    <div className="accordionBar">
      <div className="accordionText">{text}</div>
      <div className="accordionButton">
        <ArrowCircleDownRoundedIcon />
      </div>
    </div>
  );
};
