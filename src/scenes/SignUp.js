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
const EmailIdImage = require('../themes/Images/user.png');
const password_icon = require('../themes/Images/password.png');
const Logo = require('../themes/Images/logo_bt.png');
const FBSDK = require('react-native-fbsdk');
import * as commonFunctions from '../utils/CommonFunctions'
var Constant = require('../api/WebInteractor').Constant;
var WebServices = require('../api/WebInteractor').WebServices;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

var _that;
const {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager
} = FBSDK;
class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _userName :'',
            _email: '',
            _password: '',
            _confirmPassword: '',
            _userID: '',
            _visible: false,
            _referCode : '',
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
                    'string': 'email,name'
                }
            }
        }, this.responseInfoCallback, );

        LoginManager.logInWithReadPermissions(['public_profile']).then(
            function (result) {
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
            // _that.setState({
            //     _facbookId: result.id,
            //     _name: result.name
            // })
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
        const { _userName ,_email, _password, _isRemember, _visible ,_confirmPassword ,_referCode} = this.state
        return (

            <View style={{flex:1}}>
            <ImageBackground source={require('../themes/Images/login_bg.png')} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
            <ScrollView style ={{marginTop : 60}}>
            <KeyboardAwareScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


                <View style={ { justifyContent: AppColors.justifyContentcenter, paddingLeft: AppColors.paddingLeft20,
                   paddingRight: AppColors.paddingRight20,backgroundColor:'transparent' ,flexDirection:'column'}}>

                      <View style={AppStyles.login_logo_cnt}>
                        <Image source={Logo} style={AppStyles.login_logo} />
                    </View>

                    <View style={AppStyles.Input_iconcnt}>

                          <View style={AppStyles.Inputtxt}>
                            <Text style={AppStyles.InputCnt_icon}>User name</Text>
                            <TextInput
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
                                returnKeyType={"next"}
                                selectionColor={"#fff"}
                                keyboardType={'default'}
                                autoFocus={false}
                                placeholder=""
                                placeholderTextColor={AppColors.lightGray_text}
                                style={AppStyles.InputCnt_txt}
                                ref="userName"
                                onChangeText={_userName => this.setState({ _userName })}

                            />
                        </View>
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
                                placeholderTextColor={AppColors.lightGray_text}
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
                    <View style={AppStyles.Input_iconcnt}>

                          <View style={AppStyles.Inputtxt}>
                            <Text style={AppStyles.InputCnt_icon}>Confirm password</Text>
                            <TextInput
                                returnKeyType={"done"}
                                autoCorrect={false}
                                selectionColor={"#fff"}
                                placeholderTextColor={AppColors.lightGray_text}
                                underlineColorAndroid="transparent"
                                placeholder=""
                                style={AppStyles.InputCnt_txt}
                                secureTextEntry
                                ref="_confirmPassword"
                                onSubmitEditing={Keyboard.dismiss}
                                onChangeText={_confirmPassword => this.setState({ _confirmPassword })}
                                value={_confirmPassword}
                                maxLength ={10}
                            />
                        </View>
                    </View>
                    <View style={AppStyles.Input_iconcnt}>

                          <View style={AppStyles.Inputtxt}>
                            <Text style={AppStyles.InputCnt_icon}>Refer code</Text>
                            <TextInput
                                returnKeyType={"done"}
                                autoCorrect={false}
                                selectionColor={"#fff"}
                                placeholderTextColor={AppColors.lightGray_text}
                                underlineColorAndroid="transparent"
                                placeholder=""
                                style={AppStyles.InputCnt_txt}
                                ref="_referCode"
                                onSubmitEditing={Keyboard.dismiss}
                                onChangeText={_referCode => this.setState({ _referCode })}
                                value={_referCode}
                            />
                        </View>
                    </View>



                    <LoginButton text={"Sign Up"} onPress={this.SignUp} style={AppStyles.green_round_button} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        paddingTop:20


                    }}>
                              <View style = {{justifyContent:'space-between',flexDirection:'column',alignItems:'center',paddingTop:20,flex:1}}>

                                    <Image source={require('../themes/Images/or.png')}  style={{ width: 270, height: 10,alignSelf:'center'}} />

                                    <TouchableOpacity activeOpacity={.8} onPress={() => this.fetchFacbookInfo()} style = {{flex:1,marginTop:15}} >
                                       <Image source={require('../themes/Images/fb_login.png')} style={{height:60,resizeMode:'contain',alignSelf:'center'}} />
                                    </TouchableOpacity>
                                    <Image source={require('../themes/Images/logo_bt.png')} style={{width:270,height:60,resizeMode:'contain',alignItems:'center',alignSelf:'center', marginBottom : 50}} />



                             </View>

                </View>
                    <Spinner visible={_visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                </View>
                </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
                </ScrollView>
                </ImageBackground>
                </View>

        )
    }

    /**
     * SignUp click functionality
     */

    SignUp = () => {
        const {_confirmPassword,_userName, _email, _password, _isRemember, _visible,_referCode } = this.state

        this.setState({ _visible: true })
        if (_userName.length <= 0){
          this.setState({ _visible: false })
          Alert.alert('Please enter user name.');
        }else if (_email.length <= 0) {
            this.setState({ _visible: false })
            commonFunctions.message('Please enter email address.');
        }else if (!commonFunctions.validateEmail(_email)) {
            this.setState({ _visible: false })
            commonFunctions.message('Please enter a valid email address.');
        }else if ((_password.length <= 0)) {
            this.setState({ _visible: false })
            Alert.alert('Please enter a password.');
        }else if ((_password.indexOf(' ') >= 0 || _password.length < 6)) {
            this.setState({ _visible: false })
            Alert.alert('Password must be more then 5 charactors.');
        }else if ((_confirmPassword.length <= 0)) {
            this.setState({ _visible: false })
            Alert.alert('Please enter a confirm password.');
        } else if ((_password != _confirmPassword)) {
            this.setState({ _visible: false })
            Alert.alert('Password and confirm password does not match.');
        }
        else {
            AsyncStorage.getItem("token").then((token)=>{
                let data = new FormData();
                data.append('name', _userName);
                data.append('email', _email);
                data.append('pass', _password);
                data.append('refercode', _referCode);
                data.append("deviceToken",token);
                console.log("body"+JSON.stringify(data))
                this.PostToApiCalling('POST', 'registration', Constant.URL_RegisterUser, data);
            })         
        }
        //_that.props.navigation.navigate('DrawerMenu')
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
        const { _userID ,_userName,_email,_password,_confirmPassword} = this.state
        if (apiKey == 'registration') {

            if (jsonRes.response == 1)
            {
                setTimeout(() => {
                    Alert.alert(
                        "You are registered successfully.",
                        "",
                        [
                            { text: 'OK' },
                        ],
                        { cancelable: false }
                    )
                }, 1000);


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
                this.setState({ _userName: false })
                this.setState({ _email: false })
                this.setState({ _password: false })
                this.setState({ _confirmPassword: false })
                this.setState({ _visible: false })
            } else {
              this.setState({ _visible: false })
            }
        }
    }





}




export default SignUp
