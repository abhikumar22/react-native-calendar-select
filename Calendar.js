/**
 * Created by TinySymphony on 2017-05-08.
 */

import React, { Component, } from 'react';
import { BackHandler, Platform } from 'react-native';

import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';


import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import Moment from 'moment';
import styles from './CalendarStyle';
import MonthList from './MonthList';
const Font_Family = 'CenturyGothic';
const ICON = {
  close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADGklEQVR4Xu3b3XXTMBTAcV1Leu8I3YAyAWECygSlE9BOQJmAdAK6QWGCphNQNmAE+mzZl6Mc5xzXtiLJ1r0STfLqJM3/Z9muPwTiwF9w4P3iCHAcAQ4BRDxt2/aDEOKkqqqfAPD0P2EZYy6EEJ/sbwaATVVVtwDwd9gwuQkYY+wHv9n43QcQca21vi4dARFPmqa5F0Ks+r8VEZ+UUu+HCCMAu+abpvnVj+990Z1S6rJUBBtvjHkAgLOp34iIX7XWN/1lI4Cmaa4Q0a5916tIBF+8jUHER631i5ExAqjr+gYAvnjWclEIIfHBAIh41m0CvpFeBEJofBdzqZS627sJ2IV1Xa8B4LNPQAiRFSEmfmr4b48QrkhjjJWyhxLfKwtCZPxvpdQq+DC4Ky4VIVX83hFQKkLK+CAA+6ZSRkLq+GCAEhAo4qMAciJQxUcD5ECgjJ8FwIlAHT8bgAOBI34RACUCV/xiAAoEzvgkACkRuOOTAaRAyBGfFGAJQq745ABzEHLGkwDEItgLMK5reP3zcER0ntL6ztf3LSe7MRJxAuX9/VTxZCNgxqm0E4EynhwgcnMYIVDHswDMReCIZwOIReCKZwOIOdR12wHbhVayo8Bug54Rv/soCwIpwIJ4NgQygATxLAgkAAnjyRGSA8TE27199+BFtjtQSQFi43e3qyL+bU6+Y0wGMDd+xr/NSRGSACyNz4mwGCBVfC6ERQCp43MgzAagiudGmAVAHc+JEA3AFc+FEAXAHc+BEAyQK54aIQggdzwlgheglHgqhL0ApcVTIDgBSo1PjTAJUHp8SgTXfIGH4fP2U3cuOK/euu6chJ5KI+Kt1vpq+D0jgG6yxHfnrZpuQQnxsSNBSvl2OPNl6nH5DQC82wdQUnwMAgBcSynX/bZogBLjIxA+KqV++ACcEyZKjg9AeJZSnobMGbLzbuxm8KYvZZ+3V0qdTz1y7ttfcC+fmO/wjIjnWuuNdydo39AdBu0eczu/BgDsdbgXMy24o2L/nn3wom3bFSL+kVLaFTqaMrdti/3i1/b+I8BrW6OxPQc/Av4BDSZYbnPWwJkAAAAASUVORK5CYII='
};
export default class Calendar extends Component {
  static propTypes = {
    i18n: PropTypes.string,
    format: PropTypes.string,
    customI18n: PropTypes.object,
    color: PropTypes.object,
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  }
  static defaultProps = {
    format: 'YYYY-MM-DD',
    i18n: 'en',
    customI18n: {},
    color: {}
  }
  static I18N_MAP = {
    'zh': {
      'w': ['', '一', '二', '三', '四', '五', '六', '日'],
      'weekday': ['', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      'text': {
        'start': '开 始',
        'end': '结 束',
        'date': '日 期',
        'save': '保 存',
        'clear': '清除'
      },
      'date': 'M月D日'
    },
    'en': {
      'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'text': {
        'start': 'Start',
        'end': 'End',
        'date': 'Date',
        'save': 'Save',
        'clear': 'Reset'
      },
      'date': 'DD / MM'
    },
    'jp': {
      'w': ['', '月', '火', '水', '木', '金', '土', '日'],
      'weekday': ['', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'],
      'text': {
        'start': 'スタート',
        'end': 'エンド',
        'date': '時　間',
        'save': '確　認',
        'clear': 'クリア'
      },
      'date': 'M月D日'
    }
  }

  constructor(props) {
    console.warn("**calender**")
    super(props);
    this.state = {
      isModalVisible: false,
    };
    this._today = Moment();
    this._year = this._today.year();
    this._i18n = this._i18n.bind(this);
    this._getDateRange = this._getDateRange.bind(this);
    this._onChoose = this._onChoose.bind(this);
    this._resetCalendar = this._resetCalendar.bind(this);
    this.close = this.close.bind(this);
    this.cancel = this.cancel.bind(this);
    this.open = this.open.bind(this);
    this.clear = this.clear.bind(this);
    this.confirm = this.confirm.bind(this);
    this._getDateRange();



    const {
      primaryColor, secondaryColor, todayColor
    } = this.props;

    this.primaryColor = primaryColor
    this.secondaryColor = secondaryColor
    this.todayColor = todayColor

    if (this.primaryColor === undefined) {
      this.primaryColor = '#03b8c1'
    }
    if (this.secondaryColor === undefined) {
      this.secondaryColor = '#c6fcff'
    }
    if (this.todayColor === undefined) {
      this.todayColor = '#c9edef'
    }

    // console.warn("fontName",fontName)



    // if (this.primaryColor === undefined && this.secondaryColor === undefined && this.todayColor === undefined) {
    //   this.primaryColor = '#03b8c1'
    //   this.secondaryColor = '#c6fcff'
    //   this.todayColor = '#c9edef'
    //   console.warn("*primaryColor", primaryColor)
    //   console.warn("*secondaryColor", secondaryColor)
    //   console.warn("*todayColor", todayColor)
    // } else {
    //   console.warn("primaryColor", primaryColor)
    //   console.warn("secondaryColor", secondaryColor)
    //   console.warn("todayColor", todayColor)
    // }



  }
  componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this._resetCalendar();
  }

