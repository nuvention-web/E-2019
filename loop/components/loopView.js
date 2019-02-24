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
import theme from '../assets/styles/theme.style';
import commonStyle from '../assets/styles/styles';

export default class LoopsViewScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'NO-TITLE');
    const loopId = navigation.getParam('loopid', 'NO-ID');
    const loopContent = navigation.getParam('loopContent','No-CONTENT');

    return (
      <Container>
        <Header rounded hasTabs transparent>
          <Left>
            <Button
              transparent
              onPress={() => navigate("Loops", { name: "Jane" })}
            >
              <Icon name="arrow-back" style={commonStyle.Icon} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>{title}</Title>
          </Body>
          <Right />
        </Header>
        <Tabs
          tabBarUnderlineStyle={styles.tab}
          renderTabBar={() => <ScrollableTab style={{ borderWidth: 0}} />}
        >
          <Tab
            heading="All"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTab}
            textStyle={commonStyle.text}
          >
            <AllTab loopContent={loopContent[loopId]} />
          </Tab>
          <Tab
            heading="Text"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={styles.activeTab}
          />
          <Tab
            heading="Image"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={styles.activeTab}
          />
          <Tab
            heading="Video"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={styles.activeTab}
          />
          <Tab
            heading="News"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={styles.activeTab}
          />
          <Tab
            heading="Event"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={styles.activeTab}
          />
          <Tab
            heading="Star"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={styles.activeTab}
          />
        </Tabs>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  title:{
    fontFamily: theme.FONT_FAMILY,
    fontSize: 20
  },
  tab: {
    backgroundColor: theme.PRIMARY_COLOR
  },
  activeTab: {
    color: theme.PRIMARY_COLOR
  },
  tabStyle: {
    backgroundColor: "white",
    borderColor: 'white'
  },
  activeTabStyle:{
    backgroundColor: "white"
  }
});
