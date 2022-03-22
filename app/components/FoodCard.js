import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import colors from "../config/colors";
import { Image } from "react-native-expo-image-cache";

function FoodCard({ onPress, title, image, price, thumbnailUrl }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ marginHorizontal: 10, justifyContent: "center" }}>
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
            {title} {price}
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
    width: 170,
    height: 150,
    borderRadius: 10,
  },
});
