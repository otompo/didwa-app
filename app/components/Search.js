import React from "react";
import { TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
// import styles from "../config/styles";

function Search({ value, setValue, placeholder, handlePress }) {
  return (
    <View>
      <TextInput
        style={styles.container}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        autoCapitalize="none"
      />

      {value ? (
        <TouchableOpacity
          onPress={handlePress}
          style={{
            position: "absolute",
            right: 30,
            top: 18,
            elevation: 3,
          }}
        >
          <FontAwesome name="close" size={20} />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            position: "absolute",
            right: 30,
            top: 18,
            elevation: 3,
          }}
        >
          <FontAwesome name="search" size={20} />
        </View>
      )}
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginTop: 5,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 2,
  },
});
