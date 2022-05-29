import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
  Keyboard,
} from "react-native";
import FoodListCard from "../components/FoodListCard";
import ListItem from "../components/ListItem";
import Search from "../components/Search";

function Food({ navigation }) {
  const [keyword, setKeyword] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadFoodsList();
  }, []);

  const loadFoodsList = async () => {
    try {
      setSuccess(true);
      const { data } = await axios.get(`/food/foodlist`);
      setFoodList(data);
      setSuccess(false);
      // console.log(data);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };

  const searched = (keyword) => (item) => {
    return item.name.toLowerCase().includes(keyword.toLowerCase());
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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadFoodsList();
      setSuccess(false);
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
        placeholder="Search food..."
        handlePress={handlePress}
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
          {/* <View style={styles.footerTabs}>
            <View style={{ backgroundColor: colors.secoundary }}>
              <FooterTabs />
            </View>
          </View> */}
        </>
      ) : (
        <>
          <FlatList
            data={foodList}
            showsVerticalScrollIndicator={false}
            keyExtractor={(food) => food.slug.toString()}
            enableEmptySections={true}
            renderItem={({ item }) => (
              <FoodListCard
                title={item.name}
                subTitle={`GHC ${item.price}.00`}
                subSubTitle={item.restaurant.name}
                image={item.image.url}
                onPress={() => navigation.navigate("FoodDetailsScreen", item)}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />

          {/* <View style={styles.footerTabs}>
          <View style={{ backgroundColor: colors.secoundary }}>
            <FooterTabs />
          </View>
        </View> */}
        </>
      )}
    </>
  );
}

export default Food;

const styles = StyleSheet.create({});
