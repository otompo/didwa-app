import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import colors from "../config/colors";
import { AuthContext } from "../context/authContext";
import { RestaurantContext } from "../context/restaurant";
import { Divider } from "react-native-elements";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AppText from "./AppText";
import axios from "axios";

function Card({ title, subTitle, subSubTitle, image, onPress, restaurant }) {
  const [restaurants, setRestaurants] = useContext(RestaurantContext);
  const [success, setSuccess] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.token !== "" && state.user !== null;

  const handleLikePress = async (restaurant) => {
    if (!authenticated) {
      alert("Signin First");
      return;
    }
    try {
      setSuccess(true);
      const { data } = await axios.put(`/restaurant/like`, {
        restaurantId: restaurant._id,
      });
      setRestaurants((restaurants) => {
        const index = restaurants.findIndex((l) => l._id === restaurant._id);
        // data.postedBy = state.user;
        restaurants[index] = data;

        return [...restaurants];
      });
      setSuccess(false);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };

  const handleUnLikePress = async (restaurant) => {
    if (!authenticated) {
      alert("Signin First");
      return;
    }
    try {
      setSuccess(true);
      const { data } = await axios.put(`/restaurant/unlike`, {
        restaurantId: restaurant._id,
      });
      setRestaurants((restaurants) => {
        const index = restaurants.findIndex((l) => l._id === restaurant._id);
        // data.postedBy = state.user;
        restaurants[index] = data;
        return [...restaurants];
      });
      setSuccess(false);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };

  return (
    <>
      <View style={styles.card}>
        <TouchableOpacity onPress={onPress}>
          <Image style={styles.image} source={{ uri: image }} />
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{title}</AppText>
            <AppText style={styles.subTitle}>{subTitle}.</AppText>
            {/* <AppText style={styles.subSubTitle} numberOfLines={1}>
            {subSubTitle}
          </AppText> */}
          </View>
        </TouchableOpacity>
      </View>

      {/* ******************** */}

      <View
        style={
          {
            // alignItems: "center",
            // justifyContent: "space-between",
          }
        }
      >
        {restaurant?.likes?.includes(state.user && state.user._id) ? (
          <TouchableOpacity
            style={styles.likeIcon}
            onPress={() => handleUnLikePress(restaurant)}
          >
            <FontAwesome
              name="thumbs-down"
              size={25}
              color={colors.secoundary}
            />
            <AppText style={{ marginLeft: 1, color: colors.white }}>
              {restaurant?.likes?.length}
            </AppText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.likeIcon}
            onPress={() => handleLikePress(restaurant)}
          >
            <FontAwesome name="thumbs-up" size={25} color={colors.secoundary} />
            <AppText style={{ marginLeft: 1, color: colors.white }}>
              {restaurant?.likes?.length}
            </AppText>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

export default Card;
const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 10,
    marginTop: 30,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 150,
  },
  title: {
    marginBottom: 5,
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 16,
  },
  subSubTitle: {
    color: colors.secondary,
    fontWeight: "100",
  },

  likeIcon: {
    alignItems: "center",
    // flexDirection: "row",
    position: "absolute",
    bottom: 20,
    right: 10,
    height: 55,
    width: 55,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: colors.white,
    backgroundColor: colors.primary,
    elevation: 3,
  },
});
