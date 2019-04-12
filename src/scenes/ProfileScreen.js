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
    BackHandler,
    PermissionsAndroid,

} from 'react-native';



import ImagePicker from 'react-native-image-picker';

import { DrawerNavigator, StackNavigator,NavigationActions } from 'react-navigation';

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
const thumbnail_icon = require('../themes/Images/profileD.png')
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
class ProfileScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _name : '',
            _gender:'',
            _email: '',
            _password: '',
            _visible: false,
            _isRemember: false,
            isEditing : true,
            _oldPassword :'',
            _age:'',
            _confirmPassword:'',
            _newPassword:'',
            isMale:false,
            avatarSource:'',
            avatardata:'',
            pass:'',
            userfile:'',
            imgURI:'https://ds01.24livehost.com/crusadersconz/media/plg_user_profilepicture/images/200/d58e261c4ad88ff344972a2f09c12dd9fc9447e9.jpg',
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

    componentWillMount() {

      const {  _visible } = this.state
      AsyncStorage.getItem('userModel')
          .then((res) => {
              if (res) {
                  var data = JSON.parse(res)
                  this.setState({ _visible: true })
                  this.PostToApiCalling("GET", "get_user_profile", Constant.URL_get_user_profile, data);
              }
          });

    }
    static navigationOptions = ({ navigation, screenProps }) => ({ headerStyle : {
              backgroundColor: '#89f4ef'
     },
     // headerRight: <TouchableOpacity  style = {{overflow: (Platform.OS == "ios")?'hidden': null,borderRadius : 10,backgroundColor : "red",marginRight : 10, width : 80, height : 35,justifyContent : "center",alignItems : "center"}} onPress={() => { _that.click(navigation) }}>
     //  <Text style = {{color : "white", fontWeight : "bold"}}> LOGOUT </Text>
     //  </TouchableOpacity>,
      headerLeft : <TouchableOpacity style = {{justifyContent :"center",alignItems :"center",marginLeft : 3,width : 40,height : 40}} onPress = {() => {
       navigation.goBack()}}>
        <Image source = {require('../themes/Images/back_arrow.png')}/>
      </TouchableOpacity>, });

    click(navigation){

      LoginManager.logOut()
      AsyncStorage.removeItem("userModel"),
      _that.logoutApiCall();
      this.props.navigation.dispatch({
      type: NavigationActions.NAVIGATE,
      routeName: 'Login',
      action: {
        type: NavigationActions.RESET,
        index: 0,
        actions: [{type: NavigationActions.NAVIGATE, routeName: 'Login'}]
      }})
      BackHandler.removeEventListener('hardwareBackPress',this.handleBackButtonClick);
    }
    logoutUser = ()=>{

      Alert.alert(
        'BNZCrusaders',
        'Are you sure you want to logout?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.logoutConfirm()},
        ],
        { cancelable: false }
      )
    }
    logoutConfirm(){
        this.logoutApiCall()
    }


    render() {
        const { pass,userfile,_name,_gender,_age,_email, _isRemember, _visible,isEditing,imgURI } = this.state
        return (


              <View style={{flex:1}}>

                <ImageBackground source={require('../themes/Images/login_bg.png')} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >

              <ScrollView style ={{marginTop : 60}}>
              <View style = {{flex:1}} >

                <View style={ { justifyContent: 'center', paddingLeft: AppColors.paddingLeft20,
                   paddingRight: AppColors.paddingRight20,backgroundColor:'transparent' ,flexDirection:'column',flex:1}}>
                      <View style={{flex : 1 , justifyContent : 'center' , alignSelf : 'center'}}>
                        <TouchableOpacity style={{width :100  , height : 100 ,borderRadius : 50, borderColor : 'red' ,borderWidth : 1}} onPress={this.selectPhotoTapped.bind(this)}>
                          <Image source={{uri: imgURI}} style={{width :99  , height : 99,borderRadius : 50,borderColor : 'red' ,borderWidth : 1}} />
                         </TouchableOpacity>
                      </View>

                    <View style={AppStyles.Input_iconcnt}>

                          <View style={AppStyles.Inputtxt}>
                            <Text style={{color : 'white' , fontSize : 13 , marginTop : 20}}>Name</Text>
                                <TextInput
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    returnKeyType={"next"}
                                    selectionColor={"#fff"}
                                    keyboardType={'email-address'}
                                    autoFocus={false}
                                    editable={isEditing}
                                    placeholder=""
                                    placeholderTextColor={AppColors.lightGray_text}
                                    style={AppStyles.InputCnt_txt}
                                    ref="emailid"
                                    onChangeText={_name => this.setState({ _name })}
                                    value={_name}

                                />
                        </View>
                    </View>
                    <View style={AppStyles.Input_iconcnt}>

                        <View style={{width:AppSizes.screen.width}}>
                            <Text style={{color : 'white' , fontSize : 13 , marginTop : 20,textAlign:'left'}}>Gender</Text>
                        </View>

                        <View style={{flex:1,flexDirection:'row',marginTop:10,width:AppSizes.screen.width,}}>
                        <TouchableOpacity  style={{marginRight:5}}  onPress={() => this.maleFemaleSelect('male')}>

                        {
                        (this.state.isMale)?
                        <Image source={require('../themes/Images/deSelect.png')} style={{width: 25, height: 25,resizeMode: "contain"}}/>
                        :
                        <Image source={require('../themes/Images/Select.png')} style={{width: 25, height: 25,resizeMode: "contain"}}/>
                        }

                        </TouchableOpacity>
                        <Text style={{marginTop:3,color:'white'}}>Male</Text>

                        <TouchableOpacity  style={{marginRight:5,marginLeft:10}} onPress={() => this.maleFemaleSelect('female')}>
                        {
                        (this.state.isMale)?
                          <Image source={require('../themes/Images/Select.png')} style={{width: 25, height: 25,resizeMode: "contain"}}/>
                        :
                          <Image source={require('../themes/Images/deSelect.png')} style={{width: 25, height: 25,resizeMode: "contain"}}/>
                        }
                        </TouchableOpacity>
                        <Text style={{marginTop:3,color:'white'}}>Female</Text>

                        </View>

                    </View>

                    <View style={AppStyles.Input_iconcnt}>

                          <View style={AppStyles.Inputtxt}>
                            <Text style={{color : 'white' , fontSize : 13 , marginTop : 20}}>Age</Text>
                                <TextInput
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    returnKeyType={"next"}
                                    editable={isEditing}
                                    selectionColor={"#fff"}
                                    keyboardType={'numeric'}
                                    autoFocus={false}
                                    placeholder=""
                                    placeholderTextColor={AppColors.lightGray_text}
                                    style={AppStyles.InputCnt_txt}
                                    ref="age"
                                    onChangeText={_age => this.setState({ _age })}
                                    value={_age}
                                    maxLength={2}

                                />
                        </View>
                    </View>
                    <View style={AppStyles.Input_iconcnt}>

                          <View style={AppStyles.Inputtxt}>
                            <Text style={{color : 'white' , fontSize : 13 , marginTop : 20}}>Password</Text>
                                <TextInput
                                    autoCorrect={false}
                                    underlineColorAndroid="transparent"
                                    returnKeyType={"done"}
                                    selectionColor={"#fff"}
                                    editable={isEditing}
                                    secureTextEntry = {true}
                                    keyboardType={'email-address'}
                                    autoFocus={false}
                                    placeholder=""
                                    placeholderTextColor={AppColors.lightGray_text}
                                    style={AppStyles.InputCnt_txt}
                                    ref="pass"
                                    onChangeText={pass => this.setState({ pass })}
                                    value={pass}

                                />
                        </View>
                    </View>




                    <LoginButton text={"Save"} onPress={this.updateProfile} style={[AppStyles.green_round_button , {marginTop : 50}]} />

                    <LoginButton text={"Logout"} onPress={this.logoutUser} style={[AppStyles.green_round_button , {marginTop : 10}]} />
                    <View>
                    <View style = {{justifyContent:'space-around',flexDirection:'column',alignItems:'center',paddingTop:20}}>
                     <Image source={require('../themes/Images/logo_bt.png')} style={{width:270,height:60,resizeMode:'contain',marginTop:10,marginBottom:50,alignItems:'center',alignSelf:'center'}} />
                     </View>

                </View>

                </View>
                 <Spinner visible={_visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
                </View>
                </ScrollView >
                </ImageBackground>
                </View>
        )
    }

    selectPhotoTapped(){

              console.log("Photo Tap");

              const options = {
              quality: 1.0,
              maxWidth: 500,
              maxHeight: 500,
              storageOptions: {
                skipBackup: true
              }
            };



            ImagePicker.showImagePicker(options, (response) => {
              console.log('Response = ', response);

              if (response.didCancel) {
                console.log('User cancelled photo picker');
              }
              else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              }
              else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              }
              else {
                let source = { uri: response.uri };
                let b64 =  response.data;

                this.setState({
                  avatarSource: source,
                  avatardata:b64,
                  userfile:b64,
                  imgURI : response.uri
                });
              }
            });



    }
    maleFemaleSelect(value){

      console.log(value);


      if (value=='male') {
        this.setState({ isMale: false })
      }else {
        this.setState({ isMale: true })
      }

    }
    setEditingTextInput = () => {
        this.setState({ isEditing: !this.state.isEditing })
    }
    /**
     * LogIn click functionality
     */

    updateProfile = () => {

        //_that.props.navigation.navigate('Home')

        const { _name,_age,_gender,_email, _password, _visible,userfile,pass,avatarSource } = this.state

        // Loader show
        this.setState({ _visible: true })


         //  Form  Validations
         let data = new FormData();

         if (this.state.isMale==true) {
           data.append('gender', 'm');
         }else {
           data.append('gender', 'f');
         }
          data.append('name', _name);
          data.append('age', _age);
          if (avatarSource == '' || avatarSource == null){

          }else{
          data.append('profile_pic', {...avatarSource, name: 'image.jpg', type: 'image/jpeg'});
          }
          data.append('pass', pass);

          this.PostToApiCalling("POST", "edit_complete_profile", Constant.URL_edit_complete_profile, data);

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

     logoutApiCall=()=>{
      AsyncStorage.getItem('userModel')
      .then((res) => {
          if (res) {
              var userModel = JSON.parse(res)
              let data = new FormData();
              data.append("user_id",userModel.UserID)
              data.append("logout_type","normal")
              this.PostToApiCalling("POST", "logout", Constant.URL_logout, data);
          }
        });
     }


    PostToApiCalling(method, apiKey, apiUrl, data) {
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
        const { _email, _password, _isRemember,_gender,_age,_name,isMale} = this.state
        if (apiKey == 'edit_complete_profile') {
          if (jsonRes.response == '1')
          {

            setTimeout(() => {
                Alert.alert(
                    "Profile details saved successfully.",
                    "",
                    [
                        { text: 'OK' },
                    ],
                    { cancelable: false }
                )
            }, 1000);


            this.setState({ _visible: false })
            this.setState({ _name: jsonRes.message.name })
            this.setState({ _gender: jsonRes.message._gender })
            this.setState({ isMale: jsonRes.message.gender == 'm' ? true : false})
            this.setState({ _age: jsonRes.message.age })
            this.setState({ userfile: jsonRes.message.profile_pic })
            this.setState({ imgURI: jsonRes.message.profile_pic })
            this.setState({ _visible: false })

          } else {
            this.setState({ _visible: false })
          }
        }else if(apiKey=="logout"){
          commonFunctions.logoutFromSession(this)
        }
        else {

          if (jsonRes.response == '1')
          {
              this.setState({ _visible: false })
              this.setState({ _name: jsonRes.message.name })
              this.setState({ isMale: jsonRes.message.gender == 'm' ? true : false})
              this.setState({ _age: jsonRes.message.age })
              this.setState({ userfile: jsonRes.message.profile_pic })
              this.setState({ imgURI: jsonRes.message.profile_pic})
              this.setState({ _visible: false })
          }
          else
          {
            this.setState({ _visible: false })
          }
        }
      }
}
export default ProfileScreen