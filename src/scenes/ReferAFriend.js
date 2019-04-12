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
    Clipboard,
    ToastAndroid,
    AlertIOS,
    Share,


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
const referCode = require('../themes/Images/refer_code.png')

var _that;
export default class ReferAFriend extends Component {
  constructor() {
      super();
      this.state = {
        _referCode:'',
        _openSheet:false,
      };
      _that = this;
    }

    componentDidMount() {
        AsyncStorage.getItem('userModel')
            .then((res) => {
                if (res) {
                    var dataRes = JSON.parse(res)
                    this.setState({ _referCode : dataRes.referCode})
                    let data = new FormData();
                    data.append('user_id', dataRes.UserID);
                    data.append('card_id', result.data.id);
                    this.PostToApiCalling("POST", "send_user_card", Constant.URL_send_user_card, data);
                }
            });

    }
    onOpen() {
    console.log("OPEN")
          Share.share({
          message: 'Hey, I have been using BNZ Crusaders - checkout this awesome app to know more about rugby team and get player cards Sign Up today using my code (' + this.state._referCode + ') and get new cards to make your own collection..!!! Get the app from here -' + 'https://crusaders.co.nz/',
          url: '',
          title: 'BNZ Crusaders'
        }, {

        })
  }

render(){

    return(
          <View style={{flex:1}}>
            <ImageBackground source={require('../themes/Images/login_bg.png')} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
              <ScrollView style ={{marginTop : 60}}>
                <View style={ {paddingLeft: AppColors.paddingLeft20,paddingRight: AppColors.paddingRight20,backgroundColor:'transparent' ,flexDirection:'column',flex:1  , justifyContent : 'center' ,alignSelf : 'center',width: AppSizes.screen.width-50}}>
                                 <Text style={{color:'white' ,fontSize : 27 , marginTop : 0,fontWeight: 'bold'}}>
                                    Invite your Friends to get more cards
                                 </Text>
                                 <View style={{justifyContent: 'center',alignItems: 'center', marginTop : 50}}>
                                   <Image source={referCode}  />
                                    <View style ={{position : 'absolute' ,flex :1 , flexDirection : 'column' , justifyContent : 'center' ,alignItems : 'center'}}>
                                       <Text style ={{fontSize : 30 ,color : 'white',fontWeight: 'bold'}}>
                                         {this.state._referCode}
                                       </Text>

                                   </View>
                                 </View>

                                 <Text style ={{fontSize : 15 ,color : 'white',marginTop : 50}}>
                                  Share referral code with your friends and get a new card for each friend who registers on the app using this code
                                </Text>

                                 <LoginButton text={"Share"} style={[AppStyles.green_round_button , {marginTop : 50}]}  onPress={() => this.onOpen()}/>
                                 <Image source={require('../themes/Images/logo_bt.png')} style={{width:270,height:60,resizeMode:'contain',marginTop:30,marginBottom:50,alignItems:'center',alignSelf:'center'}} />


                </View>
                </ScrollView >
            </ImageBackground>
          </View>

    )
  }
}
