import React, { createContext, useState } from "react";

export const RestaurantListContext = createContext();

const RestaurantListContextProvider = ({ children }) => {
  const [restaurantList, setRestaurantList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  return (
    <RestaurantListContext.Provider
      value={{ restaurantList, setRestaurantList, isLoading, setIsLoading }}
    >
      {children}
    </RestaurantListContext.Provider>
  );
};

export default RestaurantListContextProvider;
