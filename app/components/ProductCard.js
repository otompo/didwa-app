import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import colors from "../config/colors";
import { Image } from "react-native-expo-image-cache";

function FoodCard({ onPress, name, image, thumbnailUrl }) {
  return (
    <TouchableOpacity
      // activeOpacity={1}
      delayPressIn={150}
      style={styles.gridStyle}
      onPress={onPress}
    >
      <View
        style={{
          marginHorizontal: 10,
          // marginVertical: 10,
          // marginLeft: 10,
          // justifyContent: "center",
        }}
      >
        <Image
          preview={{ uri: thumbnailUrl }}
          tint="light"
          uri={image}
          style={styles.image}
        />

        <View style={styles.titleContainer}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: colors.white,
              marginHorizontal: 10,
            }}
          >
            {name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default FoodCard;

const styles = StyleSheet.create({
  titleContainer: {
    position: "absolute",
    top: 65,
    // height: 38,
    backgroundColor: colors.primary,
    elevation: 4,
    // alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  gridStyle: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // height: 80,
    margin: 5,
  },
});
