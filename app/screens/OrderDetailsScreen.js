import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  FlatList,
} from "react-native";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import colors from "../config/colors";
import { Divider } from "react-native-elements";
import SubmitButton from "../components/SubmitButton";
import AppTextInput from "../components/auth/AppTextInput";
import moment from "moment";
import axios from "axios";
import FormatCurrency from "../components/FormatCurrency";

function OrderDetailsScreen({ route, navigation }) {
  const orders = route.params;
  const [qty, setQty] = useState("1");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setAmount(qty * orders.food.price);
  // }, [qty, orders.food.price]);

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
      <View
        style={{
          height: 70,
          justifyContent: "space-between",
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <Text style={styles.infoText}>
          Service Charge:
          <Text style={styles.subInfoText}>
            {FormatCurrency(orders.serviceCharge)}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          Transport Charge:
          <Text style={styles.subInfoText}>
            {FormatCurrency(orders.transportCharge)}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          Grand Total:
          <Text style={styles.subInfoText}>
            {FormatCurrency(orders.grandTotal)}
          </Text>
        </Text>
      </View>
      <FlatList
        data={orders.items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(order) => order._id.toString()}
        renderItem={({ item }) => (
          <ListItem
            image={{ uri: item.image.url }}
            title={item.name}
            subTitle={FormatCurrency(item.amount)}
            subSubTitle={item.extraInfo ? item.extraInfo : null}
            icon=""
          />
        )}
      />
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
  infoText: {
    fontWeight: "bold",
  },
  subInfoText: {
    color: colors.secoundary,
  },
});
