import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import FoodListCard from "../components/FoodListCard";
import FoodCard from "../components/FoodCard";
import ListItem from "../components/ListItem";
import FooterTabs from "../components/nav/FooterTabs";
import Search from "../components/Search";
import colors from "../config/colors";
function Food({ navigation }) {
  const [keyword, setKeyword] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadFoodsList();
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
