import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

function CircleLogo({ children }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        // marginTop: -10,
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          height: 150,
          width: 150,
          borderRadius: 80,
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children ? (
          children
        ) : (
          <Image
            source={require("../../assets/logo.png")}
            style={{
              width: 105,
              height: 100,
              marginVertical: 20,
              marginHorizontal: 20,
            }}
          />
        )}
        {/* <Text style={styles.slogan}>Every Farmer Best Friend</Text> */}
      </View>
    </View>
  );
}

export default CircleLogo;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  slogan: {
    top: -130,
  },
});
