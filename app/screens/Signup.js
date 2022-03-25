import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import Text from "@kaloraat/react-native-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppTextInput from "../components/auth/AppTextInput";
import SubmitButton from "../components/SubmitButton";
import CircleLogo from "../components/appLogo/CircleLogo";
import axios from "axios";

function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [password, setPassword] = useState("");
  const [cf_password, setCf_Password] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !name || !password) {
      alert("All fields are requied");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`/user/signup`, {
        name,
        email,
        password,
        contactNum,
        cf_password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        // save in context
        // setState(data);
        // console.log(data);
        // await AsyncStorage.setItem("@auth", JSON.stringify(data));
        // alert("Sign up success");
        setName("");
        setEmail("");
        setPassword("");
        setCf_Password("");
        setLoading(false);
        navigation.navigate("Signin");
      }
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      contentContainerStyle={{ flexGrow: 1 }} // make the scrollView full screen
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <View style={{ marginVertical: 100 }}>
        <CircleLogo />
        <AppTextInput
          autoCapitalize="words"
          autoCorrect={false}
          icon="account"
          placeholder="Name..."
          value={name}
          setValue={setName}
        />
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          placeholder="Email..."
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          setValue={setEmail}
        />
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          placeholder="Contact No..."
          keyboardType="numeric"
          value={contactNum}
          setValue={setContactNum}
        />
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          value={password}
          setValue={setPassword}
          placeholder="Password..."
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
        />
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          value={cf_password}
          setValue={setCf_Password}
          placeholder="Confirm Password..."
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
        />
        <View style={styles.buttonContainer}>
          <SubmitButton
            title="Sign up"
            onPress={handleSubmit}
            loading={loading}
          />
        </View>
        <Text center>
          Already Joined?{" "}
          <Text onPress={() => navigation.navigate("Signin")} color="#ff0000">
            Sign In
          </Text>
        </Text>
        {/* <Text>{loadData && loadData}</Text> */}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    // width: 80,
    // height: 80,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});
