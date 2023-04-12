import React from "react";

export const AuthenticationInputForm = ({ type, label, getText }) => {
  return (
    <div>
      <div>{label}</div>
      <form>
        <input type={type} />
      </form>
    </div>
  );
};
