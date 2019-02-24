import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Container, Header, Content, Card,CardItem,Thumbnail, Text, Left, Body, Right, Button,Icon,Title } from 'native-base'
import * as data from '../assets/data.json';
import theme from '../assets/styles/theme.style';
import commonStyle from '../assets/styles/styles';

export default class LoopsScreen extends React.Component {

  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state={
    myloops: data.myloops,
    loopContent: data.loopContent,
    loaded: false,
  };
  }
  render() {
    const { navigate } = this.props.navigation;
    //const uri = require(`../assets/group.png`);
    return (
      <Container>
        <Header rounded hasTabs transparent>
        <Left>
          <Button  transparent onPress={() => navigate("Home", { name: "Jane" })}>
          <Icon name="arrow-back" style={commonStyle.Icon} />
          </Button>
          </Left>
          <Body>
            <Title>My Loops</Title>
          </Body>
          <Right/>
          </Header>
          <Content style={styles.content}>
          <View style={styles.cards}>
          {this.state.myloops.map(loop=>
          <Card style={styles.card}  key={loop.id} transparent>
            <CardItem>
              <Left>
                <Thumbnail 
                  source={
                    require('../assets/01.png')
    
                  }
                />
                <Body>
                  <Text style={commonStyle.text} numberOfLines={1}>{loop.title}</Text>
                  <Text note style={commonStyle.text} numberOfLines={1}>Last Message</Text>
                </Body>
              </Left>
              <Right>
               <Button transparent onPress={() => navigate("LoopView", { title: loop.title,loopContent:this.state.loopContent,loopid:loop.id })}>
              <Icon name="arrow-forward" style={commonStyle.Icon} />
              </Button>
              </Right>
            </CardItem>
          </Card>)}
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
  cards: {
  },
  card: {
    elevation: 3,
    marginTop: 10
  },

})
