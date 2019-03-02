import { StyleSheet,Dimensions } from 'react-native';
import theme from './theme.style.js';
const devicesWidth = Dimensions.get("window").width;
export default styles = StyleSheet.create({
  content: {
    marginBottom: 60
  },
  sortBtn: {
    marginTop: 10
  },
  ActionFirstIcon: {
    color: "grey"
  },
  ActionSecondIcon: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: "grey",
    marginLeft: -6
  },
  ActionText: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: "grey",
    fontWeight: "bold"
  },
  cards: {},
  card: {
    elevation: 3,
    marginTop: 10
  },
  messages:{
    display: 'flex',
    flexDirection: 'row'
  },
  bubble:{
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 50,
    marginLeft:40,
  },
  imgbubble:{
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 20,
    marginLeft:40,
    width: devicesWidth -100,
    padding: 20,
  },
  vidbubble:{
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 20,
    marginLeft:40,
    width: devicesWidth -100,
    padding: 20
  },
  img:{
    flex: 1,
    height:200,
    resizeMode: 'contain'
  },
  vidcontainer:{
    flex:1,
  },
  Iconbtn:{
    marginLeft: 5
  },
  textCard: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 12
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  searchBarContainer: {
    backgroundColor: "white"
  },
  searchBarInputContainer: {
    backgroundColor: "#f6f6f6"
  },
  searchBarInput: {
    fontFamily: theme.FONT_FAMILY,
    fontSize: theme.FONT_SIZE_MEDIUM,
    backgroundColor: "#f6f6f6"
  }
});
