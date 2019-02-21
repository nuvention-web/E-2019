import React from "react";
import { StyleSheet } from "react-native";
import { Container, Header, Content, Button, Text } from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ExploreScreen from "./components/explore";
import LoopsScreen from "./components/loops";
import LoopsViewScreen from "./components/loopView";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <Button onPress={() => navigate("Loops", { name: "Jane" })}>
            <Text>My Loop</Text>
          </Button>
          <Button onPress={() => navigate("Explore", { name: "Jane" })}>
            <Text>Explore</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  content:{
    justifyContent: 'center', 
    flex: 1
  }
});

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Explore: { screen: ExploreScreen },
  Loops: { screen: LoopsScreen },
  LoopView: { screen: LoopsViewScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
