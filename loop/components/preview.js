import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
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
import AllPreviewTab from "./loopViews/preview/allPreview";
import TextPreviewTab from "./loopViews/preview/textPreview";
import ImagePreviewTab from "./loopViews/preview/imagePreview";
import VideoPreviewTab from "./loopViews/preview/videoPreview";
import LinkPreviewTab from "./loopViews/preview/linkPreview";
import theme from "../assets/styles/theme.style";
import tabStyles from "../assets/styles/tabstyles";
import commonStyle from "../assets/styles/styles";
const devicesWidth = Dimensions.get("window").width;
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import addMessage from "../services/actions/messageActions";

export default class PreviewScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      goBack: false
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header rounded hasTabs transparent>
          <Left>
            <Button
              transparent
              onPress={() => navigate("Explore", { name: "Jane" })}
            >
              <Icon name="arrow-back" style={commonStyle.Icon} />
            </Button>
          </Left>
          <Body>
            <Text>Henry Crown Gym</Text>
          </Body>
          <Right />
        </Header>
        <Tabs
          tabBarUnderlineStyle={tabStyles.tab}
          locked={true}
          renderTabBar={() => (
            <ScrollableTab scrollEnabled={false} style={{ borderWidth: 0 }} />
          )}
        >
          <Tab
            heading="All"
            tabStyle={tabStyles.tabStyle}
            activeTabStyle={tabStyles.activeTabStyle}
            activeTextStyle={tabStyles.activeTab}
            textStyle={commonStyle.text}
          >
            <AllPreviewTab
              navigation={this.props.navigation}
              goBack={this.state.goBack}
            />
          </Tab>
          <Tab
            heading="Top"
            tabStyle={tabStyles.tabStyle}
            activeTabStyle={tabStyles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={tabStyles.activeTab}
          />
          <Tab
            heading="Text"
            tabStyle={tabStyles.tabStyle}
            activeTabStyle={tabStyles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={tabStyles.activeTab}
          >
            <TextPreviewTab />
          </Tab>
          <Tab
            heading="Image"
            tabStyle={tabStyles.tabStyle}
            activeTabStyle={tabStyles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={tabStyles.activeTab}
          >
            <ImagePreviewTab />
          </Tab>
          <Tab
            heading="Video"
            tabStyle={tabStyles.tabStyle}
            activeTabStyle={tabStyles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={tabStyles.activeTab}
          >
            <VideoPreviewTab />
          </Tab>
          <Tab
            heading="Link"
            tabStyle={tabStyles.tabStyle}
            activeTabStyle={tabStyles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={tabStyles.activeTab}
          >
            <LinkPreviewTab />
          </Tab>
          <Tab
            heading="Event"
            tabStyle={tabStyles.tabStyle}
            activeTabStyle={tabStyles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={tabStyles.activeTab}
          />
        </Tabs>
        <View style={styles.addBtnContainer}>
          <Button transparent style={styles.addBtn}>
            <Text style={styles.addBtnText}>Add to your loop</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  addBtnContainer:{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.PRIMARY_COLOR
  },
  addBtn: {
    alignItems: "center",
    width: 200,
    marginLeft: (devicesWidth - 200) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText:{
    color: 'white',
    fontFamily: theme.FONT_FAMILY,
    fontSize: theme.FONT_SIZE_MEDIUM
  }
});
