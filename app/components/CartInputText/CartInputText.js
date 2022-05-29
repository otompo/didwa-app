import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

function CartInputText({
  name,
  value,
  setValue,
  autoCapitalize = "none",
  keyboardType = "default",
  secureTextEntry = false,
  placeholder,
}) {
  return (
    <View style={{ marginHorizontal: 24 }}>
      {/* <Text semi>{name}</Text> */}
      <TextInput
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        style={styles.text}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
}

export default CartInputText;

const styles = StyleSheet.create({
  text: {
    borderBottomWidth: 0.5,
    height: 28,
    borderBottomColor: "#8e993a",
    borderRadius: 2,
    marginBottom: 30,
  },
});
