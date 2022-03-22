import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import AppText from "../components/AppText";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import colors from "../config/colors";
import { FontAwesome } from "@expo/vector-icons";
import FooterTabs from "../components/nav/FooterTabs";

function Market(props) {
  const [name, setName] = useState("");
  const [inputList, setInputList] = useState([{ ingredient: "" }]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/ingredients`, {
        inputList,
      });
      // console.log(data);
      setInputList([{ ingredient: "" }]);
      setLoading(false);
      alert("Success");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const addHandler = () => {
    // const list = [...inputList];
    // list.push({ ingredient: "", qty: "" });
    // setInputList(list);
    setInputList([...inputList, { ingredient: "" }]);
  };

  const deleteHandler = (key) => {
    const _inputList = inputList.filter((input, index) => index != key);
    setInputList(_inputList);
  };

  const handleInputChange = (text, key) => {
    const list = [...inputList];
    list[key].ingredient = text;
    // list[key].qty = text;
    // _inputList[key].key = key;
    setInputList(list);
  };

  // const handleInputChange = (text, index) => {
  //   const { name, value } = text.target;
  //   const list = [...inputList];
  //   list[index][name] = value;
  //   setInputList(list);
  // };

  const handleAddInput = (e) => {
    setInputList([...inputList, { ingredient: "" }]);
  };

  const handleRemoveInput = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  return (
    <>
      <ImageBackground
        ImageBackground
        blurRadius={5}
        source={require("../assets/okrastew.jpg")}
        style={styles.infoTop}
      >
        <Text
          style={{
            fontSize: 30,
            color: "white",
            marginHorizontal: 15,
          }}
        >
          We buy what ever
        </Text>
        <Text
          style={{
            fontSize: 30,
            color: "white",
            marginHorizontal: 15,
          }}
        >
          Ingredients you give us
        </Text>
      </ImageBackground>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* <TextInput
          style={styles.input}
          placeholder={"Enter Title..."}
        /> */}
        {inputList.map((item, key) => (
          <View key={key}>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              {/* <Text
                style={{
                  marginHorizontal: 5,
                  marginVertical: 15,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {key + 1}
              </Text> */}
              <TextInput
                style={styles.input}
                placeholder={"Enter ingredient..."}
                value={item.ingredient}
                onChangeText={(text) => handleInputChange(text, key)}
              />
              {/* <TextInput
                style={styles.input}
                placeholder={"Enter ingredient..."}
                value={item.ingredient}
                onChangeText={(text) => handleInputChange(text, key)}
              /> */}
              {inputList.length !== 1 ? (
                <TouchableOpacity onPress={() => deleteHandler(key)}>
                  <View
                    style={{
                      backgroundColor: colors.danger,
                      marginLeft: 10,
                      marginVertical: 10,
                      borderRadius: 15,
                      height: 25,
                      width: 25,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 13,
                      }}
                    >
                      <FontAwesome name="close" size={25} />
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    backgroundColor: colors.dark,
                    marginLeft: 10,
                    marginVertical: 10,
                    borderRadius: 15,
                    height: 30,
                    width: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 13,
                    }}
                  >
                    <FontAwesome name="shopping-basket" size={23} />
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
        {/* <Text>{JSON.stringify(inputList, null, 4)}</Text> */}
        <SubmitButton title="Add" onPress={addHandler} color="blue" />
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 10,
          backgroundColor: colors.light,
          width: "100%",
        }}
      >
        <SubmitButton title="Submit" onPress={handleSubmit} loading={loading} />
      </View>
      <View style={styles.footerTabs}>
        <View style={{ backgroundColor: colors.secoundary }}>
          <FooterTabs />
        </View>
      </View>
    </>
  );
}

export default Market;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.light,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: "#470000",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // elevation: 5,
  },

  input: {
    margin: 5,
    padding: 5,
    paddingHorizontal: 15,
    width: "85%",
    height: 45,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 25,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    margin: 10,
  },
  infoTop: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
