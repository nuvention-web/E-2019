import { StyleSheet } from 'react-native';
import theme from './theme.style.js';

export default StyleSheet.create({
    text: {
        fontFamily: theme.FONT_FAMILY
    },
    Icon:{
        color: theme.PRIMARY_COLOR,
        fontSize: theme.FONT_SIZE_LARGE
    }
  });