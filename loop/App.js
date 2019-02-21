import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import ExploreScreen from './components/explore.js';
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to explore"
        onPress={() => navigate('Explore', {name: 'Jane'})}
      />
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Explore: {screen: ExploreScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
