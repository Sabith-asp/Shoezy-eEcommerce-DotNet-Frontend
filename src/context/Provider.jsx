import React, { createContext, useEffect, useState } from "react";
export const DataContext = createContext();

const Provider = ({ children }) => {
  const [toggleAuth, setToggleAuth] = useState(true);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("id");
    id ? setIsUserLogin(true) : setIsUserLogin(false);
  }, []);

  return (
    <DataContext.Provider
      value={{ toggleAuth, setToggleAuth, isUserLogin, setIsUserLogin, setId }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default Provider;
