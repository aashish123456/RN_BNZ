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
const InputCode = require('../themes/Images/input_digit_code.png')
const ReferFriend = require('../themes/Images/refer_friend.png')

var Constant = require('../api/WebInteractor').Constant;
var WebServices = require('../api/WebInteractor').WebServices;


import Camera from 'react-native-camera';
const qrCodeIamge = require('../themes/Images/qr_code1.png');



var _that;
export default class GetCards extends Component {
  constructor() {

      super()
      this.state = {
      isCameraOpen:false,

    };
    _that = this;



    }


render(){

  if (this.state.isCameraOpen==true) {
    return(

      <Camera onBarCodeRead={this._onBarCodeRead.bind(this)} style={styles.camera}>

                    <View style={styles.rectangleContainer}>
                      <Image source={qrCodeIamge} style={{width:AppSizes.screen.width-70}} resizeMode={'contain'}/>
                    </View>
      </Camera>



        //


    )
  }else {
    return(
      this.cardView()
    )
  }


  }

  cardView(){

    return(
      <View style={{flex:1}}>
        <ImageBackground source={require('../themes/Images/login_bg.png')} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
            <View style={ {paddingLeft: AppColors.paddingLeft20,paddingRight: AppColors.paddingRight20,backgroundColor:'transparent' ,flexDirection:'column',flex:1 ,marginTop : 70}}>
                  <View style ={{justifyContent: 'space-between',marginBottom : 30 ,marginTop : 30}}>
                      <TouchableOpacity activeOpacity={.8} onPress={() => _that.qrCodeCameraView()} >
                        <View style={{backgroundColor : 'red' , opacity : 0.8 , height : 100 , width : AppSizes.screen.width-40 , justifyContent: 'flex-start',alignItems: 'flex-start',marginBottom : 30}}>
                           <View style = {{flex : 1 ,flexDirection : 'row'}}>
                             <Image source={ScanCode} style={{width: 60,height: 60, marginRight : 30 ,marginLeft  : 20 ,marginTop : 15}} />
                             <Text style={{color:'white' ,fontSize : 17 , marginTop : 35,fontWeight: 'bold'}}>
                                SCAN QR CODE
                             </Text>
                           </View>
                        </View>
                     </TouchableOpacity>



                    <TouchableOpacity activeOpacity={.8} onPress={() => _that.props.navigation.navigate('ReferAFriend')} >
                      <View style={{backgroundColor : '#B3A23F' , opacity : 0.8 , height : 100 , width : AppSizes.screen.width-40 , justifyContent: 'flex-start',alignItems: 'flex-start',marginBottom : 30}}>
                         <View style = {{flex : 1 ,flexDirection : 'row'}}>
                           <Image source={ReferFriend} style={{width: 60,height: 60, marginRight : 30 ,marginLeft  : 20 ,marginTop : 15}} />
                           <Text style={{color:'white' ,fontSize : 17 , marginTop : 35,fontWeight: 'bold'}}>
                              REFER A FRIEND
                           </Text>
                         </View>
                      </View>
                   </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
      </View>

    )


  }

  qrCodeCameraView(){

    this.setState({
      isCameraOpen:true
    });

    }

    qrCodeCameraViewCancel(){

      this.setState({
        isCameraOpen:false
      });

      }


    _onBarCodeRead=(result)=> {



      console.log("Result Data>>>>>> "+JSON.stringify(result));

      if (result.data != "" || result.data != null){
            console.log("Result Data111111>>>>>> "+result.data);
            if (/^[\],:{}\s]*$/.test(result.data.replace(/\\["\\\/bfnrtu]/g, '@').
  replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
  replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                  var temp = JSON.parse(result.data);
                  console.log("Result Data ,,,,,,,, "+temp["id"])
                  console.log("Result Data ID "+temp["id"])
                  this.setState({
                    isCameraOpen:false
                  });
                  if (temp["id"] != ""){

                  this.setState({ _visible: true })
                  AsyncStorage.getItem('userModel')
                      .then((res) => {
                          if (res) {
                              var dataRes = JSON.parse(res)
                              let data = new FormData();
                              data.append('user_id', dataRes.UserID);
                              data.append('card_id', temp["id"]);
                              console.log("Result Data user id "+dataRes.UserID)
                              this.PostToApiCalling("POST", "send_user_card", Constant.URL_send_user_card, data);
                          }
                      });
                  }
                }else{
                  Alert.alert('Please scan correct QR code')
                  this.qrCodeCameraViewCancel()

                }
        }else {
              Alert.alert('Please scan correct QR code')
              this.qrCodeCameraViewCancel()


       }

    }

    PostToApiCalling(method, apiKey, apiUrl, data) {
      console.log("data of request" + data);
        new Promise(function (resolve, reject) {
            if (method == 'POST') {
              AsyncStorage.getItem('userModel')
                  .then((res) => {
                      if (res) {
                          var dataXAPI = JSON.parse(res)
                          resolve(WebServices.callWebService(apiUrl, data , dataXAPI.XAPIKEY));
                      }
                    });
            } else {
                resolve(WebServices.callWebService_GET(apiUrl, data));
            }
        }).then((jsonRes) => {

          console.log("json response---- "+jsonRes)

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


          if (jsonRes.response == '1')
          {
            //teamArr = jsonRes.message
            this.setState({ _visible: false})
            _that.props.navigation.navigate('congratulation' , {data:jsonRes.message})

          } else {
            this.setState({ _visible: false })
          }
        }


  }
  const styles = StyleSheet.create({
    camera: {
    height: AppSizes.screen.height,
    alignItems: 'center',
  },
  mainHeader:{
       backgroundColor:'#756046',
       height:50,
       width:AppSizes.screen.width,
  },
  rectangleContainer: {
    flex: 1,
    flexDirection : 'column',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:100,
  },

});
