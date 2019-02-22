import React from "react";
import { Image, View, StyleSheet } from "react-native";
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
import { Video } from "expo";
import VideoPlayer from "@expo/videoplayer";
import { SearchBar } from "react-native-elements";
import ActionSheet from "react-native-actionsheet";
import { Ionicons } from "@expo/vector-icons";

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
      search: ""
    };
  }

  updateSearch = search => {
    this.setState({ search });
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

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
        <View style={styles.sortBtn}>
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
        </View>
        <View style={styles.cards}>
          <Card style={styles.card} transparent>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://phadvocates.org/wp-content/themes/cardinal/images/default-thumb.png"
                  }}
                />
                <Body>
                  <Text style={styles.text}>meee</Text>
                  <Text note style={styles.text}>
                    NativeBase
                  </Text>
                </Body>
              </Left>
              <Right>
                <Icon name="more"></Icon>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Text style={styles.textCard}>Your text here</Text>
            </CardItem>
            <CardItem>
              <Icon name="heart" style={{ color: "#ED4A6A" }} />
              <Text style={styles.text}>22</Text>
            </CardItem>
          </Card>

          <Card style={styles.card} transparent>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://phadvocates.org/wp-content/themes/cardinal/images/default-thumb.png"
                  }}
                />
                <Body>
                  <Text style={styles.text}>meee</Text>
                  <Text note style={styles.text}>
                    NativeBase
                  </Text>
                </Body>
              </Left>
              <Right>
                <Icon name="more"></Icon>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Image
                style={{ height: 300, flex: 1 }}
                source={{
                  uri:
                    "https://phadvocates.org/wp-content/themes/cardinal/images/default-thumb.png"
                }}
              />
            </CardItem>
            <CardItem>
              <Icon name="heart" style={{ color: "#ED4A6A" }} />
              <Text style={styles.text}>22</Text>
            </CardItem>
          </Card>

          <Card style={styles.card} transparent>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{
                    uri:
                      "https://phadvocates.org/wp-content/themes/cardinal/images/default-thumb.png"
                  }}
                />
                <Body>
                  <Text style={styles.text}>meee</Text>
                  <Text note style={styles.text}>
                    NativeBase
                  </Text>
                </Body>
              </Left>
              <Right>
                <Icon name="more"></Icon>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <VideoPlayer
                videoProps={{
                  shouldPlay: true,
                  resizeMode: Video.RESIZE_MODE_CONTAIN,
                  source: {
                    uri:
                      "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
                  }
                }}
                isPortrait={true}
                playFromPositionMillis={0}
              />
            </CardItem>
            <CardItem>
              <Icon name="heart" style={{ color: "#ED4A6A" }} />
              <Text style={styles.text}>22</Text>
            </CardItem>
          </Card>
        </View>
      </Content>
    );
  }
}

var styles = StyleSheet.create({
  content: {
    backgroundColor: "#eaebee"
  },
  sortBtn:{
    marginTop:10
  },
  ActionFirstIcon: {
    fontSize: 20,
    color: "#acadb0"
  },
  ActionSecondIcon: {
    fontSize: 25,
    color: "#acadb0",
    marginLeft: -6
  },
  ActionText: {
    fontSize: 15,
    color: "#9b9c9e",
    fontWeight: "bold"
  },
  cards: {
  },
  card: {
    elevation: 3,
    marginTop: 10
  },
  textCard:{
    fontFamily: "verdana",
    margin:20,
    fontSize: 26
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  searchBarContainer: {
    backgroundColor: "white"
  },
  searchBarInputContainer: {
    backgroundColor: "#f6f6f6"
  },
  searchBarInput: {
    fontFamily: "verdana",
    fontSize: 16,
    backgroundColor: "#f6f6f6"
  },
  text: {
    fontFamily: "verdana"
  }
});
