import React from "react";
import { View, StyleSheet } from "react-native";
import { SpeedDial } from "react-native-elements";
import colors from "../config/colors";
import { WebView } from "react-native-webview";

function Speed({ navigation }) {
  const [open, setOpen] = React.useState(false);
  const handleChat = () => {
    // console.log("chat");
    return (
      <WebView
        source={{ uri: "https://api.whatsapp.com/send?phone=233248958661" }}
      />
    );
  };
  return (
    <SpeedDial
      isOpen={open}
      overlayColor="None"
      icon={{ name: "apps", color: colors.white }}
      openIcon={{ name: "close", color: colors.white }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
      style={styles.speedDial}
      // buttonStyle={{ backgroundColor: colors.main }}
    >
      <SpeedDial.Action
        icon={{ name: "chat", color: colors.white }}
        // title=""
        onPress={() => handleChat()}
        // buttonStyle={{ backgroundColor: colors.primary }}
      />
      <SpeedDial.Action
        icon={{ name: "phone", color: colors.white }}
        // title=""https://api.whatsapp.com/send?phone=233248958661
        onPress={() => console.log("Call Something")}
        // buttonStyle={{ backgroundColor: colors.primary }}
      />
    </SpeedDial>
  );
}

export default Speed;

const styles = StyleSheet.create({
  speedDial: {
    marginBottom: 50,
  },
});
