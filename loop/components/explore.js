import React from "react";
import { Image, View, StyleSheet,Dimensions,ScrollView} from "react-native";
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

      <Thumbnail source={require("../assets/pic/19410673.jpg")} />
      <Text style={styles.headerTextStyle}>
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
        style={styles.contentTextStyle}
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
            <Input  placeholder="Search" style={commonStyle.searchBarInput}/>
            <Icon name="md-close-circle" />
          </Item>
          <Button transparent onPress={this.switchToMap.bind(this)}>
          {!this.state.showMap ? (<Icon name="map" style={commonStyle.Icon} />):(<Icon name="list" style={commonStyle.Icon} />)}
          </Button>
         
        </Header>
      {this.state.showMap && this.state.loaded? 
        (<Container>
         <View style={{height:130,backgroundColor:'transparent'}}>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:7}}>
          <Text style={styles.segTextActive}>Top Loop</Text>
          </View>
          <View style={{flex:3}}>
          <ScrollView horizontal={true} 
          showsHorizontalSrcollIndicator={false}
          contentContainerStyle={{
            alignItems:'center',
            paddingStart:5,
            paddingEnd:5
          }}
          >
           <View style={{marginLeft:5,marginRight:5}}><Thumbnail style={styles.topImage} source={require("../assets/pic/lincoln-park.png")} /><View style={styles.topText}><Text style={styles.textStyle} numberOfLines={1}>Lincoln Park</Text></View></View>
           <View style={{marginLeft:5,marginRight:5}}><Thumbnail style={styles.topImage} source={require("../assets/pic/chicago.jpg")} /><View style={styles.topText}><Text style={styles.textStyle} numberOfLines={1}>Chicago Techtalk</Text></View></View>
           <View style={{marginLeft:5,marginRight:5}}><Thumbnail style={styles.topImage} source={require("../assets/pic/nu.jpg")} /><View style={styles.topText}><Text style={styles.textStyle} numberOfLines={1}>NUCollegeBuds</Text></View></View>
           <View style={{marginLeft:5,marginRight:5}}><Thumbnail style={styles.topImage} source={require("../assets/pic/19410045.jpg")} /><View style={styles.topText}><Text style={styles.textStyle} numberOfLines={1}>Kellogg</Text></View></View>
           <View style={{marginLeft:5,marginRight:5}}><Thumbnail style={styles.topImage} source={require("../assets/pic/19410041.jpg")} /><View style={styles.topText}><Text style={styles.textStyle} numberOfLines={1}>Chicago Jazz</Text></View></View>
           <View style={{marginLeft:5,marginRight:5}}><Thumbnail style={styles.topImage} source={require("../assets/pic/19410044.jpg")} /><View style={styles.topText}><Text style={styles.textStyle} numberOfLines={1}>Chicago Swimming</Text></View></View>
           <View style={{marginLeft:5,marginRight:5}}><Thumbnail style={styles.topImage} source={require("../assets/pic/19410047.jpg")} /><View style={styles.topText}><Text style={styles.textStyle} numberOfLines={1}>One-Piece</Text></View></View>
           <View style={{marginLeft:5,marginRight:5}}><Thumbnail style={styles.topImage} source={require("../assets/pic/19410043.jpg")} /><View style={styles.topText}><Text style={styles.textStyle} numberOfLines={1}>Chicago NBA Fans</Text></View></View>
          </ScrollView>
          </View>
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
  },
  segTextActive: {
    fontFamily: theme.FONT_FAMILY_SEMIBOLD,
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: "black",
    paddingTop: 5,
    paddingBottom: 5,
    overflow: 'hidden',
    textAlign:'center'
  },
  topImage:{
    width:65, 
    height: 65, 
    borderRadius: 65/2,
    marginHorizontal:5,
    borderColor:'#8e07ff',
    borderWidth:2
  },
  topText:{
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1, 
    flexWrap: 'wrap',
    maxWidth:65,
    textAlign:'center',
    marginLeft:5,
    marginRight:5,
    alignItems:'center',
  },
  textStyle:{
    color: "black",
    fontFamily: theme.FONT_FAMILY_SEMIBOLD,
    fontSize: theme.FONT_SIZE_GRANDE,
  },
  headerTextStyle:{
    color: "black",
    fontFamily: theme.FONT_FAMILY_SEMIBOLD,
    fontSize: theme.FONT_SIZE_MEDIUM,
    textAlign:"left",
    width: devicesWidth - 168
  },
  contentTextStyle:{
    backgroundColor: "white",
    padding: 10,
    marginLeft:90,
    fontFamily: theme.FONT_FAMILY,
  }
});
