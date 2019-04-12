import React, { Component } from 'react';
import {ListView,
        ScrollView,
        Text,
        View,
        Image,
        Keyboard,
        TouchableHighlight,
        Dimensions,
        ImageBackground,
        TouchableOpacity,
        paddingRight,
        paddingLeft,
        StyleSheet,
        Alert,
        Color,
        Icon,
        AsyncStorage,
        Platform} from 'react-native';

import { AppStyles, AppSizes, AppColors } from '../themes/'
import SegmentedControlTab from 'react-native-segmented-control-tab'
var login_bg = require('../themes/Images/home_3.png')
const img1 = require('../themes/Images/profile.png')
const img2 = require('../themes/Images/u.png')
const Logo = require('../themes/Images/login_logo.png');
const Score = require('../themes/Images/scorc.png');
import Spinner from 'react-native-loading-spinner-overlay';
import * as commonFunctions from '../utils/CommonFunctions'
var Constant = require('../api/WebInteractor').Constant;
var WebServices = require('../api/WebInteractor').WebServices;
var _that;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const list_data = [
  {
    name: 'Player1',
    image: img1,
    position : 'prop',
  },
  {
    name: 'Player2',
    image: img1,
    position : 'prop',
  },
  {
    name: 'Player3',
    image: img1,
    position : 'prop',
  },

]


export default class MySquadMyCards extends Component {
constructor() {
      super();
      var arrImages = [];
      this.state = {
          selectedIndex: 0,
          dataSource:ds.cloneWithRows(arrImages),
          _visible:false,
      };
      _that = this;
      _that.onGridPress = _that.onGridPress.bind(_that);
    }
    componentDidMount() {
      const {  _visible } = this.state
      AsyncStorage.getItem('userModel')
          .then((res) => {
              if (res) {
                  var data = JSON.parse(res)
                  this.setState({ _visible: true })
                  this.PostToApiCalling("GET", "get_user_card", Constant.URL_get_user_card, data);
              }
          });
    }
handleIndexChange = (index) => {
        this.setState({
          ...this.state,
          selectedIndex: index,
        });

        if (this.state.selectedIndex == 1){
          var arrValue = [];
          this.setState({dataSource:ds.cloneWithRows(arrValue)})
          AsyncStorage.getItem('userModel')
              .then((res) => {
                  if (res) {
                      var data = JSON.parse(res)
                      this.setState({ _visible: true })
                      this.PostToApiCalling("GET", "get_user_card", Constant.URL_get_user_card, data);
                  }
              });
           //Alert.alert("first")
        }else{
           //Alert.alert("second")
           var arrValue = [];
           this.setState({dataSource:ds.cloneWithRows(arrValue)})
           AsyncStorage.getItem('userModel')
               .then((res) => {
                   if (res) {
                       var data = JSON.parse(res)
                       this.setState({ _visible: true })
                       this.PostToApiCalling("GET", "get_user_favcard", Constant.URL_get_user_favcard, data);
                   }
               });
        }
    }

render() {
      return (
        <View>
          <ImageBackground source={login_bg} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
                <View style = {{marginTop : 70 , width: AppSizes.screen.width - 50 , justifyContent : 'center' ,alignSelf : 'center' ,flex : 1 ,flexDirection : 'column'}}>
                  <View >
                    <SegmentedControlTab tabsContainerStyle={styles.tabsContainerStyle}
                        tabStyle={styles.tabStyle}
                        tabTextStyle={styles.tabTextStyle}
                        activeTabStyle={styles.activeTabStyle}
                        activeTabTextStyle={styles.activeTabTextStyle}
                        selectedIndex={this.state.selectedIndex}
                        values={['MY SQUAD', 'MY 1st 15 CARDS']}
                        //onPress= {index => this.setState({selected:index})}
                        onTabPress={this.handleIndexChange}
                      />
                  </View>

                  <View style={{flex:1 ,marginTop:10}}>
                      <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow }
                        enableEmptySections={true}
                       />
                  </View>
                </View>
                <Spinner visible={this.state._visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
         </ImageBackground>
        </View>
        );
    }
renderRow(data){

            if (_that.state.selectedIndex == 1){

              return (
                      <View>
                      <TouchableOpacity  activeOpacity={.8} onPress={_that.onGridPress.bind(_that,'TeamPlayerDetail' , data)} >
                      <View>
                                    <View style={{flexDirection:'column'}}>
                                         <View style={{marginTop : 0 , flex : 1 , flexDirection : 'row' ,height : 100 , width : Dimensions.get('window').width ,}}>

                                                 {
                                                  Platform.OS === "android"
                                                  ? <View style={{width :80  , height : 80 ,borderRadius : 40, marginLeft : 10 , borderColor : 'red' ,borderWidth : 1.5,overflow:"hidden" }}>
                                                  <Image source={{uri:data.card.image}}  style={{width :120  , height : 120  ,overflow:"hidden", alignSelf: 'center' , alignItems: 'center',resizeMode:"contain"}} />
                                                </View>
                                                  : <View style={{width :80  , height : 80 ,borderRadius : 40, marginLeft : 10 , borderColor : 'red' ,borderWidth : 1.5,overflow:"hidden" }}>
                                                         <Image source={{uri:data.card.image}}  style={{width :120  , height : 120  ,overflow:"hidden", alignSelf: 'center' , alignItems: 'center',resizeMode:"contain"}} />
                                                     </View>
                                                 }

                                                 <View style={{flex : 1 , flexDirection : 'column' ,marginLeft : 10 }}>
                                                    <Text style={{color : 'white' ,fontSize: 20,fontWeight: 'bold', }}>{data.card.name}</Text>
                                                    <Text style={{color : 'white' ,fontSize: 15, }}>{data.card.Position}</Text>
                                                  </View>
                                          </View>
                                      </View>

                      </View>
                      </TouchableOpacity>
                      </View>
               )

            }else{

              return (
                      <View>
                      <TouchableOpacity  activeOpacity={.8} onPress={_that.onGridPress.bind(_that,'TeamPlayerDetail' , data)} >
                      <View>
                                    <View style={{flexDirection:'column'}}>
                                         <View style={{marginTop : 0 , flex : 1 , flexDirection : 'row' ,height : 100 , width : Dimensions.get('window').width ,}}>

                                            {
                                             Platform.OS === "android"
                                             ? <View style={{width :80  , height : 80 ,borderRadius : 40, marginLeft : 10 , borderColor : 'red' ,borderWidth : 1.5,overflow:"hidden" }}>
                                                  <Image source={{uri:data.card.image}}  style={{width :120  , height : 120  ,overflow:"hidden", alignSelf: 'center' , alignItems: 'center',resizeMode:"contain"}} />
                                               </View>
                                             : <View style={{width :80  , height : 80 ,borderRadius : 40, marginLeft : 10 , borderColor : 'red' ,borderWidth : 1.5,overflow:"hidden" }}>
                                                  <Image source={{uri:data.card.image}}  style={{width :120  , height : 120  ,overflow:"hidden", alignSelf: 'center' , alignItems: 'center',resizeMode:"contain"}} />
                                                </View>
                                            }

                                              <View style={{marginTop : 5, position : 'absolute'}}>
                                                   <TouchableOpacity
                                                       style={{
                                                           backgroundColor: data.is_fav == 1  ? 'red' : 'white',
                                                           height: 20,
                                                           width: 20,
                                                           borderRadius: 10
                                                       }}
                                                       onPress={()=>{_that.onSelectWorker(data)}} underlayColor={'red'}>

                                                   </TouchableOpacity>
                                              </View>

                                               <View style={{flex : 1 , flexDirection : 'column' ,marginLeft : 10 }}>
                                                  <Text style={{color : 'white' ,fontSize: 20,fontWeight: 'bold', }}>{data.card.name}</Text>
                                                  <Text style={{color : 'white' ,fontSize: 15, }}>{data.card.Position}</Text>
                                                </View>
                                          </View>
                                      </View>

                      </View>
                      </TouchableOpacity>
                      </View>
               )

            }

  }

