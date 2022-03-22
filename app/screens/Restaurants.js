import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import FooterTabs from "../components/nav/FooterTabs";
import Screen from "../components/Screen";
import Text from "@kaloraat/react-native-text";
import colors from "../config/colors";
import { WebView } from "react-native-webview";
import Card from "../components/Card";
import axios from "axios";
import SvgUri from "expo-svg-uri";

function Restaurants({ navigation }) {
  const [success, setSuccess] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    loadRestaurants();
  }, []);

  // console.log(restaurants.featuredImage);
  const loadRestaurants = async () => {
    try {
      setSuccess(true);
      const { data } = await axios.get(`/admin/restaurant`);
      setRestaurants(data.restaurants);
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
    <Screen style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: 10 }}>
          {/* {success ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <> */}
          <FlatList
            data={restaurants}
            keyExtractor={(restaurant) => restaurant.slug.toString()}
            renderItem={({ item }) => (
              <Card
                title={item.name}
                subTitle={item.location}
                // subSubTitle={item.description}
                image={item && item.featuredImage && item.featuredImage[0].url}
                onPress={() =>
                  navigation.navigate("RestaurantDetailsScreen", item)
                }
              />
            )}
          />
          {/* </>
          )} */}
        </View>
      </ScrollView>
      <View style={styles.footerTabs}>
        <FooterTabs />
      </View>
    </Screen>
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
