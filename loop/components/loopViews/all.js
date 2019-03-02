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
//import { Video } from "expo";
//import VideoPlayer from "@expo/videoplayer";
import { SearchBar } from "react-native-elements";
import ActionSheet from "react-native-actionsheet";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../assets/styles/theme.style";
import commonStyle from "../../assets/styles/styles";
const devicesWidth = Dimensions.get("window").width;
import styles from "../../assets/styles/loopchatstyles";
import Video from 'react-native-video';

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
          {this.props.loopContent.map(lc => 
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
                      March, 1st
                    </Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
              <View style={styles.messages}>
                {lc.object.type == "text" ? (
                  <View style={styles.bubble}>
                  <Text style={styles.textCard}>{lc.object.data}</Text>
                  </View>
                ) : null}
                {lc.object.type == "image" ? (
                  <View style={styles.imgbubble}>
                  <Image
                    style={styles.img}
                    source={{
                      uri:
                        "https://phadvocates.org/wp-content/themes/cardinal/images/default-thumb.png"
                    }}
                  /></View>
                ) : null}
                {lc.object.type == "video" ? (
                  <View style={styles.vidbubble}>
                  {/*<ScrollView style={styles.vidcontainer}>*/}
                  {/*<VideoPlayer
                    videoProps={{
                      shouldPlay: true,
                      resizeMode: Video.RESIZE_MODE_COVER,
                      source: {
                        uri:
                          "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
                      }
                    }}
                    isPortrait={true}
                    playFromPositionMillis={0}
                  />*/}
                  {/*<Video source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}   // Can be a URL or a local file.
                          ref={(ref) => {
                            this.player = ref
                          }}
                          resizeMode="cover"                                      // Store reference
                          onBuffer={this.onBuffer}                // Callback when remote video is buffering
                          onError={this.videoError}               // Callback when video cannot be loaded
                        style={style.backgroundVideo} />*/}
                        <Video source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}}   // Can be a URL or a local file.
                                ref={(ref) => {
                                  this.player = ref
                                }}                                      // Store reference
                                rate={1.0}                              // 0 is paused, 1 is normal.
                                volume={1.0}                            // 0 is muted, 1 is normal.
                                muted={false}                           // Mutes the audio entirely.
                                paused={false}                          // Pauses playback entirely.
                                resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                                repeat={true}                           // Repeat forever.
                                playInBackground={false}                // Audio continues to play when app entering background.
                                playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                                ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                                progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                                onLoadStart={(el)=>console.log("video is being loaded",el)}            // Callback when video starts to load
                                onLoad={()=>console.log("video loading")}               // Callback when video loads
                                onProgress={()=>console.log("video loading is in progress")}               // Callback every ~250ms with currentTime
                                onEnd={()=>console.log("video is now loaded")}                      // Callback when playback finishes
                                onError={()=>console.log("video can not be loaded")}               // Callback when video cannot be loaded
                                onBuffer={()=>console.log("buffer stage")}                // Callback when remote video is buffering
                                onTimedMetadata={()=>console.log("metadata received")}  // Callback when the stream receive some metadata
                                style={style.backgroundVideo} />
                {/*</ScrollView>*/}</View>
                ) : null}
                <Button iconRight transparent style={styles.Iconbtn}> 
                  <Icon name="heart" style={commonStyle.Icon} />
                  </Button>
                </View>
              </CardItem>
            </Card>)}
        </View>
      </Content>
    );
  }
}
var style = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: devicesWidth -100,
    height:200,
  },
});
