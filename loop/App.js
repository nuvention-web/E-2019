import React from "react";
import { StyleSheet } from "react-native";
import { Container, Header, Content, Button, Text } from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ExploreScreen from "./components/explore";
import LoopsScreen from "./components/loops";
import LoopsViewScreen from "./components/loopView";
import { Font } from "expo";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    fontLoaded: false
  };

  async componentWillMount() {
    await Font.loadAsync({
      verdana: require("./assets/fonts/Verdana.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <Button
            block
            bordered
            dark
            style={styles.btn}
            onPress={() => navigate("Loops", { name: "Jane" })}
          >
            {this.state.fontLoaded ? (
              <Text style={styles.text}>My Loop</Text>
            ) : null}
          </Button>
          <Button
            block
            bordered
            dark
            style={styles.btn}
            onPress={() => navigate("Explore", { name: "Jane" })}
          >
            {this.state.fontLoaded ? (
              <Text style={styles.text}>Explore</Text>
            ) : null}
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  content: {
    justifyContent: "center",
    flex: 1,
    margin: 30
  },
  btn: {
    marginBottom: 30,
    borderRadius: 0
  },
  text: {
    fontFamily: "verdana",
    fontSize: 20
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
