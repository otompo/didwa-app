import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { removeFromCart } from "../actions/Actions";
import ListItem from "../components/ListItem";
import ListItemDeleteAction from "../components/ListItemDeleteAction";
import ListItemsSeprator from "../components/ListItemsSeprator";
import FooterTabs from "../components/nav/FooterTabs";
import colors from "../config/colors";
import { CartContext } from "../context/cartContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import FormatCurrency from "../components/FormatCurrency";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import useServiceCharge from "../hooks/useServiceCharge";

// AuthContext

function CartItemDetails() {
  const [state, setState] = useContext(AuthContext);
  const { stateData, dispatch } = useContext(CartContext);
  const { cart } = stateData;
  const [loading, setLoading] = useState(false);
  const authenticated = state && state.token !== "" && state.user !== null;
  const navigation = useNavigation();

  const [amount, setAmount] = useState("");

  const { serviceCharge, setServiceCharge } = useServiceCharge();
  // const [transportCharge, setTransportCharge] = useState(0);
  const [grandTotal, setGandTotal] = useState(0);
  // console.log(serviceCharge);

  useEffect(() => {
    setGandTotal(serviceCharge + amount);
  }, [serviceCharge, amount]);

  useEffect(() => {
    const getTotalAmount = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.amount;
      }, 0);

      setAmount(res);
    };

    // const getServiceCharge = () => {
    //   const res = cart.reduce((prev, item) => {
    //     return prev + item.amount * 0.059;
    //   }, 0);

    //   setServiceCharge(res);
    // };

    // const getTransportCharge = () => {
    //   const res = cart.reduce((prev, item) => {
    //     return prev + item.amount * 0.01;
    //   }, 0);

    //   setTransportCharge(res);
    // };

    getTotalAmount();

    // getServiceCharge();
    // getTransportCharge();
  }, [cart]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/orders/ingredients`, {
        cart,
        serviceCharge,
        // transportCharge,
        grandTotal,
      });
      // console.log(data);
      setLoading(false);
      alert("Order placed success");
      dispatch({ type: "ADD_CART", payload: [] });
      setGandTotal(0);
      setServiceCharge(0);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: 10 }}>
        <Text
          style={{ fontSize: 18, fontWeight: "normal", color: colors.dark }}
        >
          Service Charge:{" "}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "normal",
              color: colors.secoundary,
            }}
          >
            {cart && cart.length === 0 ? (
              <></>
            ) : (
              FormatCurrency(Number(serviceCharge))
            )}
          </Text>
        </Text>
        {/* <Text
          style={{ fontSize: 18, fontWeight: "normal", color: colors.dark }}
        >
          Transport Charge:{" "}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "normal",
              color: colors.secoundary,
            }}
          >
            {FormatCurrency(Number(transportCharge))}
          </Text>
        </Text> */}
        <Text
          style={{ fontSize: 18, fontWeight: "normal", color: colors.dark }}
        >
          Grand Total:{" "}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "normal",
              color: colors.secoundary,
            }}
          >
            {cart && cart.length === 0 ? (
              <></>
            ) : (
              FormatCurrency(Number(grandTotal))
            )}
          </Text>
        </Text>
      </View>

      {cart.length === 0 ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Icon name="shopping-cart" size={85} color={colors.primary} />

            <Text style={{ fontSize: 20, color: colors.primary }}>
              Cart is Empty
            </Text>

            <View>
              <Text style={{ fontSize: 16, color: colors.dark }}>
                Tap to Shop more Items
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(cart) => cart._id.toString()}
            renderItem={({ item }) => (
              <ListItem
                title={item.name}
                image={{ uri: item.image.url }}
                size={20}
                subTitle={`Amount: ${FormatCurrency(Number(item.amount))}`}
                subSubTitle={`Info: ${item.extraInfo}`}
                renderRightActions={() => (
                  <ListItemDeleteAction
                    onPress={() => dispatch(removeFromCart(cart, item._id))}
                  />
                )}
              />
            )}
            ItemSeparatorComponent={ListItemsSeprator}
          />
          <View
            style={{
              marginVertical: 5,
              marginHorizontal: 35,
              alignContent: "center",
            }}
          >
            {authenticated ? (
              <SubmitButton
                title="Submit"
                onPress={handleSubmit}
                loading={loading}
              />
            ) : (
              <SubmitButton
                title="Please Signin"
                color="danger"
                onPress={() => navigation.navigate("Signin")}
              />
            )}
          </View>
        </>
      )}
      {/* <View>
        <Text>{JSON.stringify(cart, null, 2)}</Text>
      </View> */}
      <View style={styles.footerTabs}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
}

export default CartItemDetails;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    borderColor: colors.primary,
    marginRight: 10,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  footerTabs: {
    justifyContent: "flex-end",
    backgroundColor: colors.secoundary,
  },
  infoTop: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
