import React, { createContext, useEffect, useState } from "react";
export const DataContext = createContext();

const Provider = ({ children }) => {
  const [toggleAuth, setToggleAuth] = useState(true);
  const [id, setId] = useState(null);

  return (
    <DataContext.Provider value={{ toggleAuth, setToggleAuth, setId }}>
      {children}
    </DataContext.Provider>
  );
};

export default Provider;
