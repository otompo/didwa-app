import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Swiper from "react-native-swiper/src";
import colors from "../config/colors";
import { dummyData } from "../data/Data";
const { width, height } = Dimensions.get("window");

function Banner({ bannerData, style }) {
  // const [bannerData, setBannerData] = useState([]);
  //   console.log(bannerData);
  useEffect(() => {
    // setBannerData(dummyData);
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container, style]}>
        <Swiper showButton={false} autoplay={true} autoplayTimeout={4}>
          {bannerData &&
            bannerData.map((item, i) => (
              <Image
                key={i}
                source={{ uri: item.url }}
                style={styles.bannerImage}
              />
            ))}
        </Swiper>
        <View style={{ height: 20 }}></View>
      </View>
    </ScrollView>
  );
}

export default Banner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 210,
    marginTop: 1,
  },
  swiper: {
    height: height / 3,
    alignItems: "center",
    borderRadius: 10,
  },

  bannerImage: {
    width: "100%",
    height: 210,
  },
});
