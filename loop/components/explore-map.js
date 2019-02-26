import React from "react";
import { Image, View, StyleSheet,Dimensions } from "react-native";
import { Container, Header, Content, Button, Text,Item, Accordion,Left,Right,Body,Icon,Title,Thumbnail,Input} from "native-base";
import * as data from "../assets/data.json";
import commonStyle from "../assets/styles/styles";
import theme from "../assets/styles/theme.style";
import { MapView } from 'expo';
import { SearchBar } from "react-native-elements";

const devicesWidth=Dimensions.get('window').width;
const devicesHeight=Dimensions.get('window').height;

export default class LoopMap extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
        <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 42.055234,
          longitude: -87.677273,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation = {true}
      />
    );
  }
}
