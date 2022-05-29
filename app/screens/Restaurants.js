import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import FooterTabs from "../components/nav/FooterTabs";
import colors from "../config/colors";
import { RestaurantContext } from "../context/restaurant";
import Card from "../components/Card";
import axios from "axios";

function Restaurants({ navigation }) {
  const [success, setSuccess] = useState(false);
  // const [restaurants, setRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useContext(RestaurantContext);
  // console.log("restaurants", restaurants);
  useEffect(() => {
    loadRestaurants();
  }, []);

  // console.log(restaurants.featuredImage);
  const loadRestaurants = async () => {
    try {
      setSuccess(true);
      const { data } = await axios.get(`/admin/restaurant`);
      // setRestaurants(data.restaurants);
      setRestaurants([...restaurants, ...data.restaurants]);
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

  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        {restaurants &&
          restaurants.map((restaurant, i) => (
            <View key={i}>
              <Card
                title={restaurant.name}
                subTitle={restaurant.location}
                restaurant={restaurant}
                // subSubTitle={restaurant.description}
                image={
                  restaurant &&
                  restaurant.featuredImage &&
                  restaurant.featuredImage[0].url
                }
                onPress={() =>
                  navigation.navigate("RestaurantDetailsScreen", restaurant)
                }
              />
            </View>
          ))}
      </ScrollView>
      <View style={styles.footerTabs}>
        <FooterTabs />
      </View>
    </View>
  );
}

export default Restaurants;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  footerTabs: {
    //   flex: 1,
    justifyContent: "flex-end",
    backgroundColor: colors.secoundary,
    height: 48,
  },
});
