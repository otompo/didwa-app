import React from "react";
import { Text, View } from "react-native";

function FoodTopTitle({ title }) {
  return (
    <View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 16,
          marginTop: 15,
          marginBottom: 10,
          marginHorizontal: 20,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export default FoodTopTitle;
