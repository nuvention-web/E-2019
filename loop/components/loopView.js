import React from "react";
import { Container, Header, Content, Button, Text } from "native-base";

export default class LoopsViewScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content>
          <Button onPress={() => navigate("Loops", { name: "Jane" })}>
            <Text>Go back to My Loops</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
