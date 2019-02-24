import React from "react";
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button,Icon,Title } from 'native-base'
import * as data from '../assets/data.json';
export default class LoopsScreen extends React.Component {

  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state={
    myloops: data.myloops,
    loopContent: data.loopContent,
    loaded: false,
  };
  }
  /*componentDidMount() {
    import('../assets/data.json').then(json => 
      { this.setState({myloops:json.myloops});
      console.log(json.myloops);
    });  
  };
  async componentWillMount() {
    await import('../assets/data.json').then((json)=>{
      this.setState({myloops:json})
     });
     this.setState({ loaded: true });
  }*/
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header rounded hasTabs transparent>
        <Left>
          <Button  transparent onPress={() => navigate("Home", { name: "Jane" })}>
          <Icon name="arrow-back" style={{ color: "#8e07ff" }} />
          </Button>
          </Left>
          <Body>
            <Title>My Loops</Title>
          </Body>
          <Right/>
          </Header>
          <List>
          {this.state.myloops.map(loop=><ListItem key={loop.id} thumbnail>
              <Left>
                <Thumbnail square source={require('../assets/01.png')} />
              </Left>
              <Body>
                <Text>{loop.title}</Text>
                <Text note numberOfLines={1}>{loop.lastMessage}</Text>
              </Body>
              <Right>
              <Button onPress={() => navigate("LoopView", { name: "Jane",loopContent:this.state.loopContent,myloops:this.state.myloops })}>
              <Icon name="arrow-forward" style={{ color: "#8e07ff" }} />
              </Button>
              </Right>
            </ListItem>)}
          </List>
      </Container>
    );
  }
}
