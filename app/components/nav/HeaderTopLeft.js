import React, { useContext } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import { AuthContext } from "../../context/authContext";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import colors from "../../config/colors";

function HeaderTopLeft() {
  const [state, setState] = useContext(AuthContext);

  const handleAlert = async () => {
    alert("Please Coming soon");
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={{
          width: 30,
          height: 40,
        }}
      />
      <Text style={styles.text}>DiDwa</Text>
    </View>
  );
}

export default HeaderTopLeft;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    //   marginVertical: 15,
    marginBottom: 15,
    marginHorizontal: 110,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 10,
  },
  badgeStyle: {
    elevation: 6,
    position: "absolute",
    bottom: 10,
    right: -11,
  },
});
