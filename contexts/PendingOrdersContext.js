import React, { createContext, useState } from "react";

export const PendingOrdersContext = createContext();

const PendingOrdersContextProvider = ({ children }) => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [socket, setSocket] = useState();

  return (
    <PendingOrdersContext.Provider
      value={{ pendingOrders, setPendingOrders, socket, setSocket }}
    >
      {children}
    </PendingOrdersContext.Provider>
  );
};

export default PendingOrdersContextProvider;
