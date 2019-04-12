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
        AsyncStorage,
      Alert} from 'react-native';
import { AppStyles, AppSizes, AppColors } from '../themes/'
var login_bg = require('../themes/Images/home_3.png')
const img1 = require('../themes/Images/home_3.png')
const img2 = require('../themes/Images/u.png')
import Spinner from 'react-native-loading-spinner-overlay';
import * as commonFunctions from '../utils/CommonFunctions'
var Constant = require('../api/WebInteractor').Constant;
var WebServices = require('../api/WebInteractor').WebServices;
var _that ;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const list_data = [
  {
    name: 'test1',
    image: img1,
    position: 'Opponent team name : test',
    date: 'Date of match : 20/12/2017',
    physical:'Score earned : 225',
  },
  {
    name: 'test2',
    image: img2,
    position: 'Opponent team name : test',
    date: 'Date of match : 20/12/2017',
    physical:'Score earned : 225',
  },
  {
    name: 'test3',
    image: img1,
    position: 'Opponent team name : test',
    date: 'Date of match : 20/12/2017',
    physical:'Score earned : 225',
  },
  {
    name: 'test4',
    image: img2,
    position: 'Opponent team name : test',
    date: 'Date of match : 20/12/2017',
    physical:'Score earned : 225',
  },
  {
    name: 'test5',
    image: img1,
    position: 'Opponent team name : test',
    date: 'Date of match : 20/12/2017',
    physical:'Score earned : 225',
  },
]


export default class MatchList extends Component {
constructor() {
    super();
    var arrImages = [];
    this.state = {
        _visible: false,
        dataSource:ds.cloneWithRows(arrImages),
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
        const {  _visible } = this.state
        // Loader show
        AsyncStorage.getItem('userModel')
        .then((res) => {
            if (res) {
                var data = JSON.parse(res)
                this.setState({ _visible: true })
                this.PostToApiCalling("GET", "get_match_list", Constant.URL_get_match_list,data);
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
            <View style={{flex:1 ,marginTop:70}}>
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
  renderRow(data){
    return (
      <View>
          <TouchableOpacity  activeOpacity={.8} onPress={_that.onGridPress.bind(_that,'TeamPlayerDetail' , data)} >
            <View>
                <View style={{flexDirection:'column'}}>
                     <View style={{marginTop : 0 , flex : 1 , flexDirection : 'row' ,height : 100 , width : Dimensions.get('window').width ,}}>
                            <View style={{flexDirection:'column' , marginLeft : 20}}>
                              <Text style={{color : 'white' ,fontSize: 20,fontWeight: 'bold', }}>{data.match}</Text>
                              <Text style={{color : '#A1A9B7' }}>{"Opponent :" + data.opponent_summary.name}</Text>
                              <Text style={{color : '#A1A9B7' }}>{"Date :" + data.date + ' | '+ data.time}</Text>
                              <Text style={{color : '#A1A9B7' }}>{"Score :" + data.score}</Text>
                              <Text style={{color : '#A1A9B7' }}>{"Venue :" + data.venue}</Text>
                            </View>
                      </View>
                  </View>
              </View>
           </TouchableOpacity>
       </View>
   )
  }
  //E1B870

  onGridPress = (name , matchDetail) => {
       if (name == 'TeamPlayerDetail'){
         _that.props.navigation.navigate('MatchListDetail' , {data : matchDetail})
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

      if (apiKey == 'get_match_list') {
        if (jsonRes.response == '1')
        {
          //teamArr = jsonRes.message
          this.setState({ _visible: false ,dataSource:ds.cloneWithRows(jsonRes.message.matchdata)})
        } else {
          this.setState({ _visible: false })
        }
      }
  }
}
