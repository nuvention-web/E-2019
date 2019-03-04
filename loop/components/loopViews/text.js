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
import theme from "../../assets/styles/theme.style";
import commonStyle from "../../assets/styles/styles";
import styles from "../../assets/styles/loopchatstyles";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import {
  CHATKIT_TOKEN_PROVIDER_ENDPOINT,
  CHATKIT_INSTANCE_LOCATOR
} from "../../assets/config";
import LoopTextMessage from "./messages/text";


export default class textTab extends React.Component {
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

  onReceive = data => {
    const { id, sender, text, createdAt } = data;
    var date = new Date(createdAt);
    const incomingMessage = {
      id: id,
      object: {
        type: "text",
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
    const { loopContent } = this.props;
    this.setState({ messages: loopContent });

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
      <Content style={styles.content}>
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
          <ScrollView
            ref={ref => (this.scrollView = ref)}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollView.scrollToEnd({ animated: true });
            }}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {this.state.messages.map(lc => {
              return lc.object.type == "text" ? (
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
                      <LoopTextMessage type="others" data={lc.object.data} />
                    </View>
                  </CardItem>
                </Card>
              ) : null;
            })}
          </ScrollView>
        </View>
      </Content>
    );
  }
}
