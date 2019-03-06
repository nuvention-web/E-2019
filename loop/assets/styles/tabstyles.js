import { StyleSheet, Dimensions } from "react-native";
import theme from "./theme.style.js";
const devicesWidth = Dimensions.get("window").width;

export default (styles = StyleSheet.create({
  tab: {
    backgroundColor: theme.PRIMARY_COLOR
  },
  activeTab: {
    color: theme.PRIMARY_COLOR
  },
  tabStyle: {
    backgroundColor: "white",
    borderColor: "white"
  },
  activeTabStyle: {
    backgroundColor: "white"
  }
}));
