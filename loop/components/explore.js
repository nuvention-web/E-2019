import React from "react";
import { Container, Header, Content, Button, Text } from "native-base";

export default class ExploreScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          <Button onPress={() => navigate("Home", { name: "Jane" })}>
            <Text>Go back to home</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
