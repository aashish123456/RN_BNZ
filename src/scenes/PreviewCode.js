import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ScrollView,
    Dimensions,
    TextInput,
    DatePickerIOS,
    TouchableOpacity,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    NetInfo,
    Platform,
    AsyncStorage,
    ImageBackground,
    NavigatorIOS,
    Linking,

} from 'react-native';
import CheckBox from 'react-native-check-box'
import Spinner from 'react-native-loading-spinner-overlay';
import { AppStyles, AppSizes, AppColors } from '../themes/'
import Buttons, { LoginButton, Button2 } from "../components/Buttons";
import SignUp from './SignUp';
import SplashScreen from 'react-native-splash-screen'
const FBSDK = require('react-native-fbsdk');
const EmailIdImage = require('../themes/Images/email.png');
const password_icon = require('../themes/Images/password.png');
const Logo = require('../themes/Images/login_logo.png');
const check_icon = require('../themes/Images/check.png')
const uncheck_icon = require('../themes/Images/uncheck.png')
const email_icon = require('../themes/Images/email.png')

import * as commonFunctions from '../utils/CommonFunctions'



var _that;

export default class PreviewCode extends Component <{}> {
  constructor(props) {
      super(props)
      this.state = {
           _playerData: this.props.navigation.state.params.data
         };

  }


  render(){
    return(
      <View style={{flex:1 , flexDirection:'column'}}>
        <ImageBackground source={require('../themes/Images/login_bg.png')} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
          <ScrollView >
            <Image source={{uri: this.state._playerData.card.qr_code}} style={{justifyContent:'center',alignSelf:'center',marginTop : 70 , width : 200 , height : 200}} />
          </ScrollView >
        </ImageBackground>
      </View>


    )
  }


}
