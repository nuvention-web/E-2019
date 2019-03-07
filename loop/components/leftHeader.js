import React from "react";
import { View, StyleSheet,Container } from "react-native";
import {
  Content,
  Button,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Body,
  Icon,
  Left,
  Right,
  Image

} from "native-base";
import theme from "../assets/styles/theme.style";

export default class LeftHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
        <Thumbnail source={require("../assets/user.png")} style={{marginTop:12, marginLeft: 10, width: 50, height: 50, borderRadius:25}} />
        <Text style={{marginTop:25,marginLeft:20,fontSize:theme.FONT_SIZE_LARGER, fontFamily: theme.FONT_FAMILY_SEMIBOLD}}>Home</Text>
        </View>

    );
  }
}