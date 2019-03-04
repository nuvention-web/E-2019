import React from "react";
import { Image, View, ScrollView,StyleSheet,Dimensions } from "react-native";
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
import theme from "../../assets/styles/theme.style";
import commonStyle from "../../assets/styles/styles";
const devicesWidth = Dimensions.get("window").width;
import styles from "../../assets/styles/loopchatstyles";
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import {CHATKIT_TOKEN_PROVIDER_ENDPOINT, CHATKIT_INSTANCE_LOCATOR} from "../../assets/config"
import Swipeout from "react-native-swipeout";
import LoopTextMessage from './messages/text';
import LoopImageMessage from './messages/image';
import LoopVideoMessage from './messages/video';

var BUTTONS = [
  { text: "Best", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Hot", icon: "analytics", iconColor: "#f42ced" },
  { text: "New", icon: "aperture", iconColor: "#ea943b" },
  { text: "Top", icon: "trash", iconColor: "#fa213b" },
  { text: "Close", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class allTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      upVote: false,
      like:false,
      messages:[]
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  updateUpVote = () =>{
    this.setState({upVote: !this.state.upVote})
  }

  updateLike = () =>{
    this.setState({like: !this.state.like})
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };
  checkVideoURL(url){
    return(url.match(/\.(mp4|m3u8)$/) != null);
  }
  checkImageURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  onReceive = data => {
    const { id, sender, text, createdAt } = data;
    var type;
    if (this.checkImageURL(text)) type = "image"
    else if (this.checkVideoURL(text)) type = "video"
    else type = "text"
    var date = new Date(createdAt)
    var dateString = date.toDateString();
    var timeString = date.toTimeString();
    const incomingMessage = {
      id: id,
      object: {
        type: type,
        data: text
      },
      timestamp: dateString.substring(0,11) + timeString.substring(0,5),
      actor: {
        uuid: sender.id,
        name: sender.name,
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA',
      },
    };
    allmessages = this.state.messages;
    if (allmessages.some((m)=> m.id === id)) return;
    allmessages.push(incomingMessage);
   
    this.setState({messages: allmessages})
  };



  componentDidMount() {
    const { loopContent} = this.props;
    this.setState({ messages: loopContent });

    const tokenProvider = new TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
    });

    const chatManager = new ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: '123',
      tokenProvider: tokenProvider,
    });
    const CHATKIT_ROOM_ID = this.props.loopId;
    
    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoom({
          roomId: CHATKIT_ROOM_ID,
          hooks: {
            onMessage: this.onReceive,
          },
        });
      })
      .catch(err => {
        console.log(err);
      });

  }


  render() {
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
            <Button rounded style={styles.actionbtnLik}>
              <AntDesign name="up-square-o" style={styles.ActionIconLik} />
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
          {this.state.messages.map(lc => 
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
                    <Text style={commonStyle.text}>
                      {lc.actor.name}
                    </Text>
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
              <Swipeout
                  key={lc.id}
                  right={swipeBtns}
                  backgroundColor="#fff"
                  buttonWidth={60}
                >
              <View style={styles.messages}>
                {lc.object.type == "text" ? (
                  <LoopTextMessage type="others" data={lc.object.data}/>
                ) : null}
                {lc.object.type == "image" ? (
                  <LoopImageMessage data={lc.object.data}/>
                ) : null}
                {lc.object.type == "video" ? (
                  <LoopVideoMessage />
                ) : null}
                {/* <View style={lc.object.type == "video" || lc.object.type == "image" ? styles.Iconbtnforiv:styles.Iconbtn}>
                  <Button iconRight  transparent style={styles.actionbtn}> 
                  <AntDesign name={this.state.like? "heart" : "hearto"} style={commonStyle.ActionIcon} />
                  </Button>
                  <Button iconRight  transparent style={styles.actionbtn}> 
                  <AntDesign name={this.state.upVote? "upsquare" : "up-square-o"} style={commonStyle.ActionIcon} />
                  </Button>
                  <Button iconRight transparent style={styles.actionbtn}> 
                  <AntDesign name="warning" style={commonStyle.ActionIcon} />
                  </Button>
                </View> */}
                </View></Swipeout>
              </CardItem>
            </Card>)}
        </View>
      </Content>
    );
  }
}

