import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import theme from "../assets/styles/theme.style";
import commonStyle from "../assets/styles/styles";
import { MapView } from "expo";
import * as data from "../assets/marker.json";
import axios from "axios";

import {
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Left,
  Body,
  Thumbnail,
  Button,
  Content,
  Image
} from "native-base";
const devicesWidth = Dimensions.get("window").width;
import markerImg from "../assets/groupview.png";
import AntDesign from "@expo/vector-icons/AntDesign";

export default class LoopMap extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      markers: data.markers,
      isLoading: true,
      loaded: false
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      `https://loop-core.herokuapp.com/api/loops/nearby?`,
      {
        params: {
          lat: this.props.lat,
          long: this.props.long
        }
      }
    );
    console.log(res.data);
    const dataSource = res.data.entities;
    this.setState({ dataSource });
  }

  fetchdata() {
    axios
      .get(`https://loop-core.herokuapp.com/api/loops/nearby?`, {
        params: {
          lat: this.state.latitude,
          long: this.state.longitude
        }
      })
      .then(res => {
        const dataSource = res.data.entities;
        this.setState({ dataSource });
      });
  }

  render() {
    const { navigate } = this.props.navigation;
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
        {this.state.dataSource != undefined
          ? this.state.dataSource.map(marker => (
              <MapView.Marker
                key={marker.id}
                coordinate={marker.location}
                image={markerImg}
                style={{ height: 3 }}
              >
                <MapView.Callout onPress={() => navigate("Preview")}>
                  <CardItem>
                    <Left>
                      <Thumbnail large source={require("../assets/logo.png")} />

                      <Body style={{ maxWidth: devicesWidth - 200 }}>
                        <Text style={styles.text}>
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
                      <Button
                        transparent
                        onPress={() => navigate("Preview", { name: "Jane" })}
                      >
                        <AntDesign name="eyeo" style={styles.eyeIcon} />
                      </Button>
                    </Right>
                  </CardItem>
                </MapView.Callout>
              </MapView.Marker>
            ))
          : null}
      </MapView>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    fontFamily: theme.FONT_FAMILY,
    padding: 10,
    maxWidth: devicesWidth - 100
  },
  eyeIcon: {
    fontSize: theme.ICON_SIZE_LARGER,
    color: theme.PRIMARY_COLOR
  }
});
