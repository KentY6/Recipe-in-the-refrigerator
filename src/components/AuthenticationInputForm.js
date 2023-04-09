import React, { useState } from "react";

export const AuthenticationInputForm = ({ type, text, getText }) => {
  const [authenticationText, setAuthenticationText] = useState("");

  const getInputText = (e) => {
    getText(authenticationText);
  };

  return (
    <div>
      <div>{text}</div>
      <form onChange={getInputText}>
        <input
          type={type}
          value={authenticationText}
          onChange={(e) => setAuthenticationText(e.target.value)}
        />
      </form>
    </div>
  );
};
