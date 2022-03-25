import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Menu from "../components/Menu";
import FooterTabs from "../components/nav/FooterTabs";
import Search from "../components/Search";
import SpeedDial from "../components/SpeedDial";
import colors from "../config/colors";
import FoodCard from "../components/FoodCard";
import FoodTopTitle from "../components/FoodTopTitle";
import axios from "axios";
import FrontBanner from "../components/FrontBanner";
import ListItem from "../components/ListItem";
import { FontAwesome } from "@expo/vector-icons";
import { dummyData } from "../data/IngredientsData";

function Home({ navigation }) {
  const [ingredientsData, setIngredientsData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [foodsCount, setFoodsCount] = useState(0);
  // console.log(foodsCount);
  useEffect(() => {
    loadFoods();
    loadFoodsList();
    getCategories();
    loadFoodsCount();
    setIngredientsData(dummyData);
  }, []);

  const loadFoodsList = async () => {
    try {
      setSuccess(true);
      const { data } = await axios.get(`/food/foodlist`);
      setFoodList(data);
      setSuccess(false);
      // console.log(data.foods);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };

  const loadFoodsCount = async () => {
    const { data } = await axios.get(`/food/foods-count`);
    setFoodsCount(data);
  };

  const getCategories = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get(`/admin/category`);
      setCategories(data.categories);
      // console.log(data.categories);
      // setLoading(false);
    } catch (err) {
      console.log(err);
      // setLoading(false);
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
  return (
    <>
      <Search
        value={keyword}
        setValue={setKeyword}
        placeholder="Search food..."
      />
      {keyword ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {foodList &&
              foodList
                .filter(searched(keyword))
                .map((food, i) => (
                  <ListItem
                    key={i}
                    image={{ uri: food.image.url }}
                    subTitle={`${"GHC "}` + food.price + `${".00 "}`}
                    subSubTitle={food.restaurant.name}
                    title={food.name}
                    onPress={() =>
                      navigation.navigate("FoodDetailsScreen", food)
                    }
                  />
                ))}
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
            keyExtractor={(category) => category._id.toString()}
            renderItem={({ item }) => (
              <Menu
                title={item.title}
                icon={item.icon}
                onPress={() => navigation.navigate("CategoryDetails", item)}
              />
            )}
          />

          {/* Menu ends */}
          <View>
            <FrontBanner />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FoodTopTitle title="Want to buy some food?..." />
            <FlatList
              data={foods}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(food) => food.slug.toString()}
              ListFooterComponent={renderFooter}
              enableEmptySections={true}
              renderItem={({ item }) => (
                <FoodCard
                  title={item.name}
                  price={`${"GHC "}` + item.price + `${".00 "}`}
                  image={item.image.url}
                  thumbnailUrl={item.image.url}
                  // image={{ uri: item.image.url }}
                  onPress={() => navigation.navigate("FoodDetailsScreen", item)}
                />
              )}
            />

            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  // marginTop: 20,
                  // marginBottom: 5,
                  marginHorizontal: 20,
                }}
              >
                Let's buy you ingredients...
              </Text>
            </View>
            <View style={{ flex: 1, marginVertical: 20 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {ingredientsData &&
                  ingredientsData.map((ingredient, i) => (
                    <View key={i}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Market")}
                      >
                        <View
                          style={{
                            marginHorizontal: 10,
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={{ uri: ingredient.url }}
                            style={styles.image}
                          />

                          <View style={styles.titleContainer}>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 20,
                                color: colors.white,
                                marginHorizontal: 10,
                              }}
                            >
                              {ingredient.name}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
              </ScrollView>
            </View>

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
});
