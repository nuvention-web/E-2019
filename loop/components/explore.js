import React from "react";
import { Image, View, StyleSheet,Dimensions } from "react-native";
import { Container, Header, Content, Button, Text,Item, Accordion,Left,Right,Body,Icon,Title,Thumbnail,Input} from "native-base";
import * as data from "../assets/data.json";
import commonStyle from "../assets/styles/styles";
import theme from "../assets/styles/theme.style";
const devicesWidth=Dimensions.get('window').width;

export default class ExploreScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      nearbyLoops: data.nearbyLoops,
      loaded: false
    };
  }

  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
       justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "white" }}>

      <Thumbnail source={require("../assets/01.png")} />
      <Text style={{textAlign:"left",width: devicesWidth - 168}}>
          {" "}{item.title}{" "} {item.distance} mile
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}

      </View>
    );
  }
  _renderContent(item) {
    return (

      <Text
        style={{
          backgroundColor: "white",
          padding: 10,
          marginLeft:90,
        }}
      >Members: {item.metrics.member_count}{"\n"}{"\n"}{item.description}
      </Text>

    );
  }

  render() {

    const { navigate } = this.props.navigation;
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
            <Title>Explore</Title>
          </Body>
          <Right />
        </Header>

        <View style={ {width: devicesWidth - 100}}>
          <Item rounded>
            <Icon name="ios-search" />
            <Input placeholder="Find New Loops" />
          </Item>
        </View>
        <Content padder style={{ backgroundColor: "white" }}>
          <Accordion
            dataArray={this.state.nearbyLoops}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            headerStyle={{ backgroundColor: '#40e0d0'}}
          />
        </Content>

      </Container>
    );
  }
}

var styles = StyleSheet.create({
  noteText: {
    fontFamily: theme.FONT_FAMILY,
    width: devicesWidth-74,
  },
  cards: {},
  card: {
    elevation: 3
  }
});
