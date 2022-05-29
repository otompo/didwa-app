import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

function ListItemSeparator() {
  return <View style={styles.seprator} />;
}

export default ListItemSeparator;
const styles = StyleSheet.create({
  seprator: { width: "100%", height: 0.5, backgroundColor: colors.primary },
});
