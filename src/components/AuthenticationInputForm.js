import React from "react";

export const AuthenticationInputForm = ({ text }) => {
  return (
    <div>
      <div>{text}</div>
      <input type="text" />
    </div>
  );
};
