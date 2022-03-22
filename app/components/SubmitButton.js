import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import Text from "@kaloraat/react-native-text";

function SubmitButton({
  title,
  handleSubmit,
  loading,
  color = "primary",
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text medium style={styles.text}>
        {loading ? "Please wait..." : title}
      </Text>
    </TouchableOpacity>
  );
}

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
    marginBottom: 17,
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
  },
});
