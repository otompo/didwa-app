import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import FooterTabs from "../components/nav/FooterTabs";
import ListItem from "../components/ListItem";
import ProductCard from "../components/ProductCard";
import colors from "../config/colors";
import { FontAwesome } from "@expo/vector-icons";
import Modal from "react-native-modal";
import axios from "axios";
import FoodTopTitle from "../components/FoodTopTitle";
import CartInputText from "../components/CartInputText/CartInputText";
import FormatCurrency from "../components/FormatCurrency";
import SubmitButton from "../components/SubmitButton";
import { CartContext } from "../context/cartContext";
import { addToCart } from "../actions/Actions";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

function CategoryDetails({ route, navigation }) {
  const { stateData, dispatch } = useContext(CartContext);
  const { cart } = stateData;
  const category = route.params;
  const id = category._id;
  const [products, setProducts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [cartData, setCartData] = useState({});
  const [amount, setAmount] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const { width } = useWindowDimensions();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getProductCategory();
  }, [cart]);

  const getProductCategory = async () => {
    try {
      setSuccess(true);
      const { data } = await axios.get(`/products/category/${id}`);
      setProducts(data);
      setSuccess(false);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getProductCategory();
      setRefreshing(false);
    }, 2000);
  };
  if (success) {
    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#fff",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/loader.gif")}
          style={{ height: 100, width: 100 }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        ImageBackground
        blurRadius={5}
        source={{
          uri: "https://res.cloudinary.com/sky-tech/image/upload/v1648316657/didwa/images/WhatsApp_Image_2022-03-26_at_4.39.39_PM_xsxfxe.jpg",
        }}
        style={styles.infoTop}
      >
        <Text
          style={{
            fontSize: 25,
            color: colors.white,
            fontWeight: "bold",
            marginHorizontal: 15,
          }}
        >
          List Of {category.name}
        </Text>
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FoodTopTitle title="Want to buy some foodstuff ?..." />

        <SafeAreaView style={styles.MainContainer}>
          <>
            <FlatList
              data={products}
              keyExtractor={(product) => product.slug.toString()}
              numColumns={2}
              renderItem={({ item }) => (
                <ProductCard
                  name={item.name}
                  image={item.image.url}
                  thumbnailUrl={item.image.url}
                  onPress={() => {
                    setModalVisible(!isModalVisible);
                    setCartData(item);
                  }}
                />
              )}
            />
            <Modal isVisible={isModalVisible}>
              <View
                style={{
                  // flex: 1,
                  color: colors.white,
                  backgroundColor: colors.white,
                  borderRadius: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                    Item:{" "}
                    <Text style={{ color: colors.secoundary }}>
                      {cartData && cartData.name}
                    </Text>
                  </Text>

                  <TouchableOpacity
                    onPress={toggleModal}
                    style={{ marginRight: 10 }}
                  >
                    <FontAwesome name="close" size={30} color={colors.medium} />
                  </TouchableOpacity>
                </View>
                {/* Form */}

                <CartInputText
                  value={amount}
                  setValue={setAmount}
                  autoCapitalize="words"
                  keyboardType="numeric"
                  placeholder="Enter Amount"
                  autoCorrect={false}
                />
                <CartInputText
                  value={extraInfo}
                  setValue={setExtraInfo}
                  autoCorrect={false}
                  autoCapitalize="words"
                  keyboardType="default"
                  placeholder="Enter any extra information"
                />
                <View
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>
                    Enter amount of{" "}
                    <Text style={{ color: colors.secoundary }}>
                      {FormatCurrency(Number(cartData.minAmount))}
                    </Text>
                    or above
                  </Text>
                </View>

                <View
                  style={{
                    marginHorizontal: 35,
                    alignContent: "center",
                  }}
                >
                  <SubmitButton
                    title="Add to Cart"
                    disabled={
                      Number(amount) >= cartData.minAmount ? false : true
                    }
                    onPress={() => {
                      dispatch(addToCart(cartData, cart)),
                        setModalVisible(false);
                    }}
                  />
                </View>
                <View
                  style={{
                    marginHorizontal: 35,
                    // alignItems: "center",
                  }}
                >
                  <RenderHtml
                    contentWidth={width}
                    source={{
                      html: `${
                        cartData.description ? cartData.description : ""
                      }`,
                    }}
                  />
                </View>

                <View
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 35,
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View>
                    {amount < Number(cartData.minAmount) ? (
                      <Text
                        style={{
                          color: colors.danger,
                        }}
                      >
                        Please amount of {FormatCurrency(Number(amount))} is
                        less
                      </Text>
                    ) : (
                      <></>
                    )}
                  </View>
                </View>
              </View>
            </Modal>
          </>
        </SafeAreaView>
      </ScrollView>

      <View style={styles.footerTabs}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
}

export default CategoryDetails;

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