  componentWillUnmount() {

  }


  _i18n(data, type) {
    const {
      i18n,
      customI18n
    } = this.props;
    if (~['w', 'weekday', 'text'].indexOf(type)) {
      return (customI18n[type] || {})[data] || Calendar.I18N_MAP[i18n][type][data];
    }
    if (type === 'date') {
      return data.format(customI18n[type] || Calendar.I18N_MAP[i18n][type]);
    }
  }
  _resetCalendar() {
    const {
      startDate,
      endDate,
      format,
      type,
    } = this.props;
    let start = Moment(startDate, format);
    let end = Moment(endDate, format);
    console.warn("start**", start)
    console.warn("end**", end)
    console.warn("type", type)

    let isStartValid = start.isValid() && start >= this._minDate && start <= this._maxDate;
    let isEndValid = end.isValid() && end >= this._minDate && end <= this._maxDate;
    this.setState({
      type: type,
      startDate: isStartValid ? start : null,
      startDateText: isStartValid ? this._i18n(start, 'date') : '',
      startWeekdayText: isStartValid ? this._i18n(start.isoWeekday(), 'weekday') : '',
      endDate: isEndValid ? end : null,
      endDateText: isEndValid ? this._i18n(end, 'date') : '',
      endWeekdayText: isEndValid ? this._i18n(end.isoWeekday(), 'weekday') : ''
    });
  }
  _getDateRange() {
    const {
      maxDate,
      minDate,
      format
    } = this.props;
    let max = Moment(maxDate, format);
    let min = Moment(minDate, format);
    let maxValid = max.isValid();
    let minValid = min.isValid();
    if (!maxValid && !minValid) {
      max = Moment().add(3, 'months');
      min = Moment();
    }
    if (!maxValid && minValid) {
      max = min.add(3, 'months');
    }
    if (maxValid && !minValid) {
      min = max.subtract(3, 'months');
    }
    if (min.isSameOrAfter(max)) return {};
    this._minDate = min;
    this._maxDate = max;
  }
  _onChoose(day) {
    const {
      startDate,
      endDate
    } = this.state;
    if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
      this.setState({
        startDate: day,
        endDate: null,
        startDateText: this._i18n(day, 'date'),
        startWeekdayText: this._i18n(day.isoWeekday(), 'weekday'),
        endDateText: '',
        endWeekdayText: '',
      });
    } else if (startDate && !endDate && day > startDate) {
      this.setState({
        endDate: day,
        endDateText: this._i18n(day, 'date'),
        endWeekdayText: this._i18n(day.isoWeekday(), 'weekday')
      });
    }
  }
  cancel() {
    this.close();
    this._resetCalendar();
  }
  close() {
    this.setState({
      isModalVisible: false
    });
    this._resetCalendar()
  }
  open() {
    this._resetCalendar()
    this.setState({
      isModalVisible: true
    });

  }
  clear() {
    this.setState({
      startDate: null,
      endDate: null,
      startDateText: '',
      startWeekdayText: '',
      endDateText: '',
      endWeekdayText: ''
    });
  }
  confirm() {
    const {
      startDate,
      endDate
    } = this.state;
    let startMoment = startDate ? startDate.clone() : null;
    let endMoment = endDate ? endDate.clone() : null;
    this.props.onConfirm && this.props.onConfirm({
      startDate: startMoment ? startMoment.toDate() : null,
      endDate: endMoment ? endMoment.toDate() : null,
      startMoment,
      endMoment
    });
      this.close();



  }
  render() {
    const {
      startDate,
      endDate,
      startDateText,
      startWeekdayText,
      endDateText,
      endWeekdayText
    } = this.state;
    const {
      mainColor = this.primaryColor, //background color
      subColor = this.secondaryColor,
      borderColor = this.primaryColor,
      todayColor = this.todayColor,
    } = this.props.color;
    let color = { mainColor, subColor, borderColor, todayColor };

    // const {
    //   mainColor1 = 'blue', //background color
    //   subColor1 = 'green',
    //   borderColor1 = 'red'
    // } = this.props.color;
    // let color = { mainColor1, subColor1, borderColor1 };




    let mainBack = { backgroundColor: mainColor };
    let subBack = { backgroundColor: subColor };
    let mainFontColor = { color: mainColor };
    // let subFontColor = { color: 'black' };
    let monthColor = { color: this.primaryColor };
    let continueColorActive = { color: 'white' }
    let continueColorDisabled = { color: 'rgb(173, 173, 173)' }
    let isValid = !startDate || endDate;
    let isClearVisible = startDate || endDate;
    return (
      <Modal
        animationType={'slide'}
        visible={this.state.isModalVisible}
        onRequestClose={this.close}>


        <View style={styles.container}>
          <View style={{ backgroundColor: this.primaryColor, width: '100%', marginBottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15 }}>

            <TouchableOpacity
              style={{ position: 'absolute', left: 5, padding: 15 }}
              onPress={() => {
                console.warn("back pressed")
                this.close();
              }}
            >
              <Text style={ {color: 'white' }}> {this._i18n('Cancel', 'text')}</Text>
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center', fontSize: 20, color: 'white', }}>{this._i18n('statusBar', 'text')}</Text>
            <TouchableOpacity
              style={{ position: 'absolute', right: 10, padding: 10 }}
              onPress={() => {
                console.warn("Reset Pressed")
                // this.close()
                this._resetCalendar()
              }}
            >

              <Text
                style={{ color: 'white' }}>
                {this._i18n('clear', 'text')}
              </Text>
            </TouchableOpacity>

          </View>

          {/* <View style={[styles.container, mainBack]}> */}

          <View style={styles.result}>
            <View style={styles.resultPart}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={require('../../app/assets/calender_icon.png')}
                  style={{ alignSelf: 'center' }}
                />
                <Text style={{ marginLeft: 4, fontFamily: Font_Family, color: 'rgb(35, 35, 35)', fontSize: 10 }}>
                  {this._i18n('start', 'text')}
                </Text>
              </View>

              <Text style={{ marginLeft: 4, fontFamily: Font_Family, color: this.state.startDate === null ? 'rgb(146, 146, 146)' : this.primaryColor, fontSize: this.state.startDate === null ? 10 : 14 }}>
                {startDateText || this._i18n('date', 'text')}
              </Text>
            </View>
            {/* <View style={[styles.resultSlash, subBack]}/> */}
            <View style={styles.resultPart2}>

              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={require('../../app/assets/calender_icon.png')}
                  style={{ alignSelf: 'center' }}
                />
                <Text style={{ marginLeft: 4, fontFamily: Font_Family, color: 'rgb(35, 35, 35)', fontSize: 10, }}>
                  {this._i18n('end', 'text')}
                </Text>
              </View>


              <Text style={{ marginLeft: 4, fontFamily: Font_Family, color: this.state.endDate === null ? 'rgb(146, 146, 146)' : this.primaryColor, fontSize: this.state.endDate === null ? 10 : 14 }}>
                {endDateText || this._i18n('date', 'text')}
              </Text>
            </View>
          </View>
          <View style={{ width: '100%', height: 1, backgroundColor: this.primaryColor }}></View>
          <View style={styles.week}>
            {[7, 1, 2, 3, 4, 5, 6].map(item =>
              <Text style={[styles.weekText, monthColor]} key={item}>{this._i18n(item, 'w')}</Text>
            )}
          </View>

          <View style={[styles.scroll, { borderColor }]}>
            <MonthList
              today={this._today}
              minDate={this._minDate}
              maxDate={this._maxDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChoose={this._onChoose}
              i18n={this.props.i18n}
              color={color}
            />
          </View>
          <View style={[styles.btn]}>
            {startDateText && endDateText ?
              <TouchableHighlight
                underlayColor="rgba(255, 255, 255, 0.45)"
                style={[styles.confirmContainer, { backgroundColor: this.primaryColor, marginBottom: Platform.OS === 'ios' && DeviceInfo.hasNotch() ? 20 : 0 }]}
                onPress={() => {
                  // this.confirm()
                  // this.props.navigation.navigate('HotelListScreen')
                  // console.warn("continue pressed")
                  this.confirm()
                  // this.props.navigation.navigate('HotelListScreen')
                  // this.close()
                }

                }>
                {/* onPress={this.confirm}> */}

                <View style={{ flexDirection: 'row' }} >
                  <Text
                    ellipsisMode="tail" numberOfLines={1}
                    style={[styles.confirmText, continueColorActive]}>
                    {this._i18n('save', 'text')}
                  </Text>
                  <Image
                    style={{ marginLeft: 10, alignSelf: 'center' }}
                    source={require('../../app/assets/continueActive.png')}
                  />
                </View>
              </TouchableHighlight> :
              <View style={[styles.confirmContainer, styles.confirmContainerDisabled, { marginBottom: Platform.OS === 'ios' && DeviceInfo.hasNotch() ? 20 : 0 }]}>
                <View style={{ flexDirection: 'row' }} >
                  <Text
                    ellipsisMode="tail" numberOfLines={1}
                    style={[styles.confirmText, , continueColorDisabled]}
                  >
                    {this._i18n('save', 'text')}
                  </Text>
                  <Image
                    style={{ marginLeft: 10, alignSelf: 'center' }}
                    source={require('../../app/assets/continueDeactivated.png')}
                  />

                </View>
              </View>
            }
          </View>
        </View>
      </Modal>
    );
  }
}
