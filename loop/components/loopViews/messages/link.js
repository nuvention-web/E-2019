import React from "react";
import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking
} from "react-native";
import theme from "../../../assets/styles/theme.style";
import { Text } from "native-base";

const devicesWidth = Dimensions.get("window").width;

export default class LoopLinkMessage extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={ ()=>{ Linking.openURL(this.props.url)}}>
        <View style={styles.bubble}>
          <Text style={styles.textCard}>{this.props.url}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  bubble: {
    backgroundColor: theme.GREY,
    borderRadius: 30,
    marginLeft: 40,
    maxWidth: devicesWidth - 100
  },
  textCard: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: theme.FONT_SIZE_GRANDE,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 12
  }
});
