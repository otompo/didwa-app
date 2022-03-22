import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Text,
} from "react-native";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Divider } from "react-native-elements";
import SubmitButton from "../components/SubmitButton";
import AppTextInput from "../components/auth/AppTextInput";
import { FoodContext } from "../context/foodContext";
import Card from "../components/Card";
import { AuthContext } from "../context/authContext";

function FoodDetailsScreen({ route, navigation }) {
  const foods = route.params;
  //   const [food, setFood] = useState({});
  const [mills, setMills] = useContext(FoodContext);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const [qty, setQty] = useState("1");
  const [amount, setAmount] = useState("");
  const authenticated = state && state.token !== "" && state.user !== null;

  // console.log(foods._id);
  useEffect(async () => {
    await AsyncStorage.setItem("food", JSON.stringify(foods));
    setMills(foods);
    setAmount(qty * mills.price);
  }, [foods.slug, qty, mills.price]);

  //   const loadSingleFood = async () => {
  //     try {
  //       setLoading(true);
  //       const { data } = await axios.get(`/food/${foods.slug}`);
  //       setFood(data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.log(err);
  //       setLoading(false);
  //     }
  //   };

  const handleSubmit = async () => {
    setLoading(true);
    if (!qty) {
      alert("fields are requied");
      setLoading(false);
      return;
    }

    if (qty <= 0) {
      alert("Enter quantity 1 above");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`/food/order`, {
        restaurant: foods.restaurant.name,
        food: foods._id,
        amount,
        qty,
      });
      // console.log(data);
      alert("Order Success");
      setQty("1");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {/* <Text>{JSON.stringify(mills, null, 4)}</Text> */}
      <Image style={styles.image} source={{ uri: foods.image.url }} />
      <ScrollView style={styles.Contain} showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContain}>
          <AppText style={styles.title}>{mills.name}</AppText>

          <AppText style={styles.price}>
            <Text>GHC</Text> {mills.price}
            <Text>.00</Text>
          </AppText>
          <Divider width={1} />
        </View>
        <View style={styles.detailsContain}>
          <View style={{ flexDirection: "row" }}>
            {/* <AppText style={styles.title}>Qty:</AppText> */}
            <AppTextInput
              autoCapitalize="none"
              autoCorrect={false}
              icon="pasta"
              placeholder="Quantity..."
              keyboardType="numeric"
              value={qty}
              setValue={setQty}
            />
          </View>
          <View>
            <Text style={{ color: colors.danger }}>
              Amount to Pay: GHC {qty * mills.price}.00
            </Text>
          </View>
          {authenticated ? (
            <SubmitButton
              title="Order"
              loading={loading}
              onPress={handleSubmit}
            />
          ) : (
            <SubmitButton
              title="Please Signin"
              onPress={() => navigation.navigate("Signin")}
            />
          )}

          <Text medium style={{ padding: 5 }}>
            Categories:
          </Text>
          <FlatList
            data={foods.category}
            horizontal
            keyExtractor={(category) => category._id.toString()}
            renderItem={({ item }) => (
              <AppText
                style={styles.categoryText}
                onPress={() => console.log(item)}
              >
                {" "}
                {item.title}
              </AppText>
            )}
          />
        </View>
        {/* <AppText>{food.restaurant.location}</AppText> */}
        <View style={styles.userContainer}>
          <ListItem
            image={{ uri: foods.restaurant.featuredImage[0].url }}
            title={`${foods.restaurant.name}`}
            subTitle={`${foods.restaurant.location}`}
            // onPress={() =>
            //   console.log("RestaurantDetailsScreen", foods.restaurant)
            // }
            onPress={() =>
              navigation.navigate("RestaurantDetailsScreen", foods.restaurant)
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default FoodDetailsScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 360,
  },
  Contain: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 3,
  },
  price: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: "bold",
  },
  userContainer: {
    marginVertical: 40,
  },
  categoryText: {
    fontSize: 16,
    color: colors.white,
    backgroundColor: colors.secoundary,
    height: 30,
    borderRadius: 15,
    padding: 3,
    marginLeft: 5,
  },
});
