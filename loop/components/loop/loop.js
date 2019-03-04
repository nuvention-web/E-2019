import React from "react";
import { StyleSheet, Dimensions, View, ScrollView } from "react-native";
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
import Loops from "../loops";
import PrivateLoop from "./privateLoop";
import PublicLoop from "./publicLoop";
import theme from "../../assets/styles/theme.style";
import { SearchBar, Header } from "react-native-elements";
const devicesWidth = Dimensions.get("window").width;
import { AntDesign } from "@expo/vector-icons";

export default class Loop extends React.Component {
  state = {
    seg: 1
  };

  changePage = () => {
    this.setState({ page: !this.state.page });
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <View>
            <SearchBar
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={this.state.search}
              platform="ios"
              containerStyle={styles.searchBarContainer}
              inputStyle={styles.searchBarInput}
              inputContainerStyle={styles.searchBarInputContainer}
            />
        </View>
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
          <Content padder>
            {this.state.seg == 1 ? (
              <View>
                  <PrivateLoop navigation={this.props.navigation} />
                  <PublicLoop navigation={this.props.navigation} />
              </View>
            ) : (
              <Text>LoopBook</Text>
            )}
          </Content>
      </ScrollView>
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