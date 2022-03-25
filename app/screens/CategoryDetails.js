import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import AppText from "../components/AppText";
import FooterTabs from "../components/nav/FooterTabs";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import colors from "../config/colors";

function CategoryDetails({ route, navigation }) {
  const category = route.params;
  const id = category._id;
  const [foods, setFoods] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getCategoryFood();
  }, []);
  const getCategoryFood = async () => {
    try {
      setSuccess(true);
      const { data } = await axios.get(`/food/category/${id}`);
      setFoods(data.food);
      //   console.log(data.food);
      setSuccess(false);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        ImageBackground
        blurRadius={5}
        source={require("../assets/adaptive-icon.png")}
        style={styles.infoTop}
      >
        <Text
          style={{
            fontSize: 30,
            color: colors.black,
            fontWeight: "bold",
            marginHorizontal: 15,
          }}
        >
          Buy {category.title} from our
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: colors.black,
            fontWeight: "bold",
            marginHorizontal: 15,
          }}
        >
          List of restaurant(s) below
        </Text>
      </ImageBackground>
      {success ? (
        <View
          style={{
            marginVertical: 200,
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          {foods.length > 0 ? (
            <FlatList
              data={foods}
              keyExtractor={(food) => food._id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ListItem
                  image={{ uri: item.image.url }}
                  title={`${item.name}`}
                  subTitle={`GHC ${item.price}.00`}
                  subSubTitle={`${item.restaurant.name}`}
                  onPress={() => navigation.navigate("FoodDetailsScreen", item)}
                />
              )}
            />
          ) : (
            <View
              style={{
                marginVertical: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.danger }}>No Restaurant found</Text>
            </View>
          )}
        </>
      )}
      <View style={styles.footerTabs}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
}

export default CategoryDetails;

const styles = StyleSheet.create({
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
