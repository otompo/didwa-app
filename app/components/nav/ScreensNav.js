import React, { useContext, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../../config/colors";
import {
  View,
  Text,
  TouchableNativeFeedbackBase,
  TouchableOpacity,
} from "react-native";
import Home from "../../screens/Home";
import Restaurants from "../../screens/Restaurants";
import Market from "../../screens/Market";
import Profile from "../../screens/Profile";
import Signin from "../../screens/Signin";
import Signup from "../../screens/Signup";
import { AuthContext } from "../../context/authContext";
import HeaderTabs from "./HeaderTabs";
import RestaurantDetailsScreen from "../../screens/RestaurantDetailsScreen";
import FoodDetailsScreen from "../../screens/FoodDetailsScreen";
import HeaderTopLeft from "./HeaderTopLeft";

const Stack = createNativeStackNavigator();

export default function ScreensNav() {
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.token !== "" && state.user !== null;

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          fontWeight: "200",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "",
          headerShown: true,
          // headerRight: () => (
          //   <View>
          //     <Text>Hi</Text>
          //   </View>
          // ),
          headerLeft: () => <HeaderTopLeft />,
        }}
      />
      <Stack.Screen
        name="Restaurants"
        component={Restaurants}
        options={{
          title: "",
          headerShown: true,
          // headerRight: () => (
          //   <View>
          //     <Text>Hi</Text>
          //   </View>
          // ),
          headerLeft: () => <HeaderTopLeft />,
        }}
      />
      <Stack.Screen
        name="Market"
        component={Market}
        options={{
          title: "",
          headerShown: true,
          // headerRight: () => <HeaderTabs />,
          headerLeft: () => <HeaderTopLeft />,
        }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerShown: true,
          headerRight: () => <HeaderTabs />,
          headerLeft: () => <></>,
        }}
      />
      <Stack.Screen
        name="RestaurantDetailsScreen"
        component={RestaurantDetailsScreen}
        options={{
          title: "DiDwa",
          headerShown: true,
          headerRight: () => <HeaderTabs />,
          headerLeft: () => <></>,
        }}
      />
      <Stack.Screen
        name="FoodDetailsScreen"
        component={FoodDetailsScreen}
        // options={{
        //   title: "",
        //   headerShown: true,
        //   headerRight: () => <HeaderTabs />,
        // }}
      />

      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
