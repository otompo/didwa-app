import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import colors from "../config/colors";

function Menu({ title, icon, onPress }) {
  return (
    <View style={styles.flatList}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            marginTop: 10,
            marginBottom: 15,
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
              paddingLeft: 15,
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
    marginBottom: 60,
  },
  menuText: {
    color: colors.primary,
    paddingBottom: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
});
