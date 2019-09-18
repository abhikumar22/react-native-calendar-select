import {
  StyleSheet,
  Dimensions
} from 'react-native';
const { scale, width } = Dimensions.get('window');
const Font_Family = 'CenturyGothic';
let iconSize = 22;
let resultFontSize = 24;
let weekTextFontSize = 13;
let slashLength = 80;
if (width < 350) {
  resultFontSize = 20;
  weekTextFontSize = 14;
  iconSize = 20;
  slashLength = 70;
}

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  ctrl: {
    flex: 1.5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 15
  },
  result: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'rgb(225, 225, 225)'
  },
  resultSlash: {
    width: slashLength,
    height: 1 / scale,
    transform: [
      {
        rotateZ: '-45deg'
      }
    ]
  },
  resultPart: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  resultPart2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  resultText: {
    fontSize: resultFontSize,
    marginVertical: 4,
    fontWeight: '200',
    fontFamily:Font_Family
  },
  clearText: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily:Font_Family
  },
  startText: {
    fontSize: 12,
    textAlign: 'left',
    fontFamily:Font_Family
  },
  endText: {
    fontSize: 12,
    textAlign: 'right',
    fontFamily:Font_Family
  },
  dateFontSize: {
    fontSize: 16,
  },
  week: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  weekText: {
    flex: 1,
    fontSize: weekTextFontSize,
    fontFamily:Font_Family,
    textAlign: 'center'
  },
  scroll: {
    flex: 9,
    borderTopWidth: 1,
    borderBottomWidth:1
  },
  scrollArea: {
    flex: 1
  },
  btn: {
    // flex: 1.5,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  confirmContainer: {
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    backgroundColor: 'red',
    width: '100%',
    flex: 1,
    paddingVertical:10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'

  },
  confirmContainerDisabled: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(208, 208, 208, 0.90)',
    paddingVertical:10,
  },
  confirmText: {
    fontSize: 15,
    letterSpacing: 1,
    textAlign: 'center',
    // color: 'rgb(173, 173, 173)',
    fontFamily:Font_Family
  },
  confirmTextDisabled: {
     color: 'white',
    fontFamily:Font_Family
  },
  closeIcon: {
    width: iconSize,
    height: iconSize
  }
});
