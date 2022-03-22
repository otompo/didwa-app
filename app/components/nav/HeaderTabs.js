import React, { useContext } from "react";
import { View, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../../context/authContext";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import colors from "../../config/colors";
import { Badge } from "react-native-elements";

function HeaderTabs() {
  const [state, setState] = useContext(AuthContext);

  const handleAlert = async () => {
    alert("Please Coming soon");
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleAlert}>
        <Badge value="3" status="error" containerStyle={styles.badgeStyle} />
        <Icon name="bell" size={25} color={colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HeaderTabs;

const styles = StyleSheet.create({
  badgeStyle: {
    elevation: 6,
    position: "absolute",
    bottom: 10,
    left: 11,
  },
});
