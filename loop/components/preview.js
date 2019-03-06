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
import AllPreviewTab from "./loopViews/allPreview";
import TextPreviewTab from "./loopViews/textPreview";
import ImagePreviewTab from "./loopViews/imagePreview";
import VideoPreviewTab from "./loopViews/videoPreview";
import LinkPreviewTab from "./loopViews/linkPreview";
import theme from "../assets/styles/theme.style";
import commonStyle from "../assets/styles/styles";
const devicesWidth = Dimensions.get("window").width;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import addMessage from '../services/actions/messageActions';


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
      render(){
        const { navigate } = this.props.navigation;
          return(
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
              <Body><Text>Henry Crown Gym</Text></Body>
              <Right/>
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
            <AllPreviewTab navigation={this.props.navigation} goBack={this.state.goBack}/>
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
            <TextPreviewTab/>
          </Tab>
          <Tab
            heading="Image"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={styles.activeTab}
          >
            <ImagePreviewTab/>
          </Tab>
          <Tab
            heading="Video"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={styles.activeTab}
          >
            <VideoPreviewTab/>
          </Tab>
          <Tab
            heading="Link"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={styles.activeTab}
          ><LinkPreviewTab/></Tab>
          <Tab
            heading="Event"
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={commonStyle.text}
            activeTextStyle={styles.activeTab}
          />
        </Tabs>
        <Button style={{alignItems: 'center',width:200,marginLeft:(devicesWidth-200)/2,justifyContent: 'center',alignItems: 'center',marginBottom:40,marginTop:40}}>
            <Text  >Add to your loop</Text>
         
        </Button>
        </Container>
    
            
          );
      }
}