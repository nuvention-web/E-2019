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
    flexDirection: 'row',
    width:devicesWidth
  },
  
  Iconbtn:{
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    flex:1,
  },
  Iconbtnforiv:{
    marginLeft: 10,
    flex:1,
  },
  actionbtn:{
    width:40
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
  },
  actionbtnLik:{
    backgroundColor: '#F0F0F0',
    width: 40,
    height:40,
    justifyContent: 'center'
  },
  actionbtnUr:{
    backgroundColor: 'red',
    width: 40,
    height:40,
    justifyContent: 'center'
  },
  ActionIconLik:{
    fontSize: theme.ICON_SIZE_MEDIUM,
    color: theme.PRIMARY_COLOR
  },
  ActionIconUr:{
    fontSize: theme.ICON_SIZE_MEDIUM,
    color: 'white'
  },
});