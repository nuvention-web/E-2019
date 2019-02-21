import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class LoopsViewScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go back to My Loops"
        onPress={() => navigate("Loops", { name: "Jane" })}
      />
    );
  }
}
