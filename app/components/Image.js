import React from "react";
import { View, StyleSheet, Image } from "react-native";

function ImageCard({ image }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
    </View>
  );
}

export default ImageCard;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 400,
  },
});
