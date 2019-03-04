import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Button,
  Text,
  Footer,
  FooterTab,
  Icon,
  Left,
  Right,
  Body,
  Segment,
  Thumbnail
} from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ExploreMapScreen from "./components/explore-map";
import ExploreScreen from "./components/explore";
import Loops from "./components/loops";
import LoopsViewScreen from "./components/loopView";
import { Font } from "expo";
import theme from "./assets/styles/theme.style.js";
import commonStyle from "./assets/styles/styles";
import { SearchBar, Header } from "react-native-elements";
import LeftHeader from "./components/leftHeader";
const devicesWidth = Dimensions.get("window").width;
import { AntDesign } from "@expo/vector-icons";

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
          rightComponent={<Button iconRight transparent><AntDesign name="plus" style={commonStyle.BottomIcon}/></Button>}
          containerStyle={{
            backgroundColor: "white",
            justifyContent: "space-around",
            height: 100
          }}
        />

        <View>
          {this.state.fontLoaded ? (
            <SearchBar
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={this.state.search}
              platform="ios"
              containerStyle={styles.searchBarContainer}
              inputStyle={styles.searchBarInput}
              inputContainerStyle={styles.searchBarInputContainer}
            />
          ) : null}
        </View>
        {this.state.fontLoaded ? (
          <Segment style={{ backgroundColor: "white" }} >
            <Button
              style={{
                backgroundColor: this.state.seg === 1 ? "#F0F0F0" : undefined,
                borderColor: "white",
                borderRadius: 4,
                width: devicesWidth / 2 - 20,
                height: 40,
                justifyContent: "center"
              }}
              first
              active={this.state.seg === 1 ? true : false}
              onPress={() => this.setState({ seg: 1 })}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: theme.FONT_FAMILY,
                  fontSize: theme.FONT_SIZE_MEDIUM,
                  paddingTop: 5,
                  paddingBottom: 5
                }}
              >
                My Loops
              </Text>
            </Button>
            <Button
              last
              style={{
                backgroundColor: this.state.seg === 2 ? "#F0F0F0" : undefined,
                borderColor: "white",
                borderRadius: 4,
                width: devicesWidth / 2 - 20,
                height: 40,
                justifyContent: "center"
              }}
              active={this.state.seg === 2 ? true : false}
              onPress={() => this.setState({ seg: 2 })}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: theme.FONT_FAMILY,
                  fontSize: theme.FONT_SIZE_MEDIUM,
                  paddingTop: 5,
                  paddingBottom: 5
                }}
              >
                LoopBook
              </Text>
            </Button>
          </Segment>
        ) : null}
        {this.state.fontLoaded ? (
          <Content padder>
            {this.state.seg == 1 ? (
              <Loops navigation={this.props.navigation} />
            ) : (
              <Text>LoopBook</Text>
            )}
          </Content>
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

const App = createAppContainer(MainNavigator);

export default App;
