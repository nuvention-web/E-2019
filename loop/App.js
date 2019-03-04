import React from "react";
import { StyleSheet,Dimensions, View, TouchableOpacity,} from "react-native";
import { Container, Content, Button, Text,Footer,FooterTab,Icon,Left,Right,Body,Segment,Thumbnail} from "native-base";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ExploreMapScreen from "./components/explore-map";
import ExploreScreen from "./components/explore";
import LoopsScreen from "./components/loops";
import LoopsViewScreen from "./components/loopView";
import { Font } from "expo";
import theme from './assets/styles/theme.style.js';
import commonStyle from "./assets/styles/styles";
import { SearchBar,Header } from "react-native-elements";
import  LeftHeader from "./components/leftHeader";
const devicesWidth=Dimensions.get('window').width;
class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    fontLoaded: false,
    seg:1,

  };

  async componentWillMount() {
    await Font.loadAsync({
      verdana: require("./assets/fonts/Verdana.ttf")
    });
    this.setState({ fontLoaded: true });
  }
  
  changePage = () => {
    this.setState({page: !this.state.page});

  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
      {/*<Header hasTabs>
        <Left>
                    <Thumbnail small source={require("./assets/01.png")} />
                    </Left>
                    <Body>
{this.state.fontLoaded ? (<Text style={commonStyle.text} numberOfLines={1}>Home</Text>):null}
                    </Body>
                  <Right>
                    <Button
                      transparent
                    >
                      <Icon name="arrow-plus" style={commonStyle.Icon} />
                    </Button>
                  </Right>
      </Header>
      <Header
  statusBarProps={{ barStyle: 'light-content' }}
  barStyle="light-content" // or directly
  leftComponent={ <LeftHeader/>}
  rightComponent={{ icon: 'add', style: { color: '#fff' } }}
  containerStyle={{
    backgroundColor: '#3D6DCC',
    justifyContent: 'space-around',
  }}
/>*/}
<Header
leftComponent={ <LeftHeader/>}
rightComponent={{ icon: 'add', style: { color: '#fff' } }}
containerStyle={{
    backgroundColor: 'white',
    justifyContent: 'space-around',
    height:100,
  }}>
  
</Header>

      <View >
      {this.state.fontLoaded ?<SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={this.state.search}
            platform="ios"
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            inputContainerStyle={styles.searchBarInputContainer}
          />:null}
        </View>
      <Segment style={{backgroundColor:'white'}}>
      {/*<TouchableOpacity style={styles.periodButton} onPress={() => this.changePage()}>
                <Text style={styles.periodName}> My Loops</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.periodButton} onPress={() => this.changePage()}>
                <Text style={styles.periodName} >LoopBook</Text>
</TouchableOpacity>*/}
        <Button
								style={{
									backgroundColor: this.state.seg === 1 ? "gray" : undefined,
									borderColor: "gray",
								}}
								first
								active={this.state.seg === 1 ? true : false}
								onPress={() => this.setState({ seg: 1 })}
							>
								<Text style={{ color: this.state.seg === 1 ? "#FFF" : "gray" }}>My Loops</Text>
							</Button>
							<Button
								last
								style={{
									backgroundColor: this.state.seg === 2 ? "gray" : undefined,
									borderColor: "gray",
								}}
								active={this.state.seg === 2 ? true : false}
								onPress={() => this.setState({ seg: 2 })}
							>
								<Text style={{ color: this.state.seg === 2 ? "#FFF" : "gray" }}>LoopBook</Text>
							</Button>
        </Segment>
        <Content padder>
         {this.state.seg==1?<Text>My Loops</Text>:
          <Text>LoopBook</Text>
         }
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical active>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() => navigate("Explore", { name: "Jane" })}>
              <Icon name="explore" />
              <Text>explore</Text>
            </Button>
            <Button vertical>
              <Icon name="settings" />
              <Text>Settings</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  content: {
    justifyContent: "center",
    flex: 1,
    margin: 30
  },
  btn: {
    marginBottom: 30,
    borderRadius: 0
  },
  text: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: theme.FONT_SIZE_MEDIUM
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

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Explore: { screen: ExploreScreen },
  Loops: { screen: LoopsScreen },
  LoopView: { screen: LoopsViewScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
