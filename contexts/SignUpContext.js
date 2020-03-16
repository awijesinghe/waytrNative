import React, { createContext, useState } from "react";

export const SignUpContext = createContext();

const SignUpContextProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState({
    firstName: "",
    lastName: ""
  });

  return (
    <SignUpContext.Provider
      value={{ email, setEmail, password, setPassword, userName, setUserName }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpContextProvider;
