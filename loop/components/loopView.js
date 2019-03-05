import React from "react";
import { StyleSheet, View, Dimensions, KeyboardAvoidingView } from "react-native";
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
  ScrollableTab,
  Footer,
  Form
} from "native-base";
import AllTab from "./loopViews/all";
import TextTab from "./loopViews/text";
import ImageTab from "./loopViews/image";
import VideoTab from "./loopViews/video";
import theme from "../assets/styles/theme.style";
import commonStyle from "../assets/styles/styles";
const devicesWidth = Dimensions.get("window").width;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import addMessage from '../services/actions/messageActions';

class LoopsViewScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  sendMessage = () =>{
    let message = this.state.message;
    this.props.addMessage(message);
    //this.forceUpdate();
    this.setState({ message: ""})
  }
 
  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const title = navigation.getParam("title", "NO-TITLE");
    const loopId = navigation.getParam("loopid", "NO-ID");
    const loopContent = navigation.getParam("loopContent", "No-CONTENT");

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
            <Title style={styles.title}>{title}</Title>
          </Body>
          <Right>
            {/* <Button transparent>
              <Icon name="md-create" style={commonStyle.Icon} />
            </Button> */}
          </Right>
        </Header>
        <Tabs
          tabBarUnderlineStyle={styles.tab}
          locked={true}
          renderTabBar={() => <ScrollableTab scrollEnabled={false} style={{ borderWidth: 0 }} />}
        >
          <Tab
            heading="All"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            activeTextStyle={styles.activeTab}
            textStyle={commonStyle.text}
          >
            <AllTab loopContent={loopContent[loopId]} loopId={loopId} />
          </Tab>
          <Tab
            heading="Top"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={styles.activeTab}
          />
          <Tab
            heading="Text"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={styles.activeTab}
          >
            <TextTab loopContent={loopContent[loopId]} loopId={loopId}/>
          </Tab>
          <Tab
            heading="Image"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={styles.activeTab}
          >
            <ImageTab loopContent={loopContent[loopId]} loopId={loopId}/>
          </Tab>
          <Tab
            heading="Video"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={styles.activeTab}
          >
            <VideoTab loopContent={loopContent[loopId]} loopId={loopId}/>
          </Tab>
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
        </Tabs>
        
        <KeyboardAvoidingView 
          style={styles.messageBox}
          behavior="position"
        >
        <View style={styles.mbox}>
          <Button transparent>
            <Icon name="md-add" style={commonStyle.Icon} />
          </Button>
          <Item rounded style={styles.boxInput}>
            <Input placeholder="Type something" onChangeText={(text) => this.setState({ message: text })} value={this.state.message}/>
          </Item>
          <Button transparent onPress={this.sendMessage.bind(this)}>
            <Icon name="send" style={commonStyle.Icon} />
          </Button></View>
          </KeyboardAvoidingView>
        
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  title: {
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
    borderColor: "white"
  },
  activeTabStyle: {
    backgroundColor: "white"
  },
  messageBox: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  mbox:{
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 5,
    backgroundColor: "white",
  },
  boxInput: {
    backgroundColor: "#f3f3f5",
    borderColor: "white",
    width: devicesWidth - 100
  }
});

const mapStateToProps = (state) => {
  return { message: state.messageReducer.message}
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage:(m) => dispatch(addMessage(m))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoopsViewScreen);