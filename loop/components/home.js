import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Container, Button } from "native-base";
const devicesWidth = Dimensions.get("window").width;
import { AntDesign } from "@expo/vector-icons";
import LeftHeader from "./leftHeader";
import Loop from "./loop/loop";
import commonStyle from "../assets/styles/styles";
import { Header } from "react-native-elements";
import { Font } from "expo";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    fontLoaded: false,
    seg: 1
  };

  async componentWillMount() {
    await Font.loadAsync({
      verdana: require("../assets/fonts/Verdana.ttf")
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
      </Container>
    );
  }
}
