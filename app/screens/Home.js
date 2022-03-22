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
import Banner from "../components/Banner";
import { dummyData } from "../data/Data";
import Menu from "../components/Menu";
import FooterTabs from "../components/nav/FooterTabs";
import Screen from "../components/Screen";
import Search from "../components/Search";
import SpeedDial from "../components/SpeedDial";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { categoryData } from "../data/Categories";
import FoodCard from "../components/FoodCard";
import FoodTopTitle from "../components/FoodTopTitle";
import axios from "axios";
import FrontBanner from "../components/FrontBanner";

function Home({ navigation }) {
  const [keyword, setKeyword] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    loadFoods();
  }, [loading]);

  const loadFoods = async () => {
    try {
      setSuccess(true);
      const { data } = await axios.get(`/admin/food`);
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

  return (
    <>
      <Search
        value={keyword}
        setValue={setKeyword}
        placeholder="Search food..."
      />
      <Menu />
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
              marginTop: 20,
              // marginBottom: 5,
              marginHorizontal: 20,
            }}
          >
            Let's buy you ingredients...
          </Text>
        </View>
        <View style={{ flex: 1, marginVertical: 20 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => navigation.navigate("Market")}>
              <View style={{ marginHorizontal: 10, justifyContent: "center" }}>
                <Image
                  source={require("../assets/okrastew.jpg")}
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
                    okra stew
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Market")}>
              <View style={{ marginHorizontal: 10, justifyContent: "center" }}>
                <Image
                  source={require("../assets/okrastew.jpg")}
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
                    green soup
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Market")}>
              <View style={{ marginHorizontal: 10, justifyContent: "center" }}>
                <Image
                  source={require("../assets/okrastew.jpg")}
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
                    okra soup
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* <Banner /> */}

        {/* <SpeedDial /> */}
      </ScrollView>
      <View style={styles.footerTabs}>
        <View style={{ backgroundColor: colors.secoundary }}>
          <FooterTabs />
        </View>
      </View>
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
});
