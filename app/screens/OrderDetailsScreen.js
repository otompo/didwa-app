import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView, Text } from "react-native";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import { Divider } from "react-native-elements";
import SubmitButton from "../components/SubmitButton";
import AppTextInput from "../components/auth/AppTextInput";
import moment from "moment";
import axios from "axios";

function OrderDetailsScreen({ route, navigation }) {
  const orders = route.params;
  const [qty, setQty] = useState("1");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAmount(qty * orders.food.price);
  }, [qty, orders.food.price]);

  const handleSubmit = async () => {
    setLoading(true);
    if (!qty) {
      alert("fields are requied");
      setLoading(false);
      return;
    }

    if (qty <= 0) {
      alert("Minimum quantity should be 1");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`/food/order`, {
        restaurant: orders.restaurant._id,
        food: orders.food._id,
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
      <Image style={styles.image} source={{ uri: orders.food.image.url }} />
      <View style={styles.detailsContain}>
        <AppText style={styles.title}>Order Details</AppText>
        <AppText style={styles.price}>Name: {orders.food.name}</AppText>
        <AppText style={styles.price}>
          Price: <Text>GHC</Text> {orders.food.price}
          <Text>.00</Text>
        </AppText>
        <AppText style={styles.price}>
          Amount Paid: <Text>GHC</Text> {orders.amountToPaid}
          <Text>.00</Text>
        </AppText>
        <AppText style={styles.price}>
          <Text>Qty Ordered:</Text> {orders.qty}
        </AppText>
        <AppText style={styles.price}>
          <Text>Time:</Text> {moment(orders.createdAt).fromNow()}
        </AppText>
        <Divider width={1} />
      </View>
      <ScrollView style={styles.Contain} showsVerticalScrollIndicator={false}>
        <AppText
          style={{ color: colors.black, fontSize: 20, marginHorizontal: 20 }}
        >
          You can place an order again...
        </AppText>
        <View>
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
              Amount to Pay: GHC {qty * orders.food.price}.00
            </Text>
          </View>
          <SubmitButton
            title="Order"
            loading={loading}
            onPress={handleSubmit}
          />
        </View>
        <View style={styles.userContainer}>
          <ListItem
            image={{ uri: orders.restaurant.featuredImage[0].url }}
            title={`${orders.restaurant.name}`}
            subTitle={`${orders.restaurant.location}`}
            // onPress={() =>
            //   console.log("RestaurantDetailsScreen", foods.restaurant)
            // }
            onPress={() =>
              navigation.navigate("RestaurantDetailsScreen", orders.restaurant)
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 320,
  },
  Contain: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 3,
    color: colors.white,
  },
  price: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
  },
  userContainer: {
    marginVertical: 10,
  },
  detailsContain: {
    position: "absolute",
    top: 20,
    // backgroundColor: colors.primary,
    // opacity: 0.9,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    padding: 7,
    borderRadius: 10,
  },
});
