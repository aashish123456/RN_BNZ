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
    DeviceEventEmitter,


} from 'react-native';
import CheckBox from 'react-native-check-box'
import Spinner from 'react-native-loading-spinner-overlay';
import {NavigationActions} from 'react-navigation';
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
const PlayerBg = require('../themes/Images/player_bg.png');

import * as commonFunctions from '../utils/CommonFunctions'
var Constant = require('../api/WebInteractor').Constant;
var WebServices = require('../api/WebInteractor').WebServices;
import Confetti from 'react-native-confetti';

var _that;

export default class congratulation extends Component {

  constructor(props){
    super(props)
      this.state = {
        _data: this.props.navigation.state.params.data,
      };
      _that = this;

  }
  componentDidMount() {
    if(this._confettiView) {
       this._confettiView.startConfetti();
    }



  }


  componentWillUnmount ()
  {
      if (this._confettiView)
      {
          this._confettiView.stopConfetti();
      }

      DeviceEventEmitter.emit('refreshData');

  }


  render(){
    return(
      <View style={styles.container}>


      <ImageBackground source={require('../themes/Images/login_bg.png')} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
      <ScrollView >


       <View style={[AppStyles.login_logo_cnt ], {marginTop : 70 , justifyContent : 'center' , alignSelf : 'center'}}>

           <Image source={PlayerBg} style={AppStyles.player_bg} />
           <Image source={{uri: this.state._data.image}} style={{position: 'absolute',top: 40,left:85,width: AppSizes.screen.width-165,height: 260,}} />

       </View>

       <Text style={{color : 'white' ,fontSize: 20,fontWeight: 'bold', justifyContent : 'center' , alignSelf : 'center'}}>{this.state._data.name}</Text>
       <Text style={{color : 'white' ,fontSize: 20,fontWeight: 'bold', justifyContent : 'center' , alignSelf : 'center' , marginTop : 15}}>You have got a new Player Card..!!!</Text>
       <LoginButton text={"Go to Home"} onPress={() => this.onGridPress()} style={AppStyles.green_round_button} />

       <Confetti ref={(node) => this._confettiView = node}/>

      </ScrollView >
      </ImageBackground>
      </View>
    )
  }
  onGridPress = () => {
    //_that.props.navigation.navigate('MyCard')
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
  });
    this.props.navigation.dispatch(resetAction);
  }



}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },

  buttonTouchable: {
    padding: 16,
  },
});
