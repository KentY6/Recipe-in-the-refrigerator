import React, { useState } from "react";

export const AuthenticationInputForm = ({ text, getText }) => {
  const [authenticationText, setAuthenticationText] = useState("");

  const getInputText = (e) => {
    e.preventDefault();
    getText(authenticationText);
  };

  return (
    <div>
      <div>{text}</div>
      <form onChange={getInputText}>
        <input
          type="text"
          value={authenticationText}
          onChange={(e) => setAuthenticationText(e.target.value)}
        />
      </form>
    </div>
  );
};
