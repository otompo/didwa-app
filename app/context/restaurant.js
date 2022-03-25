import React, { useState, createContext } from "react";

// create context
const RestaurantContext = createContext();

// context provider
const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  // console.log(restaurants);
  return (
    <RestaurantContext.Provider value={[restaurants, setRestaurants]}>
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantContext, RestaurantProvider };
