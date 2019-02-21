import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class ExploreScreen extends React.Component {
  static navigationOptions = {
    title: "Explore"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go back to home"
        onPress={() => navigate("Home", { name: "Jane" })}
      />
    );
  }
}
