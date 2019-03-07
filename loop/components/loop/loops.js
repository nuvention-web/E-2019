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
import theme from "../../assets/styles/theme.style";
import Images from '../../assets/pic/index';
import commonStyle from "../../assets/styles/styles";
const devicesWidth=Dimensions.get('window').width;
import Swipeout from 'react-native-swipeout';
import { AntDesign } from "@expo/vector-icons";


export default class Loops extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
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

  componentDidMount() {

  }

  render() {
    const swipeBtns = [
      {
        component: (
          <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                marginRight:-20
              }}
          >
          <Button rounded style={styles.actionbtn}>
          <AntDesign name="totop" style={styles.ActionIcon}/></Button>
          </View>
        ),
        backgroundColor: 'white',
        onPress: () => {
          console.log("Delete Item");
        },
      },
      {
        component: (
          <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
          >
          <Button rounded style={styles.actionbtnDel}>
          <AntDesign name="delete" style={styles.ActionIconDel} /></Button>
          </View>
        ),
        backgroundColor: 'white',
        onPress: () => {
          console.log("Delete Item");
        },
      },
    ];
    const { navigate } = this.props.navigation;
    //const uri = require(`../assets/group.png`);
    return (
        <Content style={styles.content}>
          <View style={styles.cards}>
            {this.props.loops.map(loop => (
              <Swipeout key={loop.id} right={swipeBtns} backgroundColor='#fff' buttonWidth={60}>
              <View>
              <Card style={styles.card}  transparent>
                <CardItem button onPress={() =>
                        navigate("LoopView", {
                          title: loop.name,
                          loopid: loop.id
                        })
                      }>
                  <Left>
                    <Thumbnail source={Images[loop.id]} />
                    <Body style={styles.loopbody}>
                      <Text style={styles.looptext} numberOfLines={1}>
                        {loop.name}
                      </Text>
                      <Text note style={styles.noteText} numberOfLines={1}>
                        Note here....
                      </Text>
                    </Body>
                  </Left>
                  <Right>
                    <Text style={styles.urgentMess}>(100)</Text>
                    <AntDesign name="notification" style={commonStyle.ActionIcon}></AntDesign>
                  </Right>
                </CardItem>
              </Card>
              </View></Swipeout>
            ))}
          </View>
        </Content>
    );
  }
}
var styles = StyleSheet.create({
  content: {
    backgroundColor: "white"
  },
  looptext:{
    width: devicesWidth-74,
    fontFamily: theme.FONT_FAMILY_SEMIBOLD,
    fontSize: theme.FONT_SIZE_MEDIUM
  },
  noteText: {
    fontFamily: theme.FONT_FAMILY,
    width: devicesWidth-74,
  },
  cards: {},
  card: {
    elevation: 3
  },
  actionbtn:{
    backgroundColor: '#F0F0F0',
    width: 50,
    height:50,
    justifyContent: 'center'
  },
  actionbtnDel:{
    backgroundColor: 'red',
    width: 50,
    height:50,
    justifyContent: 'center'
  },
  ActionIcon:{
    fontSize: theme.ICON_SIZE_LARGE,
    color: theme.PRIMARY_COLOR
  },
  ActionIconDel:{
    fontSize: theme.ICON_SIZE_LARGE,
    color: 'white'
  },
  urgentMess:{
    color: '#AEAEAE'
  }
});
