import React from "react";
import { Image, View, StyleSheet, ScrollView } from "react-native";
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
import { AntDesign } from "@expo/vector-icons";
import theme from "../../../assets/styles/theme.style";
import commonStyle from "../../../assets/styles/styles";
import styles from "../../../assets/styles/loopchatstyles";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import {
  CHATKIT_TOKEN_PROVIDER_ENDPOINT,
  CHATKIT_INSTANCE_LOCATOR
} from "../../../assets/config";
import LoopLinkMessage from "../messages/link";

export default class linkTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      like: false,
      messages: []
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  checkVideoURL(url) {
    return url.match(/\.(mp4|m3u8)$/) != null;
  }
  checkImageURL(url) {
    return url.match(/\.(jpeg|JPG|jpg|gif|png)$/) != null;
  }

  is_url(url) {
    return url.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/) != null;
  }

  onReceive = data => {
    const { id, sender, text, createdAt } = data;
    var date = new Date(createdAt);
    if (!this.is_url(text)||this.checkVideoURL(text)||this.checkImageURL(text)) return;
    const incomingMessage = {
      id: id,
      object: {
        type: "link",
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
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            inputContainerStyle={styles.searchBarInputContainer}
          />
        </View>
        <View style={styles.cards}>
          {this.state.messages.map(lc => {
            return lc.object.type == "link" ? (
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
                  <View style={styles.messages}>
                    <LoopLinkMessage url={lc.object.data} />
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
