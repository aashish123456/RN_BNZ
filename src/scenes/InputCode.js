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
    ImageBackground

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
const Price = require('../themes/Images/price.png');
const check_icon = require('../themes/Images/check.png')
const uncheck_icon = require('../themes/Images/uncheck.png')
const email_icon = require('../themes/Images/email.png')
const ScanCode = require('../themes/Images/scan_ccode.png')
const InputCode1 = require('../themes/Images/input_digit_code.png')
const ReferFriend = require('../themes/Images/refer_friend.png')

var _that;
export default class InputCode extends Component {
  constructor() {
      super();
      _that = this;
    }

render(){
    return(
          <View style={{flex:1}}>
            <ImageBackground source={require('../themes/Images/login_bg.png')} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
                <View style={ {paddingLeft: AppColors.paddingLeft20,paddingRight: AppColors.paddingRight20,backgroundColor:'transparent' ,flexDirection:'column',flex:1 ,marginTop : 70 , justifyContent : 'center' ,alignSelf : 'center',width: AppSizes.screen.width-50}}>
                                 <Text style={{color:'white' ,fontSize : 25 , marginTop : 0,fontWeight: 'bold'}}>
                                    Enter the player digit code to get the card
                                 </Text>
                                 <View style={AppStyles.Input_iconcnt}>
                                     <View style={AppStyles.Inputtxt}>
                                         <TextInput
                                             returnKeyType={"done"}
                                             autoCorrect={false}
                                             selectionColor={"#fff"}
                                             placeholderTextColor={AppColors.white}
                                             underlineColorAndroid="transparent"
                                             placeholder=""
                                             style={AppStyles.InputCnt_txt}
                                             ref="password"
                                             onSubmitEditing={Keyboard.dismiss}
                                             //onChangeText={_password => this.setState({ _password })}
                                             //value={_password}
                                             maxLength ={10}
                                         />
                                     </View>
                                 </View>

                                 <LoginButton text={"Submit"} style={[AppStyles.green_round_button , {marginTop : 50}]}  />
                                 <Image source={require('../themes/Images/logo_bt.png')} style={{width:270,height:60,resizeMode:'contain',marginTop:30,marginBottom:50,alignItems:'center',alignSelf:'center'}} />


                </View>
            </ImageBackground>
          </View>

    )
  }
}
