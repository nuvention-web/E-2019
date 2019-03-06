import React from "react";
import { Image, View, ScrollView, StyleSheet, Dimensions } from "react-native";
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
  Right,
  Header
} from "native-base";
import { SearchBar } from "react-native-elements";
import ActionSheet from "react-native-actionsheet";
import { AntDesign } from "@expo/vector-icons";
import theme from "../../../assets/styles/theme.style";
import commonStyle from "../../../assets/styles/styles";
const devicesWidth = Dimensions.get("window").width;
import styles from "../../../assets/styles/loopchatstyles";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import {
  CHATKIT_TOKEN_PROVIDER_ENDPOINT,
  CHATKIT_INSTANCE_LOCATOR
} from "../../../assets/config";
import Swipeout from "react-native-swipeout";
import Bubble from "../messages/bubble";
import { connect } from "react-redux";

export default class allPreviewTab extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loaded: false
    };
  }
  checkVideoURL(url) {
    return url.match(/\.(mp4|m3u8)$/) != null;
  }
  checkImageURL(url) {
    return url.match(/\.(jpeg|JPG|jpg|gif|png)$/) != null;
  }

  is_url(url) {
    return (
      url.match(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      ) != null
    );
  }

  onReceive = data => {
    const { id, sender, text, createdAt } = data;
    var type;
    if (this.checkImageURL(text)) type = "image";
    else if (this.checkVideoURL(text)) type = "video";
    else if (this.is_url(text)) type = "link";
    else type = "text";
    var date = new Date(createdAt);
    var dateString = date.toDateString();
    var timeString = date.toTimeString();
    const incomingMessage = {
      id: id,
      object: {
        type: type,
        data: text
      },
      timestamp: dateString.substring(0, 11) + timeString.substring(0, 5),
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

    const tokenProvider = new TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
    });

    const chatManager = new ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: "123",
      tokenProvider: tokenProvider
    });
    const CHATKIT_ROOM_ID = "19410041";

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
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.precontent}>
        <View style={styles.cards}>
          {this.state.messages.map(lc => (
            <Card style={styles.card} key={lc.id} transparent>
              <CardItem>
                <Left>
                  <Thumbnail
                    source={{
                      uri:
                        "https://phadvocates.org/wp-content/themes/cardinal/images/default-thumb.png"
                    }}
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
                <Bubble lc={lc} preview={true} />
              </CardItem>
            </Card>
          ))}
        </View>
      </ScrollView>
    );
  }
}
