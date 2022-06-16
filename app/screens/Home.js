import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Keyboard,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import Menu from "../components/Menu";
import FooterTabs from "../components/nav/FooterTabs";
import Search from "../components/Search";
import SpeedDial from "../components/SpeedDial";
import colors from "../config/colors";
import ProductCard from "../components/ProductCard";
import FoodTopTitle from "../components/FoodTopTitle";
import axios from "axios";
import FrontBanner from "../components/FrontBanner";
import ListItem from "../components/ListItem";
import { FontAwesome } from "@expo/vector-icons";
import { dummyData } from "../data/IngredientsData";
import Modal from "react-native-modal";
import CartInputText from "../components/CartInputText/CartInputText";
import FormatCurrency from "../components/FormatCurrency";
import SubmitButton from "../components/SubmitButton";
import { CartContext } from "../context/cartContext";
import { addToCart } from "../actions/Actions";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

function Home({ navigation }) {
  const { stateData, dispatch } = useContext(CartContext);
  const { cart } = stateData;
  // console.log("cart", cart);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [success, setSuccess] = useState(false);
  // const [showIcon, setShowIcon] = useState(false);
  const [foods, setFoods] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [foodsCount, setFoodsCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [cartData, setCartData] = useState({});
  const [amount, setAmount] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  // console.log(cartData);
  const { width } = useWindowDimensions();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // console.log(foodsCount);
  useEffect(() => {
    // loadFoods();
    loadProducts();
    loadFoodsList();
    getCategories();
    loadFoodsCount();
    setIngredientsData(dummyData);
  }, []);
  useEffect(() => {}, [cart]);

  const loadFoodsList = async () => {
    try {
      setSuccess(true);
      const { data } = await axios.get(`/products/productslist`);
      setProductsList(data);
      setSuccess(false);
      // console.log(data.foods);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };

  const loadFoodsCount = async () => {
    try {
      setSuccess(true);
      const { data } = await axios.get(`/food/foods-count`);
      setFoodsCount(data);
      setSuccess(false);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`/admin/category/ingredients`);
      setCategories(data.categories);
      // console.log(data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const loadFoods = async () => {
    try {
      setSuccess(true);
      const { data } = await axios.get(`/food`);
      setFoods(data.foods);
      setSuccess(false);
      // console.log(data.foods);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };

  const loadProducts = async () => {
    try {
      setSuccess(true);
      const { data } = await axios.get(`/products`);
      // console.log(data);
      setProducts(data);
      setSuccess(false);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
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

  const searched = (keyword) => (item) => {
    return item.name.toLowerCase().includes(keyword.toLowerCase());
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        {foodsCount > foods?.length && (
          <View
            style={{
              width: 170,
              height: 150,
              backgroundColor: "rgba(52, 52, 52, 0.5)",
              borderRadius: 10,
              marginHorizontal: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate("Food")}
              // style={styles.loadMoreBtn}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: colors.light,
                  borderRadius: 25,
                  marginHorizontal: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome name="arrow-right" size={35} />
              </View>
              <Text style={styles.btnText}>Load More Food</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadProducts();
      // loadFoodsList();
      // getCategories();
      // loadFoodsCount();
      // setSuccess(false);
      setRefreshing(false);
    }, 2000);
  };

  const handlePress = () => {
    setKeyword("");
    Keyboard.dismiss();
  };

  return (
    <>
      <Search
        value={keyword}
        setValue={setKeyword}
        placeholder="Search foodstuff..."
        handlePress={handlePress}
      />

      {keyword ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {productsList.length > 0 ? (
              productsList.filter(searched(keyword)).map((product, i) => (
                <ListItem
                  key={i}
                  image={{ uri: product.image.url }}
                  title={product.name}
                  size={25}
                  onPress={() => {
                    setKeyword("");
                    setModalVisible(!isModalVisible);
                    setCartData(product);
                    Keyboard.dismiss();
                  }}
                />
              ))
            ) : (
              <View
                style={{
                  marginVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: colors.danger }}>No Result found</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.footerTabs}>
            <View style={{ backgroundColor: colors.secoundary }}>
              <FooterTabs />
            </View>
          </View>
        </>
      ) : (
        <>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            style={styles.flatList}
            keyExtractor={(category) => category._id.toString()}
            renderItem={({ item }) => (
              <Menu
                title={item.name}
                // icon={item.icon}
                onPress={() => navigation.navigate("CategoryDetails", item)}
              />
            )}
          />

          {/* <View style={styles.banner}>
            <FrontBanner />
          </View> */}

          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            // style={{ marginTop: 20, backgroundColor: colors.danger }}
          >
            <SafeAreaView style={styles.MainContainer}>
              <FoodTopTitle title="Want to buy some foodstuff ?..." />
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
                        <FontAwesome
                          name="close"
                          size={30}
                          color={colors.medium}
                        />
                      </TouchableOpacity>
                    </View>
                    {/* Form */}

                    <CartInputText
                      value={amount}
                      setValue={setAmount}
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
                      {/* {Number(amount) >= cartData.minAmount ? (
                        <SubmitButton
                          title="Add to Cart"
                          onPress={() => {
                            dispatch(
                              addToCart(cartData, cart, amount, extraInfo)
                            ),
                              setModalVisible(false);
                            setAmount("");
                            setExtraInfo("");
                          }}
                        />
                      ) : (
                        <Text>
                          Please amount of {FormatCurrency(Number(amount))} is
                          less
                        </Text>
                      )} */}

                      <SubmitButton
                        title="Add to Cart"
                        disabled={
                          Number(amount) >= cartData.minAmount ? false : true
                        }
                        onPress={() => {
                          dispatch(
                            addToCart(cartData, cart, amount, extraInfo)
                          ),
                            setModalVisible(false);
                          setAmount("");
                          setExtraInfo("");
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

            {/* <SpeedDial /> */}
          </ScrollView>
          <View style={styles.footerTabs}>
            <View style={{ backgroundColor: colors.secoundary }}>
              <FooterTabs />
            </View>
          </View>
        </>
      )}
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  footerTabs: {
    // flex: 1,
    justifyContent: "flex-end",
  },
  popularContainer: {
    //   flex: 1,
    width: 170,
    height: 190,
    borderRadius: 20,
    // marginTop: 10,
    backgroundColor: colors.light,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 3,
  },
  titleContainer: {
    position: "absolute",
    top: 65,
    // height: 38,
    backgroundColor: colors.primary,
    elevation: 4,
    // alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 170,
    height: 150,
    borderRadius: 10,
  },
  footer: {
    // padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#800000",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  banner: {
    marginTop: 20,
  },

  MainContainer: {
    flex: 1,
    marginVertical: 20,
    justifyContent: "space-between",
  },
  flatList: {
    height: 62,
    flexGrow: 0,
  },
});
