import React from "react";
import { Image, View, StyleSheet,Dimensions } from "react-native";
import { Container, Header, Content, Button, Text,Item, Accordion,Left,Right,Body,Icon,Title,Thumbnail,Input} from "native-base";
import * as data from "../assets/data.json";
import commonStyle from "../assets/styles/styles";
import theme from "../assets/styles/theme.style";
import { SearchBar } from "react-native-elements";
import LoopMap from "./explore-map";
const devicesWidth=Dimensions.get('window').width;

export default class ExploreScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      nearbyLoops: data.nearbyLoops,
      loaded: false,
      showMap: true,
      latitude:null,
      longitude:null,
      error:null,
      loaded:false
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
          ? <Icon style={commonStyle.Icon} name="remove" />
          : <Icon style={commonStyle.Icon} name="add" />}

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

  switchToMap(){
    let sm = !this.state.showMap
    this.setState({
      showMap: sm
    })
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Get location successfully!")
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        console.log(position.coords.latitude)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loaded: true
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {

    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header searchBar rounded transparent style={styles.headerStyle}>
          <Item style={styles.searchBarInput}>
            <Icon name="ios-search"  />
            <Input  placeholder="Search" />
            <Icon name="md-close-circle" />
          </Item>
          <Button transparent onPress={this.switchToMap.bind(this)}>
          {!this.state.showMap ? (<Icon name="map" style={commonStyle.Icon} />):(<Icon name="list" style={commonStyle.Icon} />)}
          </Button>
         
        </Header>
      {this.state.showMap && this.state.loaded? 
        (<Container>
        <View style={{maxHeight:70,flex:'2', flexDirection:'row', justifyContent: 'space-around', backgroundColor: 'transparent'}}>
        <Thumbnail source={require("../assets/01.png")} />
        <Thumbnail source={require("../assets/01.png")} />
        <Thumbnail source={require("../assets/01.png")} />
        <Thumbnail source={require("../assets/01.png")} />
        <Thumbnail source={require("../assets/01.png")} />

          </View>
        <LoopMap navigation={this.props.navigation} lat={this.state.latitude} long={this.state.longitude}/>
        </Container>
        ): 
      (<Content padder style={{ backgroundColor: "white" }}>
        <Accordion
          dataArray={this.state.nearbyLoops}
          animation={true}
          expanded={true}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          headerStyle={{ backgroundColor: '#40e0d0'}}
        />
      </Content>
      )
    }
        

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
  },
  headerStyle:{
    height:80,
  },
  searchBarInput: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: theme.FONT_SIZE_MEDIUM,
    backgroundColor: "#f6f6f6",
    height: 40
  }
});
