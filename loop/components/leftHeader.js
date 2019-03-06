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
    const uri = require(`../assets/group.png`);
    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
        <Thumbnail source={require("../assets/01.png")} style={{marginTop:10}} />
        <Text style={{marginTop:25,marginLeft:20,fontSize:20,fontWeight: 'bold', fontFamily: theme.FONT_FAMILY_BOLD}}>Home</Text>
        </View>

    );
  }
}