import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import ExploreScreen from './components/explore';
import LoopsScreen from './components/loops';
import LoopsViewScreen from './components/loopView';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
      <Button 
        title="My Loop" 
        onPress={() => navigate('Loops', {name: 'Jane'})}
        />
      <Button
        title="Explore"
        onPress={() => navigate('Explore', {name: 'Jane'})}
      />
      </View>
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
  Loops: {screen: LoopsScreen},
  LoopView: {screen: LoopsViewScreen}
});

const App = createAppContainer(MainNavigator);

export default App;
