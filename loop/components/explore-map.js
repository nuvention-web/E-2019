import React from "react";
import { Image, View, StyleSheet,Dimensions } from "react-native";
import { Container, Header, Content, Button, Text,Item, Accordion,Left,Right,Body,Icon,Title,Thumbnail,Input} from "native-base";
import * as data from "../assets/data.json";
import commonStyle from "../assets/styles/styles";
import theme from "../assets/styles/theme.style";
import { SearchBar } from "react-native-elements";

const devicesWidth=Dimensions.get('window').width;
const devicesHeight=Dimensions.get('window').height;

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
            <Title>Map</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.searchArea}>
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
          <Button transparent onPress={()=> navigate("Explore")}>
          <Icon name="list" style={commonStyle.Icon} /></Button>
          </View>
        </View>
        <Content padder style={{ backgroundColor: "white" }}>
        <Image source={require("../assets/map.png")} style={{flex:1, width: devicesWidth,
            height: devicesHeight}}></Image>
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
    backgroundColor: "#f6f6f6"
  },
  searchBarInput: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: theme.FONT_SIZE_MEDIUM,
    backgroundColor: "#f6f6f6"
  }
});
