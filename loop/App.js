import React, {PureComponent} from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import PreviewScreen from "./components/preview";
import ExploreScreen from "./components/explore";
import LoopsViewScreen from "./components/loopView";
import MainScreenNavigator from "./components/footer";
import { Provider } from "react-redux";
import configureStore from "./services/reducers/store";
import NavigationService from "./services/NavigationService";
const store = configureStore();


const MainNavigator = createStackNavigator({
  Main: { screen: MainScreenNavigator },
  LoopView: { screen: LoopsViewScreen },
  Preview: {screen:PreviewScreen},
});



const AppContainer = createAppContainer(MainNavigator);

class App extends PureComponent {
  render() {
    return (
    <Provider store={store}>
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      /></Provider>
    );
  }
}
export default App;