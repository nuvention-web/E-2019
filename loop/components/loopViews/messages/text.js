import React from "react";
import { Image, View, ScrollView, StyleSheet, Dimensions } from "react-native";
import theme from "../../../assets/styles/theme.style";
import { Text } from "native-base";
const devicesWidth = Dimensions.get("window").width;

export default class LoopTextMessage extends React.Component {
  render() {
    return (
      <View style={this.props.type == "mine" ? styles.myBubble : styles.bubble}>
        <Text
          style={
            this.props.type == "mine" ? styles.myTextCard : styles.textCard
          }
        >
          {this.props.data}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  bubble: {
    backgroundColor: theme.GREY,
    borderRadius: 30,
    marginLeft: 40,
    maxWidth: devicesWidth - 100,
    paddingTop: 5,
  },
  myBubble: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 30,
    marginRight: 40,
    maxWidth: devicesWidth - 100,
    paddingTop: 5,
  },
  textCard: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: theme.FONT_SIZE_SEMIMED,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 8
  },
  myTextCard: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: theme.FONT_SIZE_SEMIMED,
    color: "white",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 8
  }
});
