import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import RootNavigation from "./app/rootNavigation";

LogBox.ignoreAllLogs(true);
export default function App() {
  return <RootNavigation />;
}
