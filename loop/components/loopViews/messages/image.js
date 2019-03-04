import React from "react";
import { Image, View, ScrollView, StyleSheet, Dimensions } from "react-native";
import theme from "../../../assets/styles/theme.style";
const devicesWidth = Dimensions.get("window").width;

export default class LoopImageMessage extends React.Component {
  render() {
    return (
      <View style={styles.imgbubble}>
        <Image
          style={styles.img}
          source={{
            uri:
              this.props.data == ""
                ? "https://phadvocates.org/wp-content/themes/cardinal/images/default-thumb.png"
                : this.props.data
          }}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  imgbubble: {
    marginLeft: 40,
    width: devicesWidth - 100,
  },
  img: {
    flex: 1,
    height:200,
    resizeMode: "contain"
  }
});
