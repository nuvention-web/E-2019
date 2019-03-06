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
  Right
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

var BUTTONS = [
  { text: "Best", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Hot", icon: "analytics", iconColor: "#f42ced" },
  { text: "New", icon: "aperture", iconColor: "#ea943b" },
  { text: "Top", icon: "trash", iconColor: "#fa213b" },
  { text: "Close", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

class allTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      upVote: false,
      like: false,
      messages: [],
      loaded: false,
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  updateUpVote = () => {
    this.setState({ upVote: !this.state.upVote });
  };

  updateLike = () => {
    this.setState({ like: !this.state.like });
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
    this.setState({ messages: allmessages});
  };

  componentDidMount() {
    // const { loopContent } = this.props;
    this.setState({ messagesLoaded: false });
    
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
      .then(()=>{
        this.setState({messagesLoaded: true})
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.props.message != "" && !this.state.loaded) {
      let createAt = new Date();
      let dateString = createAt.toDateString();
      let timeString = createAt.toTimeString();
      var mymessage = {
        id: "111",
        object: {
          type: "text",
          data: this.props.message
        },
        timestamp: dateString.substring(0, 11) + timeString.substring(0, 5),
        actor: {
          uuid: "123",
          name: "admin",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA"
        }
      };
      let all = this.state.messages;
      let sig = [];
      sig.push(mymessage);
      if(all.length!=0){
        all = all.concat(sig);
        this.setState({ messages: all, loaded: true });
      }
    }
    const swipeBtns = [
      {
        component: (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginRight: -20
            }}
          >
            <Button rounded style={styles.actionbtnLik}>
              <AntDesign name="hearto" style={styles.ActionIconLik} />
            </Button>
          </View>
        ),
        backgroundColor: "white",
        onPress: () => {
          console.log("Delete Item");
        }
      },
      {
        component: (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <Button rounded style={styles.actionbtnUr}>
              <AntDesign name="warning" style={styles.ActionIconUr} />
            </Button>
          </View>
        ),
        backgroundColor: "white",
        onPress: () => {
          console.log("Delete Item");
        }
      }
    ];
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
        {/* <View style={styles.sortBtn}>
          <Button transparent iconLeft onPress={this.showActionSheet}>
            <Icon name="rocket" style={styles.ActionFirstIcon} />
            <Text style={styles.ActionText}>BEST POSTS</Text>
            <Ionicons
              name="md-arrow-dropdown"
              style={styles.ActionSecondIcon}
            />
          </Button>
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={"Which one do you like ?"}
            options={["Apple", "Banana", "cancel"]}
            cancelButtonIndex={2}
            destructiveButtonIndex={1}
            onPress={index => {
              this.setState({ clicked: BUTTONS[index] });
            }}
          />
        </View> */}
        <View style={styles.cards}>
          {this.state.messages.map(lc => (
            <Card style={styles.card} key={lc.id} transparent>
              {lc.actor.uuid == "123" ? (
                <CardItem>
                  <Left>
                    <Text note style={commonStyle.text}>
                      {lc.timestamp}
                    </Text>
                  </Left>
                  <Right>
                    <View style={styles.usrRight}>
                      <View style={styles.usrTitle}>
                        <Text style={styles.userText}>{lc.actor.name}</Text>
                        <Text note style={styles.userText}>
                          Top Poster
                        </Text>
                      </View>

                      <Thumbnail
                        source={{
                          uri:
                            "https://phadvocates.org/wp-content/themes/cardinal/images/default-thumb.png"
                        }}
                        small
                      />
                    </View>
                  </Right>
                </CardItem>
              ) : (
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
              )}
              <CardItem cardBody>
                {lc.actor.uuid === "123" ? (
                  <Swipeout
                    key={lc.id}
                    left={swipeBtns}
                    backgroundColor="#fff"
                    buttonWidth={60}
                  >
                    <Bubble lc={lc} />
                  </Swipeout>
                ) : (
                  <Swipeout
                    key={lc.id}
                    right={swipeBtns}
                    backgroundColor="#fff"
                    buttonWidth={60}
                  >
                    <Bubble lc={lc} />
                  </Swipeout>
                )}
              </CardItem>
            </Card>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return { message: state.messageReducer.message };
};

export default connect(
  mapStateToProps,
  null
)(allTab);
