import React from "react";
import { MapView } from 'expo';

export default class LoopMap extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
        <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 42.055234,
          longitude: -87.677273,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation = {true}
      />
    );
  }
}
