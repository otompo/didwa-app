import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// create context
const FoodContext = createContext();

// context provider
const FoodProvider = ({ children }) => {
  const [mills, setMills] = useState({
    food: "",
  });

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let fooddata = await AsyncStorage.getItem("food");
      const as = JSON.parse(fooddata);
      // console.log(as);
      setMills({
        ...mills,
        food: as.food,
      });
    };
    loadFromAsyncStorage();
  }, []);

  return (
    <FoodContext.Provider value={[mills, setMills]}>
      {children}
    </FoodContext.Provider>
  );
};

export { FoodContext, FoodProvider };
