import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";

function Card({ title, subTitle, subSubTitle, image, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle}>{subTitle}.</AppText>
          {/* <AppText style={styles.subSubTitle} numberOfLines={1}>
            {subSubTitle}
          </AppText> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Card;
const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 30,
    marginTop: 30,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
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
    color: colors.secondary,
    fontWeight: "100",
  },
});
