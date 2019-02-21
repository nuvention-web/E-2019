import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class LoopsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          title="Go back to home"
          onPress={() => navigate("Home", { name: "Jane" })}
        />
        <Button
          title="Go to loop view"
          onPress={() => navigate("LoopView", { name: "Jane" })}
        />
      </View>
    );
  }
}
