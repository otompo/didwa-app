import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import axios from "axios";
import Banner from "../components/Banner";
import colors from "../config/colors";
import AppText from "../components/AppText";
import ListItem from "../components/ListItem";
import { AuthContext } from "../context/authContext";

function ResturantDetailsScreen({ route, navigation }) {
  const restaurant = route.params;
  const slug = restaurant.slug;

  const [foods, setFoods] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.token !== "" && state.user !== null;

  useEffect(() => {
    loadSingleRestaurant();
  }, []);

  const loadSingleRestaurant = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/restaurant/${slug}`);
      setFoods(data.food);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Banner bannerData={restaurant.featuredImage} />

        <View>
          <View style={styles.textView}>
            <Text style={styles.itemTitle}>{restaurant.name}</Text>
            <Text style={styles.itemDescription}>{restaurant.location}</Text>
          </View>
        </View>
        <View>
          <View style={styles.descriptionCon}>
            <AppText style={styles.descriptionText}>
              {restaurant.description}
            </AppText>
          </View>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <FlatList
          data={foods}
          showsVerticalScrollIndicator={false}
          keyExtractor={(food) => food.slug.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subTitle={`${"GHC "}` + item.price + `${".00 "}`}
              image={{ uri: item.image.url }}
              onPress={() => navigation.navigate("FoodDetailsScreen", item)}
            />
          )}
        />
      )}
    </View>
  );
}

export default ResturantDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
