import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, StatusBar } from "react-native";
import colors from "../config/colors";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* <View style={style}>
        <StatusBar barStyle="light-content" />
        {children}
      </View> */}
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: "space-between",
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: StatusBar.setBackgroundColor(colors.primary),
    color: StatusBar.setBarStyle(colors.primary),
  },
});

export default Screen;
