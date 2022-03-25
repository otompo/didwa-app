import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "@kaloraat/react-native-text";
import { Divider, Badge } from "react-native-elements";
import colors from "../../config/colors";
import { AuthContext } from "../../context/authContext";

export const Tabs = ({ title, icon, screenName, handlePress, routeName }) => {
  const activeScreenColor = screenName === routeName && `${colors.white}`;

  return (
    <TouchableOpacity onPress={handlePress}>
      <>
        <MaterialCommunityIcons
          name={icon}
          size={25}
          style={{ marginBottom: 3, alignSelf: "center" }}
          color={activeScreenColor}
        />
        <Text light style={{ color: activeScreenColor }}>
          {title}
        </Text>
      </>
    </TouchableOpacity>
  );
};

function FooterTabs() {
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.token !== "" && state.user !== null;

  const navigation = useNavigation();
  const route = useRoute();
  // console.log(navigation);
  return (
    <>
      <Divider width={1} />
      <View style={styles.footerStyle}>
        <Tabs
          title="Home"
          icon="home"
          screenName="Home"
          routeName={route.name}
          handlePress={() => navigation.navigate("Home")}
        />

        <Tabs
          title="Restaurants"
          icon="silverware-variant"
          screenName="Restaurants"
          routeName={route.name}
          handlePress={() => navigation.navigate("Restaurants")}
          // handlePress={
          //   authenticated
          //     ? () => navigation.navigate("Restaurants")
          //     : () => navigation.navigate("Signin")
          // }
        />

        {/* <Badge value="3" status="error" containerStyle={styles.badgeStyle} /> */}

        <Tabs
          title="Market"
          icon="basket"
          screenName="Market"
          routeName={route.name}
          handlePress={
            authenticated
              ? () => navigation.navigate("Market")
              : () => navigation.navigate("Signin")
          }
        />

        <Tabs
          title="Profile"
          icon="account-circle"
          screenName="Profile"
          routeName={route.name}
          handlePress={
            authenticated
              ? () => navigation.navigate("Profile")
              : () => navigation.navigate("Signin")
          }
        />
      </View>
    </>
  );
}

export default FooterTabs;
const styles = StyleSheet.create({
  footerStyle: {
    flexDirection: "row",
    marginHorizontal: 30,
    // margin: 10,
    justifyContent: "space-between",
  },
  badgeStyle: {
    elevation: 5,
    position: "absolute",
    top: -8,
    left: 187,
  },
});
