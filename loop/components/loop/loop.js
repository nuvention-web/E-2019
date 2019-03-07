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
import Loops from "./loops";
import PrivateLoop from "./privateLoop";
import PublicLoop from "./publicLoop";
import commonStyle from "../../assets/styles/styles";
import theme from "../../assets/styles/theme.style";
import { SearchBar, Header } from "react-native-elements";
const devicesWidth = Dimensions.get("window").width;
import { AntDesign } from "@expo/vector-icons";
import {
  CHATKIT_TOKEN_PROVIDER_ENDPOINT,
  CHATKIT_INSTANCE_LOCATOR
} from "../../assets/config";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

export default class Loop extends React.Component {
  state = {
    seg: 1
  };

  changePage = () => {
    this.setState({ page: !this.state.page });
  };

  componentDidMount() {
    // const { loopContent } = this.props;
    // this.setState({ messages: loopContent });

    const tokenProvider = new TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
    });

    const chatManager = new ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: "123",
      tokenProvider: tokenProvider
    });
    //const CHATKIT_ROOM_ID = this.props.loopId;

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        rooms = this.currentUser.rooms;
        //this.setState({rooms});
        privateR = rooms.filter(r => r.isPrivate);
        //privateR.map((r)=>console.log(r.name))
        publicR = rooms.filter(r => !r.isPrivate);
        this.setState({ privateR, publicR });
      })
      .catch(err => {
        console.log(err);
      });
  }

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
            containerStyle={commonStyle.searchBarContainer}
            inputStyle={commonStyle.searchBarInput}
            inputContainerStyle={commonStyle.searchBarInputContainer}
          />
        </View>
        <Segment style={{ backgroundColor: "white" }}>
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
            <Text style={this.state.seg === 1 ? styles.segTextActive: styles.segText}>My Loops</Text>
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
            <Text style={this.state.seg === 2 ? styles.segTextActive: styles.segText}>LoopBook</Text>
          </Button>
        </Segment>
        <Content padder>
          {this.state.seg == 1 ? (
            <View>
              {this.state.privateR != undefined &&
              this.state.publicR != undefined ? (
                <View>
                  <PrivateLoop
                    navigation={this.props.navigation}
                    loops={this.state.privateR}
                  />
                  <PublicLoop
                    navigation={this.props.navigation}
                    loops={this.state.publicR}
                  />
                </View>
              ) : null}
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
  segTextActive: {
    color: "black",
    fontFamily: theme.FONT_FAMILY_SEMIBOLD,
    fontSize: theme.FONT_SIZE_GRANDE,
    paddingTop: 5,
    paddingBottom: 5
  },
  segText: {
    color: "#848484",
    fontFamily: theme.FONT_FAMILY_SEMIBOLD,
    fontSize: theme.FONT_SIZE_GRANDE,
  },
  footer: {
    backgroundColor: "white",
    borderColor: "white",
    paddingLeft: 20,
    paddingRight: 20
  }
});
