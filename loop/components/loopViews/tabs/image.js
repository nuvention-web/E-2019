import React from "react";
import { Image, View, StyleSheet,ScrollView} from "react-native";
import {
  Content,
  Button,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Body,
  Icon,
  Left,
  Right
} from "native-base";
import { SearchBar } from "react-native-elements";
import ActionSheet from "react-native-actionsheet";
import { AntDesign } from "@expo/vector-icons";
import theme from "../../../assets/styles/theme.style";
import commonStyle from "../../../assets/styles/styles";
import styles from "../../../assets/styles/loopchatstyles";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import {
  CHATKIT_TOKEN_PROVIDER_ENDPOINT,
  CHATKIT_INSTANCE_LOCATOR
} from "../../../assets/config";
import LoopImageMessage from "../messages/image";
import Avatars from '../../../assets/pic/avatar.js';

export default class imageTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      messages: []
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  checkImageURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  onReceive = data => {
    const { id, sender, text, createdAt } = data;
    if (!this.checkImageURL(text)) return;
    var date = new Date(createdAt);
    const incomingMessage = {
      id: id,
      object: {
        type: "image",
        data: text
      },
      timestamp: date.toDateString(),
      actor: {
        uuid: sender.id,
        name: sender.name,
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA"
      }
    };
    allmessages = this.state.messages;
    if (allmessages.some(m => m.id === id)) return;
    allmessages.push(incomingMessage);
    this.setState({ messages: allmessages });
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
    const CHATKIT_ROOM_ID = this.props.loopId;

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoom({
          roomId: CHATKIT_ROOM_ID,
          hooks: {
            onMessage: this.onReceive
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <ScrollView
        style={styles.content}
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.scrollView.scrollToEnd({ animated: true });
        }}
      >
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
        <View style={styles.cards}>
          {this.state.messages.map(lc => {
            return lc.object.type == "image" ? (
              <Card style={styles.card} key={lc.id} transparent>
                <CardItem>
                  <Left>
                    <Thumbnail
                      source={Avatars[lc.actor.uuid]}
                      small
                    />
                    <Body>
                      <Text style={commonStyle.text}>{lc.actor.name}</Text>
                      <Text note style={commonStyle.text}>
                        Top Poster
                      </Text>
                    </Body>
                  </Left>
                  <Right>
                    <Text note style={commonStyle.text}>
                      {lc.timestamp}
                    </Text>
                  </Right>
                </CardItem>
                <CardItem cardBody>
                  <View style={styles.messages}>
                    <LoopImageMessage data={lc.object.data} />
                    <View>
                      <Button transparent style={styles.Iconbtn}>
                        <AntDesign
                          name="up-square-o"
                          style={commonStyle.ActionIcon}
                        />
                        <Text style={styles.Icontext}>0</Text>
                      </Button>
                    </View>
                  </View>
                </CardItem>
              </Card>
            ) : null;
          })}
        </View>
      </ScrollView>
    );
  }
}
