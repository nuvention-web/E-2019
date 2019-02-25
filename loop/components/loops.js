import React from "react";
import { Image, View, StyleSheet,Dimensions } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";
import * as data from "../assets/data.json";
import theme from "../assets/styles/theme.style";
import commonStyle from "../assets/styles/styles";
const devicesWidth=Dimensions.get('window').width;

export default class LoopsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      myloops: data.myloops,
      loopContent: data.loopContent,
      loaded: false
    };
  }

  findLastMessage(id, lastMessage) {
    let result;
    let messege;
    messege = this.state.loopContent[id].find(messege => {
      return messege.id == lastMessage;
    });
    switch (messege.object.type) {
      case "text":
        result = messege.actor.name + ": " + messege.object.data;
        break;
      case "event":
        result = messege.actor.name + " shares an event";
        break;
      case "image":
        result = messege.actor.name + " posts an image";
        break;
      default:
        result =
          messege.actor.name +
          " " +
          messege.verb.name +
          "s a " +
          messege.object.type;
    }
    return result;
  }
  render() {
    const { navigate } = this.props.navigation;
    //const uri = require(`../assets/group.png`);
    return (
      <Container>
        <Header rounded hasTabs transparent>
          <Left>
            <Button
              transparent
              onPress={() => navigate("Home", { name: "Jane" })}
            >
              <Icon name="arrow-back" style={commonStyle.Icon} />
            </Button>
          </Left>
          <Body>
            <Title>My Loops</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <View style={styles.cards}>
            {this.state.myloops.map(loop => (
              <Card style={styles.card} key={loop.id} transparent>
                <CardItem>
                  <Left>
                    <Thumbnail source={require("../assets/01.png")} />
                    <Body style={styles.loopbody}>
                      <Text style={commonStyle.text} numberOfLines={1}>
                        {loop.title}
                      </Text>
                      <Text note style={styles.noteText} numberOfLines={1}>
                        {this.findLastMessage(loop.id, loop.lastMessage)}
                      </Text>
                    </Body>
                  </Left>
                  <Right>
                    <Button
                      transparent
                      onPress={() =>
                        navigate("LoopView", {
                          title: loop.title,
                          loopContent: this.state.loopContent,
                          loopid: loop.id
                        })
                      }
                    >
                      <Icon name="arrow-forward" style={commonStyle.Icon} />
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            ))}
          </View>
        </Content>
      </Container>
    );
  }
}
var styles = StyleSheet.create({
  content: {
    backgroundColor: "white"
  },
  noteText: {
    fontFamily: theme.FONT_FAMILY,
    width: devicesWidth-74,
  },
  cards: {},
  card: {
    elevation: 3
  }
});
