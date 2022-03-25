import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function FoodListCard({ title, subTitle, subSubTitle, image, onPress }) {
  return (
    <>
      <View style={styles.card}>
        <TouchableOpacity onPress={onPress}>
          <Image style={styles.image} source={{ uri: image }} />
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{title}</AppText>
            <AppText style={styles.subTitle}>{subTitle}</AppText>
            <AppText style={styles.subSubTitle} numberOfLines={1}>
              {subSubTitle}
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default FoodListCard;
const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 10,
    marginTop: 30,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 160,
  },
  title: {
    marginBottom: 5,
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },
  subSubTitle: {
    color: colors.medium,
    fontWeight: "100",
  },
});
