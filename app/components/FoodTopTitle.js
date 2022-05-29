import React from "react";
import { Text, View } from "react-native";
import colors from "../config/colors";

function FoodTopTitle({ title }) {
  return (
    <View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          marginTop: 5,
          marginHorizontal: 20,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export default FoodTopTitle;
