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
const EmailIdImage = require('../themes/Images/user.png');
const password_icon = require('../themes/Images/password.png');
const Logo = require('../themes/Images/logo_bt.png');
const check_icon = require('../themes/Images/check.png')
const uncheck_icon = require('../themes/Images/uncheck.png')
import * as commonFunctions from '../utils/CommonFunctions'
var Constant = require('../api/WebInteractor').Constant;
var WebServices = require('../api/WebInteractor').WebServices;
var _that;
class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _email: '',
            _visible: false
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
    render() {
        const { _email, _password, _isRemember, _visible } = this.state
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
<View style={{flex:1}}>
<ImageBackground source={require('../themes/Images/login_bg.png')} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >

            <ScrollView  >

                <View style={ { justifyContent: AppColors.justifyContentcenter, paddingLeft: AppColors.paddingLeft20,
                   paddingRight: AppColors.paddingRight20,backgroundColor:'transparent' ,flexDirection:'column',marginTop:70}}>

                      <View style={AppStyles.login_logo_cnt}>
                        <Image source={Logo} style={AppStyles.login_logo} />
                    </View>

                    <View style={AppStyles.Input_iconcnt}>

                          <View style={AppStyles.Inputtxt}>
                            <Text style={AppStyles.InputCnt_icon}>Email</Text>
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




                    <LoginButton text={"Submit"} onPress={this.ForgotPassword} style={[AppStyles.green_round_button,{marginTop:40}]} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 30
                    }}>


                     <Image source={require('../themes/Images/logo_bt.png')} style={{width:270,height:60,resizeMode:'contain',marginTop:10,marginBottom:50,alignItems:'center',alignSelf:'center'}} />


                    <View>

                      </View>

                </View>
                    <Spinner visible={_visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />

                </View>
                </ScrollView>
                </ImageBackground>
                </View>
                </TouchableWithoutFeedback>
        )
    }

    /**
     * LogIn click functionality
     */

    ForgotPassword = () => {
        const { _email, _visible } = this.state
        // Loader show
        this.setState({ _visible: true })
        /**
         *  Form  Validations
         */
         if (_email.length <= 0) {
             this.setState({ _visible: false })
             commonFunctions.message('Please enter email address.');
         }else if (!commonFunctions.validateEmail(_email)) {
            this.setState({ _visible: false })
            commonFunctions.message('Please enter a valid email address.');
        } else {
          let data = new FormData();
          data.append('email', _email);
          this.PostToApiCalling('POST', 'forgot_password', Constant.URL_forgot_password, data);
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


    PostToApiCalling=(method, apiKey, apiUrl, data) =>{
      const { _email, _visible } = this.state
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

    apiSuccessfullResponse=(apiKey,jsonRes)=>{
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
          this.setState({ _email: "" })
        _that.props.navigation.goBack()
        this.setState({ _visible: false })
    }

}


export default ForgotPassword
