import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
// import Text from "@kaloraat/react-native-text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import axios from "axios";

function Menu({ data, icon, onPress }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/admin/category`);
      setCategories(data.categories);
      // console.log(data.categories);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <View style={styles.flatList}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(category) => category._id.toString()}
          renderItem={({ item }) => (
            <>
              {/* <View>
            <MaterialCommunityIcons name="whatsapp" size={25} />
          </View> */}
              <TouchableOpacity onPress={() => console.log("Hi", item)}>
                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 20,
                    marginHorizontal: 5,
                    backgroundColor: colors.secoundary,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 3,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors.white,
                      padding: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Text>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={25}
                    style={{
                      color: colors.light,
                      marginHorizontal: 5,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </>
          )}
        />
      </View>
      {/* {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
       
      )} */}
    </>
  );
}

export default Menu;

const styles = StyleSheet.create({
  flatList: {
    height: 60,
    backgroundColor: colors.light,
    flexGrow: 0,
  },
  menuText: {
    color: colors.primary,
    margin: 5,
    // padding: 2,
    fontSize: 16,
    fontWeight: "bold",
  },
});
