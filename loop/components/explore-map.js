import React from "react";
import commonStyle from "../assets/styles/styles";
import { MapView } from 'expo';
import * as data from "../assets/marker.json";
import {Card, CardItem, Text, Icon, Right,Left,Body} from "native-base";
export default class LoopMap extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state={
      markers: data.markers,
 }
 }

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
      >
          {this.state.markers.map(marker => ( 
        <MapView.Marker key= {marker.key} coordinate={marker.coordinate}>
     
        <MapView.Callout>
        
            <CardItem>
              <Body>
              <Text style={commonStyle.text}>Title: {marker.title}{"\n"}
        Place: {marker.description}</Text>
        </Body>
              <Right>
              <Icon style={[commonStyle.Icon,{fontSize:40,marginLeft:15}]} name="add" />
              </Right>
             </CardItem>
           
        
       
        </MapView.Callout>
        </MapView.Marker>))}
      </MapView>
    );
  }
}
