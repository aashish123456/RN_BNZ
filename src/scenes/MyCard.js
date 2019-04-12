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
    DeviceEventEmitter

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
const MySquad = require('../themes/Images/my_squad.png')
const myCard = require('../themes/Images/my_card.png')
const GetCards = require('../themes/Images/get_cards.png')



import * as commonFunctions from '../utils/CommonFunctions'
var Constant = require('../api/WebInteractor').Constant;
var WebServices = require('../api/WebInteractor').WebServices;
var _that;
export default class MyCard extends Component {
  constructor() {
    super();
    this.state = {
      cardCount : 0,
    };

    _that = this;
  }
  componentDidMount(){
    let data = new FormData();
    this.PostToApiCalling("GET", "get_card_count", Constant.URL_get_card_count, data);

    DeviceEventEmitter.addListener('refreshData', function () {
      let data = new FormData();
      this.PostToApiCalling("GET", "get_card_count", Constant.URL_get_card_count, data);
    }.bind(this));
  }



render(){
    return(
          <View style={{flex:1}}>
            <ImageBackground source={require('../themes/Images/login_bg.png')} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
             <ScrollView style ={{marginTop : 60}}>
                <View style={ {paddingLeft: AppColors.paddingLeft20,paddingRight: AppColors.paddingRight20,backgroundColor:'transparent' ,flexDirection:'column',flex:1}}>
                  <View style={{justifyContent: 'center',alignItems: 'center'}}>
                    <Image source={Price} style={{width: 150,height: 150,}} />
                     <View style ={{position : 'absolute' ,flex :1 , flexDirection : 'column' , justifyContent : 'center' ,alignItems : 'center'}}>
                        <Text style ={{fontSize : 30 ,color : 'white',fontWeight: 'bold'}}>
                          {this.state.cardCount}
                        </Text>
                        <Text style ={{fontSize : 15 ,color : 'white'}}>
                          Cards
                        </Text>
                    </View>
                  </View>

                      <View style ={{justifyContent: 'space-between',marginBottom : 30 ,marginTop : 30}}>
                          <TouchableOpacity activeOpacity={.8} onPress={() => _that.props.navigation.navigate('MySquadMyCards')} >
                            <View style={{backgroundColor : 'red' , opacity : 0.8 , height : 100 , width : AppSizes.screen.width-40 , justifyContent: 'flex-start',alignItems: 'flex-start',marginBottom : 30}}>
                               <View style = {{flex : 1 ,flexDirection : 'row'}}>
                                 <Image source={MySquad} style={{width: 60,height: 60, marginRight : 30 ,marginLeft  : 20 ,marginTop : 15}} />
                                 <Text style={{color:'white' ,fontSize : 17 , marginTop : 35,fontWeight: 'bold'}}>
                                    MY SQUAD
                                 </Text>
                               </View>
                            </View>
                         </TouchableOpacity>

                         <TouchableOpacity activeOpacity={.8} onPress={() => _that.props.navigation.navigate('MySquadMyCards')} >
                           <View style={{backgroundColor : '#10A8A6' , opacity : 0.8 , height : 100 , width : AppSizes.screen.width-40 , justifyContent: 'flex-start',alignItems: 'flex-start',marginBottom : 30}}>
                              <View style = {{flex : 1 ,flexDirection : 'row'}}>
                                <Image source={myCard} style={{width: 60,height: 60, marginRight : 30 ,marginLeft  : 20 ,marginTop : 15}} />
                                <Text style={{color:'white' ,fontSize : 17 , marginTop : 35,fontWeight: 'bold'}}>
                                   MY 1st 15 CARDS
                                </Text>
                              </View>
                           </View>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={.8} onPress={() => _that.props.navigation.navigate('GetCards')} >
                          <View style={{backgroundColor : '#B3A23F' , opacity : 0.8 , height : 100 , width : AppSizes.screen.width-40 , justifyContent: 'flex-start',alignItems: 'flex-start',marginBottom : 30}}>
                             <View style = {{flex : 1 ,flexDirection : 'row'}}>
                               <Image source={GetCards} style={{width: 60,height: 60, marginRight : 30 ,marginLeft  : 20 ,marginTop : 15}} />
                               <Text style={{color:'white' ,fontSize : 17 , marginTop : 35,fontWeight: 'bold'}}>
                                  GET CARDS
                               </Text>
                             </View>
                          </View>
                       </TouchableOpacity>
                    </View>
                </View>
              </ScrollView>
            </ImageBackground>
          </View>

    )
  }

  PostToApiCalling(method, apiKey, apiUrl, data) {
      new Promise(function (resolve, reject) {
          if (method == 'POST') {
                resolve(WebServices.callWebService(apiUrl, data));

          } else {
              AsyncStorage.getItem('userModel')
                  .then((res) => {
                      if (res) {
                          var data = JSON.parse(res)
                          resolve(WebServices.callWebService_GET(apiUrl, data));
                      }
                    });
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
    this.setState({ _visible: false })


          if (jsonRes.response == '1')
          {
            this.setState({ _visible: false , cardCount : jsonRes.message.total_count})
            this.setState({ _visible: false })
          } else {
            this.setState({ _visible: false })
          }

   }


}