            onSelectWorker = (data) => {
                   console.log("data form selected items" +  JSON.stringify(data));
                   //var isFav = !data.is_fav
                    AsyncStorage.getItem('userModel')
                        .then((res) => {
                            if (res) {
                                var dataXAPI = JSON.parse(res)
                                let data1 = new FormData();
                                data1.append('card_id', data.card.id);
                                data1.append('status', data.is_fav == 1  ? 0 : 1);
                                data1.append('XAPIKEY', dataXAPI.XAPIKEY);
                                this.setState({ _visible: true });
                                this.PostToApiCalling("POST", "change_card_status", Constant.URL_change_card_status, data1);

                            }
                          });

            }

            onGridPress = (name , playerDetail) => {

                 if (name == 'TeamPlayerDetail'){
                   _that.props.navigation.navigate('TeamPlayerDetail' ,{data:playerDetail})
                 }
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

                if (apiKey == 'get_user_card') {
                  if (jsonRes.response == '1')
                  {

                    //teamArr = jsonRes.message
                    this.setState({ _visible: false ,dataSource:ds.cloneWithRows(jsonRes.message)})
                  } else {
                    this.setState({ _visible: false })
                  }
                }else if (apiKey == 'get_user_favcard'){
                  if (jsonRes.response == '1')
                  {
                    //teamArr = jsonRes.message
                    this.setState({ _visible: false ,dataSource:ds.cloneWithRows(jsonRes.message)})
                  } else {
                    this.setState({ _visible: false })
                  }

                }
                else{
                    if (jsonRes.response == '1')
                    {
                      this.setState({ _visible: false ,dataSource:ds.cloneWithRows(jsonRes.message)})

                      this.setState({ _visible: false })
                    } else {
                      this.setState({ _visible: false })
                    }
                }
            }
}
const styles = StyleSheet.create({
          tabsContainerStyle: {
          backgroundColor: 'transparent',
          flexDirection: 'row',
          },
          tabStyle: {
          paddingVertical: 5,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'transparent',
          borderWidth: 1,
          backgroundColor: 'white',
          },
          activeTabStyle: {
          backgroundColor: 'red'
          },
          tabTextStyle: {
          color: 'black'
          },
          activeTabTextStyle: {
          color: 'white'
          },
          tabBadgeContainerStyle: {
          borderRadius: 20,
          backgroundColor: 'red',
          paddingLeft: 5,
          paddingRight: 5,
          marginLeft: 5,
          marginBottom: 3
          },
          activeTabBadgeContainerStyle: {
          backgroundColor: 'white'
          },
          tabBadgeStyle: {
          color: 'white',
          fontSize: 11,
          fontWeight: 'bold'
          },
          activeTabBadgeStyle: {
          color: 'black'
          }
});
