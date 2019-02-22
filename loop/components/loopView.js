import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Left,
  Right,
  Text,
  Icon,
  Item,
  Input,
  Tab,
  Tabs,
  Body,
  Title,
  ScrollableTab
} from "native-base";
import AllTab from "./loopViews/all";
export default class LoopsViewScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {};
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header rounded hasTabs>
          <Left>
            <Button transparent onPress={() => navigate("Loops", { name: "Jane" })}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Chicago Jazz</Title>
          </Body>
          <Right>
            
          </Right>
        </Header>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading="All">
            <AllTab />
          </Tab>
          <Tab heading="Text" />
          <Tab heading="Image" />
          <Tab heading="Video" />
          <Tab heading="News" />
          <Tab heading="Event" />
          <Tab heading="Star" />
        </Tabs>
      </Container>
    );
  }
}

var styles = StyleSheet.create({});
