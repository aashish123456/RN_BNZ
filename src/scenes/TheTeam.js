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
        BackHandler,
        Alert,
        AsyncStorage,
        Platform,
        Linking
        } from 'react-native';
import { AppStyles, AppSizes, AppColors } from '../themes/'
var login_bg = require('../themes/Images/home_3.png')
const img1 = require('../themes/Images/home_3.png')
const img2 = require('../themes/Images/u.png')
import * as commonFunctions from '../utils/CommonFunctions'
import Spinner from 'react-native-loading-spinner-overlay';
var Constant = require('../api/WebInteractor').Constant;
var WebServices = require('../api/WebInteractor').WebServices;
var _that ;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const teamArr = [];
const list_data = [
  {
    name: 'test1',
    image: img1,
    position: 'Vice President',
    date: '20/12/2017',
    physical:'fit',
  },
  {
    name: 'test2',
    image: img2,
    position: 'Vice President',
    date: '20/12/2017',
    physical:'fit',
  },
  {
    name: 'test3',
    image: img1,
    position: 'Vice President',
    date: '20/12/2017',
    physical:'fit',
  },
  {
    name: 'test4',
    image: img2,
    position: 'Vice President',
    date: '20/12/2017',
    physical:'fit',
  },
  {
    name: 'test5',
    image: img1,
    position: 'Vice President',
    date: '20/12/2017',
    physical:'fit',
  },
]


export default class TheTeam extends Component {
  constructor() {
    super();
    let arrTeam = [];
    this.state = {
        dataSource:ds.cloneWithRows(arrTeam),
         _visible:false
    };


    _that = this;
    _that.onGridPress = _that.onGridPress.bind(_that);
  }
  componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentDidMount() {

/*
    AsyncStorage.getItem('userModel')
        .then((res) => {
            if (res) {
              this.setState({ _visible: true })
                var dataRes = JSON.parse(res)
                let data = new FormData();
                data.append('user_id', dataRes.UserID);
                this.PostToApiCalling("POST", "get_user_team", Constant.URL_get_user_team, data);
            }
        });*/
        AsyncStorage.getItem('userModel')
          .then((res) => {
              if (res) {
                  var data = JSON.parse(res)
                  this.setState({ _visible: true })
                  this.PostToApiCalling("GET", "get_user_team", Constant.URL_get_user_team, data);
              }
          });
  }
  handleBackButtonClick() {
      _that.props.navigation.goBack(null);
      return true;
  }

  render() {
    return (
      <View>
        <ImageBackground source={login_bg} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
            <View style={{flex:1 ,marginTop:(Platform.OS=="android")?55:65,marginBottom:25,}}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                  enableEmptySections={true}
                 />
            </View>
            <Spinner visible={this.state._visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
          </ImageBackground>
        </View>
    );
  }
  renderRow=(data)=>{
    return (
    <View>
        <TouchableOpacity  activeOpacity={.8} onPress={_that.onGridPress.bind(_that,'TeamPlayerDetail' , data)} >
          <View>
              <View style={{flexDirection:'column',paddingBottom:10}}>
                   <View style={{marginTop : (Platform.OS=="android")?0:10 , flex : 1 , flexDirection : 'row' , width : Dimensions.get('window').width ,}}>
                           {
                            Platform.OS === "android"
                            ? <View style={{width :80  , height : 80 ,borderRadius : 40, marginLeft : 10 , borderColor : 'red' ,borderWidth : 1.5,overflow:"hidden" }}>
                               <Image source={{uri:data.image}}  style={{width :120  , height : 120  ,overflow:"hidden", alignSelf: 'center' , alignItems: 'center',resizeMode:"contain"}} />
                              </View>
                            : <View style={{width :80  , height : 80 ,borderRadius : 40, marginLeft : 10 , borderColor : 'red' ,borderWidth : 1.5,overflow:"hidden" }}>
                              <Image source={{uri:data.image}}  style={{width :120  , height : 120  ,overflow:"hidden", alignSelf: 'center' , alignItems: 'center',resizeMode:"contain"}} />
                            </View>
                           }

                          <View style={{flexDirection:'column' , marginLeft : 20,marginRight: 20,}}>
                            <Text style={{color : 'white' ,fontSize: 20,fontWeight: 'bold', }}>{data.name}</Text>
                            <View style = {{flexDirection:"row"}}>
                              <Text style={{color : 'white', }}>{data.Born}</Text>
                              <Text style={{color : 'white',marginLeft:20 }}>{data.Height + ' | '  + data.Weight}</Text>
                            </View>                            
                            <TouchableOpacity style = {{alignItems:"center",alignSelf:"center"}}onPress={()=>this.onUrlPressed(data)}>
                              <View>
                                <Text style={{ width:AppSizes.screen.width-100, alignSelf : 'center',color : 'white' ,color:"#00bfff",}} numberOfLines={3}>{"Click for full profile"}</Text>
                                <View style = {{backgroundColor:"#00bfff",width:115,height:1}}></View>
                              </View>
                                   
                            </TouchableOpacity>
                          </View>
                    </View>
                </View>
            </View>
         </TouchableOpacity>
     </View>
   )
  }

  onUrlPressed=(data)=>{
    const url = data.url
    this.props.navigation.navigate('Web',{data:url})
  }

  onGridPress = (name , playerDetail) => {

       if (name == 'TeamPlayerDetail'){
         //_that.props.navigation.navigate('TeamPlayerDetail' ,{data:playerDetail})
       }
  }

  PostToApiCalling(method, apiKey, apiUrl, data) {
      new Promise(function (resolve, reject) {
          if (method == 'POST') {
              resolve(WebServices.callWebService(apiUrl, data));
          } else {
              resolve(WebServices.callWebService_GET(apiUrl, data));
          }
      }).then((jsonRes) => {

        console.log("json response---- "+jsonRes)
        if(jsonRes && jsonRes.message[0].status == 500){
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

      if (apiKey == 'get_user_team') {
        if (jsonRes.response == '1')
        {
          const tempArr = jsonRes.message[0].card
          console.log("tempArr"+JSON.stringify(tempArr))
          const sortedData = this.sortPlayerListBySurName(tempArr)
          this.setState({ _visible: false ,dataSource:ds.cloneWithRows(sortedData)})
        } else {
          this.setState({ _visible: false })
        }
      }
  }

  filterActivePlayerByJersyNo = (data)=>{
   let tempData = []
   tempData =  data.filter((element)=>{
      return this.checkJerseyNumIsNotEmpty(element)
    })
    return tempData
  }

  sortPlayerListBySurName=(data)=>{
    data.sort((a, b) => {
      const aSurName = this.getLastName(a.name);
      const bSurName = this.getLastName(b.name);
      return aSurName.localeCompare(bSurName);
    })
    return data;
  }

  getLastName = (strName)=>{
      const arr = strName.split(" ");
      const firstName = arr[0];
      const surName = arr[1];
      return surName;
  }
}
