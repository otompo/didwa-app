import { StyleSheet } from "react-native";

import { WebView } from "react-native-webview";

function Chat(props) {
  return (
    <WebView
      source={{ uri: "https://api.whatsapp.com/send?phone=233248958661" }}
    />
  );
}

export default Chat;
