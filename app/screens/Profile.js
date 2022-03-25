import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../config/colors";
import { Avatar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "@kaloraat/react-native-text";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import FooterTabs from "../components/nav/FooterTabs";
import Screen from "../components/Screen";
import SubmitButton from "../components/SubmitButton";
import AppTextInput from "../components/auth/AppTextInput";
import CircleLogo from "../components/appLogo/CircleLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItem from "../components/ListItem";
import moment from "moment";

function HistoryScreen({ navigation }) {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/orders/myorders`);
      setMyOrders(data.orders);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <View>
      {loading ? (
        <View
          style={{
            marginVertical: 200,
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          {myOrders.length > 0 ? (
            <FlatList
              data={myOrders}
              keyExtractor={(orders) => orders._id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ListItem
                  image={{ uri: item.food.image.url }}
                  title={`${item.food.name}`}
                  subTitle={`GHC ${item.food.price}.00`}
                  subSubTitle={`${moment(item.createdAt).fromNow()} `}
                  onPress={() =>
                    navigation.navigate("OrderDetailsScreen", item)
                  }
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
              <Text style={{ color: colors.danger }}>No orders found</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

function PasswordScreen() {
  const [c_password, setC_Password] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async () => {
    try {
      setLoading(true);
      if (!prevPassword || !newPassword || !c_password) {
        alert("All fields are require");
        setLoading(false);
        return;
      }
      const { data } = await axios.put(`/user/update-password`, {
        prevPassword,
        newPassword,
        c_password,
      });
      alert("Success");
      setPrevPassword("");
      setNewPassword("");
      setC_Password("");
      setLoading(false);
    } catch (err) {
      alert(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={100}
      enableOnAndroid={true}
      extraHeight={80}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        marginHorizontal: 5,
      }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerLine}>
          <Text
            title
            center
            bold
            style={{
              textTransform: "uppercase",
              textDecorationLine: "underline",
            }}
          >
            Update Password
          </Text>
        </View>
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          value={prevPassword.toString()}
          setValue={setPrevPassword}
          placeholder="Previous Password..."
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
        />
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          value={newPassword.toString()}
          setValue={setNewPassword}
          placeholder="New Password..."
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
        />
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          value={c_password.toString()}
          setValue={setC_Password}
          placeholder="Confirm Password..."
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
        />

        <SubmitButton
          title="Update"
          onPress={handlePasswordUpdate}
          loading={loading}
        />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

function AccountScreen({ navigation }) {
  const [state, setState] = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [contactNum, setContactNum] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState({
    url: "",
    public_id: "",
  });

  useEffect(() => {
    if (state.user) {
      const { name, email, image, contactNum, role, createdAt } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
      setImage(image);
      setCreatedAt(createdAt);
      setContactNum(contactNum);
    }
    if (state.user === null) navigation.navigate("Home");
  }, [state]);

  // const handleImageUpload = async () => {
  //   try {
  //     setSuccess(true);
  //     let permissionResult =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (permissionResult.granted !== true) {
  //       alert("Camera access is required");
  //       return;
  //     }
  //     // get image from user
  //     let pickerResult = await ImagePicker.launchImageLibraryAsync({
  //       // mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       base64: true,
  //       quality: 1,
  //     });
  //     if (!pickerResult.cancelled) {
  //       let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
  //       // save image to state for preview
  //       setPreviewImage(base64Image);
  //       // send to backend for uploading to clouldnary
  //       const { data } = await axios.post(`/user/update-image`, {
  //         image: base64Image,
  //       });
  //       // update user async storage
  //       const as = JSON.parse(await AsyncStorage.getItem("@auth"));
  //       as.user = data;
  //       await AsyncStorage.setItem("@auth", JSON.stringify(data));
  //       // update  constext
  //       setState({ ...state, user: data });
  //       setImage(data.image);
  //       alert("Profile image saved successfully");
  //       setSuccess(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     alert(err.response.data.message);
  //     setSuccess(false);
  //   }
  // };

  const handleSignout = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/user/update-profile`, {
        name,
        email,
        contactNum,
      });
      // await AsyncStorage.setItem("@auth", JSON.stringify(data));
      setState({ ...state, user: data });
      alert("Update success");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={100}
      enableOnAndroid={true}
      extraHeight={80}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        marginHorizontal: 5,
      }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <CircleLogo>
          {success ? (
            <>
              <Avatar
                size={150}
                rounded
                source={{ uri: previewImage }}
                icon={{ name: "pencil", type: "font-awesome" }}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 155,
                  right: 30,
                  elevation: 3,
                  fontWeight: "bold",
                  paddingTop: 10,
                  fontSize: 16,
                  color: colors.danger,
                }}
              >
                Please Wait...
              </Text>
            </>
          ) : image && image.url ? (
            <Avatar size={150} rounded source={{ uri: image.url }} />
          ) : previewImage ? (
            <Avatar
              size={150}
              rounded
              source={{ uri: previewImage }}
              icon={{ name: "pencil", type: "font-awesome" }}
            />
          ) : (
            <TouchableOpacity
            // style={styles.icon}
            // onPress={() => handleImageUpload()}
            >
              <MaterialCommunityIcons
                name="camera"
                size={40}
                color={colors.primary}
              />
            </TouchableOpacity>
          )}
        </CircleLogo>
        <Text>Joined Date: {moment(createdAt).fromNow()}</Text>

        {/* {image && image.url ? (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleImageUpload()}
          >
            <MaterialCommunityIcons
              name="camera"
              size={40}
              color={colors.primary}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
        */}
        <AppTextInput
          placeholder="Name"
          value={name.toString()}
          setValue={setName}
          icon="account"
        />
        <AppTextInput
          autoCapitalize="words"
          autoCorrect={false}
          placeholder="Email..."
          icon="email"
          value={email.toString()}
          setValue={setEmail}
        />

        <AppTextInput
          placeholder="Contact Number..."
          icon="phone"
          value={contactNum}
          setValue={setContactNum}
          keyboardType="numeric"
        />

        <SubmitButton
          title={loading ? "Please wait..." : "Update"}
          onPress={handleSubmit}
        />
        {/* <Text>{JSON.stringify(state, null, 4)}</Text> */}
        <SubmitButton title="Logout" color="danger" onPress={handleSignout} />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const TopTabNavigator = createMaterialTopTabNavigator();

function TopTabs() {
  return (
    <TopTabNavigator.Navigator
      initialRouteName="History"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarLabelStyle: {
          fontSize: 12,
          color: colors.white,
        },
        tabBarStyle: { backgroundColor: colors.secoundary },
      }}
    >
      <TopTabNavigator.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="history"
              color={colors.white}
              size={26}
            />
          ),
        }}
      />
      <TopTabNavigator.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              color={colors.white}
              size={26}
            />
          ),
        }}
      />
      <TopTabNavigator.Screen
        name="Password"
        component={PasswordScreen}
        options={{
          tabBarLabel: "Password",

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="lock"
              color={colors.white}
              size={26}
            />
          ),
        }}
      />
    </TopTabNavigator.Navigator>
  );
}

function Profile() {
  return <TopTabs />;
}
export default Profile;

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  container: {
    marginTop: 15,
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: 125,
    right: 110,
    elevation: 3,
  },
  headerLine: {
    margin: 20,
  },
});
