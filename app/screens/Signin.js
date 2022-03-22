import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Text from "@kaloraat/react-native-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppTextInput from "../components/auth/AppTextInput";
import SubmitButton from "../components/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/authContext";
import CircleLogo from "../components/appLogo/CircleLogo";
import axios from "axios";

function LogIn({ navigation }) {
  const [state, setState] = useContext(AuthContext);
  const { user } = state;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user !== null) navigation.navigate("Home");
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are requied");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`/auth/signin`, {
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        // save in context
        setState(data);
        // console.log(data);
        // save response in asynce storage
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        // alert("Signin success");
        setEmail("");
        setPassword("");
        setLoading(false);
        navigation.navigate("Home");
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
        <CircleLogo>{/* <Text title>DiDWA</Text> */}</CircleLogo>

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
          icon="lock"
          value={password}
          setValue={setPassword}
          placeholder="Password..."
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
        />
        <View style={styles.buttonContainer}>
          <SubmitButton
            title="Sign in"
            onPress={handleSubmit}
            loading={loading}
          />
        </View>
        <Text center>
          Not yet registered?{" "}
          <Text onPress={() => navigation.navigate("Signup")} color="#ff0000">
            Sign Up
          </Text>
        </Text>
        <Text
          //   onPress={() => navigation.navigate("ForgotPassword")}
          small
          center
          color="orange"
          style={{ marginTop: 15 }}
        >
          Forgot Password?
        </Text>
        {/* <Text>{JSON.stringify({ email, password }, null, 4)}</Text> */}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default LogIn;

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
