import React from "react";
import { Image, View, ScrollView, StyleSheet, Dimensions } from "react-native";
import LoopTextMessage from "./text";
import LoopImageMessage from "./image";
import LoopVideoMessage from "./video";
import commonStyle from "../../../assets/styles/styles";
import styles from "../../../assets/styles/loopchatstyles";
import { AntDesign } from "@expo/vector-icons";
import { Button, Text } from "native-base";
export default class Bubble extends React.Component {
  render() {
    return (
      <View
        style={
          this.props.lc.id == "111" ? styles.reverseMessages : styles.messages
        }
      >
        {this.props.lc.object.type == "text" ? (
          <LoopTextMessage
            type={this.props.lc.id == "111" ? "mine" : "others"}
            data={this.props.lc.object.data}
          />
        ) : null}
        {this.props.lc.object.type == "image" ? (
          <LoopImageMessage data={this.props.lc.object.data} />
        ) : null}
        {this.props.lc.object.type == "video" ? <LoopVideoMessage /> : null}
        <View>
          <Button transparent style={this.props.lc.id == "111" ?styles.reverseIconbtn : styles.Iconbtn}>
            <AntDesign
              name="up-square-o"
              style={commonStyle.ActionIcon}
            />
            <Text style={styles.Icontext}>0</Text>
          </Button>
        </View>
      </View>
    );
  }
}
