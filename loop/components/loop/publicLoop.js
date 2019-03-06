import React from "react";
import { StyleSheet, Dimensions, View, ScrollView } from "react-native";
import {
  Container,
  Content,
  Button,
  Text,
  Footer,
  FooterTab,
  Icon,
  Left,
  Right,
  Body,
  Segment,
  Thumbnail
} from "native-base";
import Loops from "./loops";
import theme from "../../assets/styles/theme.style";
import { SearchBar, Header } from "react-native-elements";
const devicesWidth = Dimensions.get("window").width;
import { AntDesign } from "@expo/vector-icons";

export default class PublicLoop extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View>
          <Text style={styles.LoopHeader}>Public</Text>
        </View>
        <View>
          <Loops navigation={this.props.navigation} loops={this.props.loops} />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  LoopHeader: {
    fontFamily: theme.FONT_FAMILY_SEMIBOLD,
    fontSize: theme.FONT_SIZE_MEDIUM,
    marginLeft: 15
  }
});
