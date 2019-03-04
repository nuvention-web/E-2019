import React from "react";
import { StyleSheet, Dimensions, View, } from "react-native";
import theme from "../assets/styles/theme.style";
import commonStyle from "../assets/styles/styles";
import { MapView } from "expo";
import * as data from "../assets/marker.json";
import { Card, CardItem, Text, Icon, Right, Left, Body,Thumbnail,Button,Content} from "native-base";
const devicesWidth=Dimensions.get('window').width;
import markerImg from '../assets/groupview.png'

export default class LoopMap extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      markers: data.markers,
      isLoading: true,
      latitude: null,
      longitude: null,
      error: null,
      loaded: false
    };
  }

  componentDidMount(){
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loaded: true
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    if (this.state.loaded & this.state.isLoading){
      fetch(`https://loop-core.herokuapp.com/api/loops/nearby?lat=${encodeURIComponent(this.state.latitude)}&long=${encodeURIComponent(this.state.longitude)}`, {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }, 
      }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.entities,
        });

      })
      .catch((error) =>{
        console.error(error);
      });
    }
    return (
      
        <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 42.055234,
          longitude: -87.677273,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0221
        }}
        showsUserLocation={true}
      >
        {this.state.markers.map(marker => (
          <MapView.Marker key={marker.key} coordinate={marker.coordinate} image={markerImg} style={{height:3}}>
            <MapView.Callout>
              <CardItem>
                <Left>
                <Thumbnail source={require("../assets/01.png")} />
                
                <Body style={{maxWidth:devicesWidth-200}}>
                  <Text style={styles.text} >
                    Loop: {marker.title}
                    {"\n"}
                    {marker.distance}miles{"\n"}
                    Members: {marker.metrics.member_count}
                    {"\n"}
                    {marker.description}
                  </Text>
                </Body>
                </Left>
                <Right>
                  <Icon
                    style={[commonStyle.Icon, { fontSize: 40, marginLeft: 15 }]}
                    name="add"
                  />
                </Right>
              </CardItem>
            </MapView.Callout>
          </MapView.Marker>
        ))}
      </MapView>
    
    );
  }
}

var styles = StyleSheet.create({
  text: {
    fontFamily: theme.FONT_FAMILY,
    padding: 10,
    maxWidth: devicesWidth-100
  }
});