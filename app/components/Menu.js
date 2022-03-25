import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
// import Text from "@kaloraat/react-native-text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function Menu({ title, icon, onPress }) {
  return (
    <View style={styles.flatList}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 20,
            marginHorizontal: 5,
            backgroundColor: colors.secoundary,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 3,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.white,
              padding: 10,
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
          <MaterialCommunityIcons
            name={icon}
            size={25}
            style={{
              color: colors.light,
              marginHorizontal: 5,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Menu;

const styles = StyleSheet.create({
  flatList: {
    height: 60,
    backgroundColor: colors.light,
    flexGrow: 0,
    marginBottom: 40,
  },
  menuText: {
    color: colors.primary,
    margin: 5,
    // padding: 2,
    fontSize: 16,
    fontWeight: "bold",
  },
});
