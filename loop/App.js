import React, {PureComponent} from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Button,
  Text,
  Footer,
  FooterTab
} from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ExploreMapScreen from "./components/explore-map";
import ExploreScreen from "./components/explore";
import Loop from "./components/loop/loop";
import LoopsViewScreen from "./components/loopView";
import { Font } from "expo";
import theme from "./assets/styles/theme.style.js";
import commonStyle from "./assets/styles/styles";
import { SearchBar, Header } from "react-native-elements";
import LeftHeader from "./components/leftHeader";
import { Provider } from "react-redux";
import { createStore } from "redux";
import configureStore from "./services/reducers/store";
import { AntDesign } from "@expo/vector-icons";
import NavigationService from "./services/NavigationService";
const devicesWidth = Dimensions.get("window").width;
const store = configureStore();

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    fontLoaded: false,
    seg: 1
  };

  async componentWillMount() {
    await Font.loadAsync({
      verdana: require("./assets/fonts/Verdana.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  changePage = () => {
    this.setState({ page: !this.state.page });
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
        <Container>
          <Header
            placement="left"
            leftComponent={<LeftHeader />}
            rightComponent={
              <Button iconRight transparent>
                <AntDesign name="plus" style={commonStyle.BottomIcon} />
              </Button>
            }
            containerStyle={{
              backgroundColor: "white",
              justifyContent: "space-around",
              height: 100
            }}
          />
          {this.state.fontLoaded ? (
            <Loop navigation={this.props.navigation} />
          ) : null}
          <Footer style={styles.footer}>
            <FooterTab>
              <Button vertical transparent>
                <AntDesign name="home" style={commonStyle.BottomIcon} />
              </Button>
              <Button
                vertical
                onPress={() => navigate("Explore", { name: "Jane" })}
              >
                <AntDesign name="find" style={commonStyle.BottomIcon} />
              </Button>
              <Button vertical>
                <AntDesign name="setting" style={commonStyle.BottomIcon} />
              </Button>
            </FooterTab>
          </Footer>
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
    fontFamily: theme.FONT_FAMILY,
    fontSize: theme.FONT_SIZE_MEDIUM
  },
  searchBarContainer: {
    backgroundColor: "white"
  },
  searchBarInputContainer: {
    backgroundColor: "#f6f6f6"
  },
  searchBarInput: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: theme.FONT_SIZE_MEDIUM,
    backgroundColor: "#f6f6f6"
  },
  footer: {
    backgroundColor: "white",
    borderColor: "white",
    paddingLeft: 20,
    paddingRight: 20
  }
});

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Explore: { screen: ExploreScreen },
  LoopView: { screen: LoopsViewScreen }
});

const AppContainer = createAppContainer(MainNavigator);

class App extends PureComponent {
  render() {
    return (
    <Provider store={store}>
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      /></Provider>
    );
  }
}
export default App;
