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
import theme from "../../assets/styles/theme.style";
import commonStyle from "../../assets/styles/styles";
import styles from "../../assets/styles/loopchatstyles";

var BUTTONS = [
  { text: "Best", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Hot", icon: "analytics", iconColor: "#f42ced" },
  { text: "New", icon: "aperture", iconColor: "#ea943b" },
  { text: "Top", icon: "trash", iconColor: "#fa213b" },
  { text: "Close", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class imageTab extends React.Component {
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
          {this.props.loopContent.map(lc => {
          return lc.object.type == "image" ? (
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
              <View style={styles.imgbubble}>
                  <Image
                    style={styles.img}
                    source={{
                      uri:
                        "https://phadvocates.org/wp-content/themes/cardinal/images/default-thumb.png"
                    }}
                  /></View>
                  <Button iconRight transparent style={styles.Iconbtn}> 
                  <Icon name="heart" style={commonStyle.Icon} />
                  </Button>
                  </View>
              </CardItem>
            </Card>
            ) : null})}
        </View>
      </Content>
    );
  }
}