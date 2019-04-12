import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    Platform,
    AsyncStorage,
    ImageBackground,

} from 'react-native';
import { AppStyles, AppSizes, AppColors } from '../themes/'
import Buttons, { LoginButton, Button2 } from "../components/Buttons";
import {NavigationActions} from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';

const PlayerBg = require('../themes/Images/player_bg.png');

import * as commonFunctions from '../utils/CommonFunctions'
var Constant = require('../api/WebInteractor').Constant;
var WebServices = require('../api/WebInteractor').WebServices;
import Confetti from 'react-native-confetti';

var _that;

export default class ManOfMatchCongrats extends Component {

  constructor(props){
    super(props)
      this.state = {
        visible: false,
        playerName:"",
        playerImgUri:"",
        playerId:this.props.navigation.state.params.playerId,
        //userName:this.props.navigation.state.params.userName,
        message:this.props.navigation.state.params.message
      };
      _that = this;

  }
  componentDidMount() {
    if(this._confettiView) {
       this._confettiView.startConfetti();
    }
   this.getPlayerDetailByApi()
  }


  componentWillUnmount ()
  {
      if (this._confettiView)
      {
          this._confettiView.stopConfetti();
      }
  }
/*
<Text style={{color : 'white' ,fontSize: 20,fontWeight: 'bold', justifyContent : 'center' , alignSelf : 'center'}}>{playerName}</Text>
       <Text style={{color : 'white' ,fontSize: 20,fontWeight: 'bold', justifyContent : 'center' , alignSelf : 'center' , marginTop : 15}}>Congratulations...!!!</Text>
       <Text style={{color : 'white' ,fontSize: 20,fontWeight: 'bold', justifyContent : 'center' , alignSelf : 'center' , marginTop : 15}}>Man of the match</Text>
*/

  render(){
    const {visible,playerName,playerImgUri,userName,message} = this.state
    return(
      <View style={styles.container}>


      <ImageBackground source={require('../themes/Images/login_bg.png')} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
      <ScrollView >


       <View style={{marginTop : 70 , justifyContent : 'center' , alignSelf : 'center'}}>

           <Image source={PlayerBg} style={AppStyles.player_bg} />
           <Image source={{uri:playerImgUri}} style={{position: 'absolute',top: 40,left:70,width: AppSizes.screen.width-165,height: 260,}} />

       </View>

       <Text style={{color : 'white' ,fontSize: 20,fontWeight: 'bold' ,textAlign :'center', marginTop : 15}}>{message}</Text>
       <LoginButton text={"Go to Home"} onPress={() => this.btnGoToHomePressed()} style={[AppStyles.green_round_button,{marginLeft: 15,marginRight: 15}]} />
       

       <Confetti ref={(node) => this._confettiView = node}/>
       <Spinner visible={visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
      </ScrollView >
      </ImageBackground>
      </View>
    )
  }
  btnGoToHomePressed = () => {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  /**
   * Api calling
   */

   getPlayerDetailByApi=()=>{
     // Loader show
     const {playerId} = this.state
     this.setState({ visible: true })
     let data = new FormData();
      data.append('playerId', playerId);
     this.PostToApiCalling("POST", "get_player_detail", Constant.URL_get_player_detail,data);
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
          this.setState({visible:false},()=>{
            setTimeout(()=>{
              commonFunctions.logoutFromSession(this)
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

            this.setState({ visible: false })

        } else {
            if (jsonRes.response == '1') {
                console.log(JSON.stringify(jsonRes))

                this.apiSuccessfullResponse(apiKey, jsonRes)
            }
        }
       }
      }).catch((error) => {
          console.log("ERROR" + error);
      });
  }



  apiSuccessfullResponse(apiKey, jsonRes) {

      if (apiKey == 'get_player_detail') {
              if (jsonRes.response == '1')
              {
                  console.log(JSON.stringify(jsonRes.message))   
                  this.setState({ 
                    visible: false ,
                    playerName:jsonRes.message.playerName,
                    playerImgUri:jsonRes.message.playerImgUri
                  })
              } else {
                  this.setState({ visible: false })
              }
          }
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
