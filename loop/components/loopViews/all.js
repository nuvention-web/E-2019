import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import {
  Content,
  Button,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Body,
  Icon,
  Left
} from "native-base";
import { Video } from "expo";
import VideoPlayer from "@expo/videoplayer";
import { SearchBar } from "react-native-elements";

export default class allTab extends React.Component {
  state = {
    search: ""
  };
  updateSearch = search => {
    this.setState({ search });
  };
  render() {
    return (
      <Content style={styles.content}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={this.state.search}
          platform="ios"
          containerStyle={styles.searchBarContainer}
        />
        {/* <Button onPress={() => navigate("Loops", { name: "Jane" })}>
          <Text>Go back to My Loops</Text>
        </Button> */}
        <Card style={{ elevation: 3 }}>
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    "https://phadvocates.org/wp-content/themes/cardinal/images/default-thumb.png"
                }}
              />
              <Body>
                <Text>meee</Text>
                <Text note>NativeBase</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Text>Your text here</Text>
          </CardItem>
          <CardItem>
            <Icon name="heart" style={{ color: "#ED4A6A" }} />
            <Text>22</Text>
          </CardItem>
        </Card>

        <Card style={{ elevation: 3 }}>
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    "https://phadvocates.org/wp-content/themes/cardinal/images/default-thumb.png"
                }}
              />
              <Body>
                <Text>meee</Text>
                <Text note>NativeBase</Text>
              </Body>
            </Left>
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
            <Text>22</Text>
          </CardItem>
        </Card>

        <Card style={{ elevation: 3 }}>
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    "https://phadvocates.org/wp-content/themes/cardinal/images/default-thumb.png"
                }}
              />
              <Body>
                <Text>meee</Text>
                <Text note>NativeBase</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            {/* <Video
                source={require("../assets/default.mp4")} // Can be a URL or a local file.
                ref={ref => {
                  this.player = ref;
                }} // Store reference
                onBuffer={this.onBuffer} // Callback when remote video is buffering
                onError={this.videoError} // Callback when video cannot be loaded
                style={styles.backgroundVideo}
              /> */}
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
            <Text>22</Text>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

var styles = StyleSheet.create({
  content: {
    margin: 10
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  searchBarContainer:{
      backgroundColor: "white"
  }
});
