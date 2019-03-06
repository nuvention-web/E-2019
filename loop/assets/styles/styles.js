import { StyleSheet } from "react-native";
import theme from "./theme.style.js";

export default StyleSheet.create({
  text: {
    fontFamily: theme.FONT_FAMILY
  },
  boldText: {
    fontFamily: theme.FONT_FAMILY_BOLD
  },
  semiBoldText: {
    fontFamily: theme.FONT_FAMILY_SEMIBOLD
  },
  Icon: {
    color: theme.PRIMARY_COLOR,
    fontSize: theme.ICON_SIZE_LARGE
  },
  ActionIcon: {
    color: theme.PRIMARY_COLOR,
    fontSize: theme.ICON_SIZE_MEDIUM
  },
  BottomIcon: {
    color: theme.PRIMARY_COLOR,
    fontSize: theme.ICON_SIZE_LARGER
  },
  searchBarContainer: {
    backgroundColor: "white"
  },
  searchBarInputContainer: {
    backgroundColor: "#f6f6f6"
  },
  searchBarInput: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: theme.FONT_SIZE_GRANDE,
    backgroundColor: "#f6f6f6"
  }
});
