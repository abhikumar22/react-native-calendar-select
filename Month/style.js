import {
  StyleSheet,
  Dimensions
} from 'react-native';
const {scale, width} = Dimensions.get('window');

export default StyleSheet.create({
  month: {
    paddingTop: 15,
    paddingBottom: 10
  },
  monthTitle: {
    paddingHorizontal: 20,
    alignSelf:'center',
  },
  monthTitleText: {
    fontSize: 15,
    lineHeight: 24,
    // color:'rgb(110, 5, 64)'
  },
  dayRow: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 5
  }
});
