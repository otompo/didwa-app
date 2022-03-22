import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";
import { dummyData } from "../data/Data";
const { width, height } = Dimensions.get("window");

function FrontBanner({ style }) {
  const [bannerData, setBannerData] = useState([]);
  //   console.log(bannerData);
  useEffect(() => {
    setBannerData(dummyData);
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.container, style]}>
        <Swiper showButton={false} autoplay={true} autoplayTimeout={4}>
          {bannerData &&
            bannerData.map((item, i) => (
              <Image
                key={i}
                source={{ uri: item.uri }}
                style={styles.bannerImage}
              />
            ))}
        </Swiper>
        {/* <View style={{ marginTop: 30 }}></View> */}
      </View>
    </ScrollView>
  );
}

export default FrontBanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 220,
    marginTop: 1,
  },
  swiper: {
    // height: height / 3,
    height: 100,
    alignItems: "center",
    borderRadius: 10,
  },

  bannerImage: {
    width: "100%",
    height: 220,
    // height: height / 3,
  },
});
