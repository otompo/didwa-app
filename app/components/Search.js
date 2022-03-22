import React from "react";
import { TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../config/colors";

function Search({ value, setValue, placeholder }) {
  return (
    <View>
      <TextInput
        style={{
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
          elevation: 8,
        }}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder={placeholder}
        autoCapitalize="none"
      />
    </View>
  );
}

export default Search;
