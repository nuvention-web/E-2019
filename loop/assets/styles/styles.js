import { StyleSheet } from 'react-native';
import theme from './theme.style.js';

export default StyleSheet.create({
    text: {
        fontFamily: theme.FONT_FAMILY
    },
    Icon:{
        color: theme.PRIMARY_COLOR,
        fontSize: theme.ICON_SIZE_LARGE
    },
    ActionIcon:{
        color: theme.PRIMARY_COLOR,
        fontSize: theme.ICON_SIZE_MEDIUM
    },
    BottomIcon:{
        color: theme.PRIMARY_COLOR,
        fontSize: theme.ICON_SIZE_LARGER
    }
  });