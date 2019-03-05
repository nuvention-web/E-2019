import React, { Component } from "react";
import { AntDesign } from "@expo/vector-icons";
import commonStyle from "../assets/styles/styles";
import theme from "../assets/styles/theme.style.js";
import { createBottomTabNavigator } from "react-navigation";
import { Button, Footer, FooterTab } from "native-base";
import { StyleSheet } from "react-native";
import HomeScreen from "./home";
import ExploreScreen from "./explore"
const MainScreenNavigator = createBottomTabNavigator(
  {
    Home: { screen: props => <HomeScreen {...props} /> },
    Explore: { screen: props => <ExploreScreen {...props} /> }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer style={styles.footer}>
          <FooterTab>
            <Button
              vertical
              transparent
              onPress={() => props.navigation.navigate("Home")}
            >
              <AntDesign name="home" style={commonStyle.BottomIcon} />
            </Button>
            <Button
              vertical
              onPress={() => props.navigation.navigate("Explore")}
            >
              <AntDesign name="find" style={commonStyle.BottomIcon} />
            </Button>
            <Button vertical>
              <AntDesign name="setting" style={commonStyle.BottomIcon} />
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

MainScreenNavigator.navigationOptions = ({ navigation }) => {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let navigationOptions = {};
    navigationOptions.header = null;
    return navigationOptions;
  };

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "white",
    borderColor: "white",
    paddingLeft: 20,
    paddingRight: 20
  }
});


export default MainScreenNavigator;