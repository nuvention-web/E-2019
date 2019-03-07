import { StyleSheet,Dimensions } from 'react-native';
import theme from './theme.style.js';
const devicesWidth = Dimensions.get("window").width;

export default styles = StyleSheet.create({
  content: {
    marginBottom: 45
  },
  precontent: {
    marginBottom: 40
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
  card: {
    elevation: 3,
    marginTop: 10
  },
  messages:{
    display: 'flex',
    flexDirection: 'row',
    width:devicesWidth,
    justifyContent: 'space-between'
  },
  reverseMessages:{
    display: 'flex',
    flexDirection: 'row-reverse',
    width:devicesWidth,
    justifyContent: 'space-between'
  },
  usrRight:{
    display: 'flex', 
    flexDirection:'row',
  },
  usrTitle:{
    marginRight:12
  },
  userText:{
    fontFamily: theme.FONT_FAMILY, 
    textAlign: 'right'
  },
  Iconbtn:{
    marginRight: 10,
    display: 'flex',
    flexDirection: 'column',
    // flex:1,
  },
  reverseIconbtn:{
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    // flex:1,
  },
  Icontext:{
    fontSize: theme.FONT_SIZE_SMALL,
    color: 'black'
  },
  actionbtn:{
    width:40
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