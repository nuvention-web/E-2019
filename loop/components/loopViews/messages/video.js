import React from "react";
import { Image, View, ScrollView, StyleSheet, Dimensions } from "react-native";
import theme from "../../../assets/styles/theme.style";
import VideoPlayer from "@expo/videoplayer";
import { Video } from "expo";

const devicesWidth = Dimensions.get("window").width;

export default class LoopVideoMessage extends React.Component {
  render() {
    return (
      <View style={styles.vidbubble}>
        <VideoPlayer
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
          videoWidth={devicesWidth - 120}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  vidbubble: {
    marginLeft: 40,
  },
  vidcontainer: {
    flex: 1
  }
});
