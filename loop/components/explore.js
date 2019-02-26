import React from "react";
import { Image, View, StyleSheet,Dimensions } from "react-native";
import { Container, Header, Content, Button, Text,Item, Accordion,Left,Right,Body,Icon,Title,Thumbnail,Input} from "native-base";
import * as data from "../assets/data.json";
import commonStyle from "../assets/styles/styles";
import theme from "../assets/styles/theme.style";
import { SearchBar } from "react-native-elements";

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

  render() {

    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header searchBar rounded>
        <Button
              transparent
              onPress={() => navigate("Home", { name: "Jane" })}
            >
              <Icon name="arrow-back" style={commonStyle.Icon} />
            </Button>
          <Item style={styles.searchBarInput}>
            <Icon name="ios-search"  />
            <Input  placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent onPress={()=> navigate("ExploreMap")}>
          <Icon name="map" style={commonStyle.Icon} /></Button>
         
        </Header>
      

        {/*<View style={styles.searchArea}>
        <View style={{ width: devicesWidth - 60}}>
        <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={this.state.search}
            platform="ios"
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            inputContainerStyle={styles.searchBarInputContainer}
          /></View>
          <View style={{paddingTop: 8}}>
          <Button transparent onPress={()=> navigate("ExploreMap")}>
          <Icon name="map" style={commonStyle.Icon} /></Button>
          </View>
    </View>*/}
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
  },
  searchArea:{
    display:'flex',
    flexDirection:'row'
  },
  searchBarContainer: {
    backgroundColor: "white"
  },
  searchBarInputContainer: {
    backgroundColor: "white",
    fontFamily: theme.FONT_FAMILY,
    fontSize: theme.FONT_SIZE_MEDIUM,
    borderColor:"black",
 
  },
  searchBarInput: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: theme.FONT_SIZE_MEDIUM,
    backgroundColor: "#f6f6f6"
  }
});
