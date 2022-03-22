import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Banner from "../components/Banner";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { Divider } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListItem from "../components/ListItem";
function ResturantDetailsScreen({ route, navigation }) {
  const restaurants = route.params;
  //   const router = useRoute();
  const slug = restaurants.slug;

  const [restaurant, setRestaurant] = useState({});
  const [foods, setFoods] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSingleRestaurant();
  }, []);

  const loadSingleRestaurant = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/restaurant/${slug}`);
      setRestaurant(data.restaurant);
      setFoods(data.food);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Banner bannerData={restaurants.featuredImage} />
      {/* <Text>{JSON.stringify(categorys, null, 4)}</Text> */}
      {/* <FlatList
        data={categorys}
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
      /> */}

      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
          <MaterialCommunityIcons
            name="eye"
            size={25}
            color={colors.secoundary}
          />
          <AppText>: {restaurants.views}</AppText>
        </View>
        <View style={{ flexDirection: "row", marginHorizontal: 20 }}>
          <MaterialCommunityIcons
            name="heart-broken"
            size={25}
            color={colors.secoundary}
          />
          <AppText> {restaurants.views}</AppText>
        </View>
      </View>
      <Divider width={1} />

      <View>
        <View style={styles.textView}>
          <Text style={styles.itemTitle}>{restaurants.name}</Text>
          <Text style={styles.itemDescription}>{restaurants.location}</Text>
        </View>
      </View>
      <View>
        <View style={styles.descriptionCon}>
          <AppText style={styles.descriptionText}>
            {restaurants.description}
          </AppText>
        </View>
      </View>

      {/* <ScrollView style={styles.userContainer}> */}
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <FlatList
          data={foods}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(food) => food.slug.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              price={`${"GHC "}` + item.price + `${".00 "}`}
              image={{ uri: item.image.url }}
              // onPress={() => console.log("FoodDetailsScreen", item)}
              onPress={() => navigation.navigate("FoodDetailsScreen", item)}
            />
          )}
        />
      )}
      {/* </ScrollView> */}
    </View>
  );
}

export default ResturantDetailsScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  image: {
    width: "100%",
    height: 400,
  },
  textView: {
    position: "absolute",
    backgroundColor: colors.primary,
    bottom: 70,
    marginVertical: 5,
    padding: 5,
  },
  itemTitle: {
    color: "white",
    fontSize: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: "bold",
    elevation: 5,
  },
  itemDescription: {
    color: "white",
    fontSize: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    marginHorizontal: 5,
  },
  descriptionCon: {
    padding: 5,
  },
  descriptionText: {
    color: colors.black,
    fontSize: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    marginHorizontal: 5,
  },
  categoryText: {
    fontSize: 16,
    color: colors.white,
    backgroundColor: colors.secoundary,
    height: 30,
    borderRadius: 15,
    padding: 3,
    margin: 5,
  },
});
