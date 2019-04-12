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
import {NavigationActions} from 'react-navigation';

import { AppStyles, AppSizes, AppColors } from '../themes/'
import Buttons, { LoginButton, Button2 } from "../components/Buttons";
import Notification from './Notification';

const FBSDK = require('react-native-fbsdk');
const EmailIdImage = require('../themes/Images/email.png');
const password_icon = require('../themes/Images/password.png');
const Logo = require('../themes/Images/logo_bt.png');
const check_icon = require('../themes/Images/check.png')
const uncheck_icon = require('../themes/Images/uncheck.png')
const email_icon = require('../themes/Images/email.png')

import * as commonFunctions from '../utils/CommonFunctions'
var Constant = require('../api/WebInteractor').Constant;
var WebServices = require('../api/WebInteractor').WebServices;
var _that;
const {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager
} = FBSDK;
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _email: '',
            _password: '',
            _visible: false,
            _isRemember: false,
        },
            _that = this
    }
    _showModalLoadingSpinnerOverLay = () => {
        this._modalLoadingSpinnerOverLay.show()
        //simulate http request
        this.setTimeout(() => {
            this._modalLoadingSpinnerOverLay.hide()
        }, 3000)
    }
    componentDidMount() {
        
    }
    fetchFacbookInfo = () => {
      //alert("string fb")
        LoginManager.logOut()
        const infoRequest = new GraphRequest('/me', {
            httpMethod: 'GET',
            version: 'v2.5',
            parameters: {
                'fields': {
                    'string': 'email,name,friends'
                }
            }
        }, this.responseInfoCallback, );

        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function (result) {
                console.log("result from fb is "+JSON.stringify(result))
                if (result.isCancelled) {
                } else {
                    new GraphRequestManager().addRequest(infoRequest).start();
                }
            },
            function (error) {
            }
        );
    }
    responseInfoCallback(error: ?Object, result: ?Object) {

        if (error) {
        } else {
            AsyncStorage.getItem("token").then((token)=>{
                let data = new FormData();
                data.append('fbid', result.id);
                //data.append('email', result.email);
                data.append('name', result.name);
                data.append("deviceToken",token);
                console.log("body"+JSON.stringify(data))
                //Alert.alert('fbid......?' + result.id + result.email + result.name)
                _that.PostToApiCalling('POST', 'registration', Constant.URL_RegisterUser, data);
            })
        }
    }
    render() {
        const { _email, _password, _isRemember, _visible } = this.state
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{flex:1 }}>
              <ScrollView >
              <ImageBackground source={require('../themes/Images/login_bg.png')} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height }} >

              <View style = {{flex:1,}} >

                <View style={ { justifyContent: 'space-between', paddingLeft: AppColors.paddingLeft20,
                   paddingRight: AppColors.paddingRight20,backgroundColor:'transparent' ,flexDirection:'column',flex:1}}>

                      <View style={AppStyles.login_logo_cnt}>
                        <Image source={Logo} style={[{width:270,height:80,resizeMode:'contain'}, {marginTop : (Platform.OS=="android")?30:40}]} />
                      </View>

                    <View style={AppStyles.Input_iconcnt}>

                          <View style={AppStyles.Inputtxt}>
                            <Text style={AppStyles.InputCnt_icon}>Email address</Text>
                                <TextInput
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    returnKeyType={"next"}
                                    selectionColor={"#fff"}
                                    keyboardType={'email-address'}
                                    autoFocus={false}
                                    placeholder=""
                                    placeholderTextColor={AppColors.lightGray_text}
                                    style={AppStyles.InputCnt_txt}
                                    ref="emailid"
                                    onChangeText={_email => this.setState({ _email })}
                                    value={_email}
                                />
                        </View>
                    </View>
                    <View style={AppStyles.Input_iconcnt}>

                        <View style={AppStyles.Inputtxt}>
                            <Text style={AppStyles.InputCnt_icon}>Password</Text>
                            <TextInput
                                returnKeyType={"done"}
                                autoCorrect={false}
                                selectionColor={"#fff"}
                                placeholderTextColor={AppColors.white}
                                underlineColorAndroid="transparent"
                                placeholder=""
                                style={AppStyles.InputCnt_txt}
                                secureTextEntry
                                ref="password"
                                onSubmitEditing={Keyboard.dismiss}
                                onChangeText={_password => this.setState({ _password })}
                                value={_password}
                                maxLength ={10}
                            />
                        </View>
                    </View>

                        <TouchableOpacity activeOpacity={.8} onPress={() => _that.props.navigation.navigate('ForgotPassword')} >
                            <Text style={{alignItems:'flex-end',alignSelf:'flex-end',justifyContent:'flex-end',color:'red',marginTop:10}} >Forgot Password ?</Text>
                        </TouchableOpacity>

                    <LoginButton text={"Login"} onPress={this.Login} style={AppStyles.green_round_button} />
                    <View>
                    <View style = {{justifyContent:'space-around',flexDirection:'column',alignItems:'center',paddingTop:20}}>
                      <Image source={require('../themes/Images/or.png')}  style={{ width: 270, height: 10, top: 0, left: 0 }} />
                    <View style={{justifyContent:'center',flexDirection:'row',marginTop:20}}>

                                   <Text style={{color:'white'}}>
                                     Dont have an account ?
                                   </Text>

                                    <TouchableOpacity activeOpacity={.8} onPress={() => _that.props.navigation.navigate('SignUp')} >
                                       <Text style={{color:'red' , marginLeft : 5}}>
                                          Sign Up
                                       </Text>
                                   </TouchableOpacity>

                          </View>
                          <TouchableOpacity activeOpacity={.8} onPress={() => this.fetchFacbookInfo()} >
                             <Image source={require('../themes/Images/fb_login.png')} style={{width:270,height:60,resizeMode:'contain',marginTop:10,alignItems:'center',alignSelf:'center'}} />
                          </TouchableOpacity>
                          <Image source={require('../themes/Images/logo_bt.png')} style={{width:270,height:60,resizeMode:'contain',marginTop:10,marginBottom:50,alignItems:'center',alignSelf:'center'}} />

                        
                     </View>

                       <Notification/>             

                </View>
                    <Spinner visible={_visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />

                </View>
                </View>
                </ImageBackground>
                </ScrollView>
                </View>
                </TouchableWithoutFeedback>
        )
    }

    /**
     * LogIn click functionality
     */

    Login = () => {

        //_that.props.navigation.navigate('Home')

        const { _email, _password, _visible } = this.state

        // Loader show
        this.setState({ _visible: true })


         //  Form  Validations
         if (_email.length <= 0) {
             this.setState({ _visible: false })
             commonFunctions.message('Please enter email address.');
         }else if (!commonFunctions.validateEmail(_email)) {
            this.setState({ _visible: false })
            commonFunctions.message('Please enter a valid email address.');
        } else if ((_password.indexOf(' ') >= 0 || _password.length <= 0)) {
            this.setState({ _visible: false })
            commonFunctions.message('Please enter a password.');
        } else {
            AsyncStorage.getItem("token").then((token)=>{
                let data = new FormData();
                data.append('email', _email);
                data.append('pass', _password);
                data.append("deviceToken",token);
                console.log("body: "+JSON.stringify(data));
                this.PostToApiCalling("POST", "login", Constant.URL_login, data);
            })
          
        }
    }

    /**
     * onClick
     */

    onClick = (bool) => {
        //alert(bool)
    }


    /**
     * API Calling
     */


    PostToApiCalling(method, apiKey, apiUrl, data) {
        new Promise(function (resolve, reject) {
            if (method == 'POST') {
                resolve(WebServices.callWebService(apiUrl, data));
            } else {
                resolve(WebServices.callWebService_GET(apiUrl, data));
            }
        }).then((jsonRes) => {

          console.log("json response---- "+JSON.stringify(jsonRes))

          if(jsonRes && jsonRes.message.status == 500){
            _that.setState({_visible:false},()=>{
              setTimeout(()=>{
                commonFunctions.logoutFromSession(_that)
              },300)           
            })          
          }else{
            if ((!jsonRes) || (jsonRes.response != 1)) {
              console.log(jsonRes)
  
              setTimeout(() => {
                  Alert.alert(
                      jsonRes.message.message,
                      "",
                      [
                          { text: 'OK' },
                      ],
                      { cancelable: false }
                  )
              }, 1000);
  
              _that.setState({ _visible: false })
  
          } else {
              if (jsonRes.response == '1') {
                  console.log(JSON.stringify(jsonRes))
  
                  _that.apiSuccessfullResponse(apiKey, jsonRes)
              }
          }
         }
        }).catch((error) => {
            console.log("ERROR" + error);
        });
    }



    apiSuccessfullResponse(apiKey, jsonRes) {
        const { _email, _password, _isRemember } = this.state
        if (apiKey == 'login') {
          if (jsonRes.response == '1')
          {
            /*
              setTimeout(() => {
                  Alert.alert(
                      "",
                      "",
                      [
                          { text: 'OK' },
                      ],
                      { cancelable: false }
                  )
              }, 1000);*/

                var data = {
                    "UserID": jsonRes.message.id,
                    "email": jsonRes.message.email,
                    "group": jsonRes.message.group,
                    "name": jsonRes.message.name,
                    "referCode" : jsonRes.message.referCode,
                    "userName" : jsonRes.message.username,
                    "XAPIKEY" : jsonRes.message.XAPIKEY,
                }
                AsyncStorage.setItem("userModel", JSON.stringify(data))
                this.setState({ _email: "" })
                this.setState({ _password: "" })
                const resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Home' })],
              });
                this.props.navigation.dispatch(resetAction);
  
                this.setState({ _visible: false })
              
          } else {
            this.setState({ _visible: false })
          }
        }else{


              if (jsonRes.response == 1)
              {



                  var data = {
                      "UserID": jsonRes.message.id,
                      "email": jsonRes.message.email,
                      "group": jsonRes.message.group,
                      "name": jsonRes.message.name,
                      "referCode" : jsonRes.message.referCode,
                      "userName" : jsonRes.message.username,
                      "XAPIKEY" : jsonRes.message.XAPIKEY,
                  }

                  AsyncStorage.setItem("userModel", JSON.stringify(data))
                  const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                });
                  this.props.navigation.dispatch(resetAction);

              } else {
                this.setState({ _visible: false })
              }
          }

    }






}




export default Login
