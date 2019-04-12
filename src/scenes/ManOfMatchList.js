import React, { Component } from 'react';
import {FlatList,
    StyleSheet,
    Text,
    View,
    Keyboard,
    TouchableHighlight,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    Platform,
     Alert,
     AsyncStorage,
     Image
    } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

import { AppStyles, AppSizes, AppColors } from '../themes/'
import {ImageButton , LoginButton} from '../components/Buttons';
var bgImg_match_list = require('../themes/Images/bgImg_match_list.png')
import * as commonFunctions from '../utils/CommonFunctions'
var Constant = require('../api/WebInteractor').Constant;
var WebServices = require('../api/WebInteractor').WebServices;
import MatchModel from '../Models/MatchModel';
var refresh_icon = require('../themes/Images/refresh_icon.png')
const hyundai_logoImg = require("../themes/Images/hyundai_logoImg.png")
const hyundai_icon = require("../themes/Images/hyundai_icon.png")
const clubrooms_icon = require("../themes/Images/clubrooms.png")

var that;
export default class ManOfMatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        visible: false,
        dataSource:[],
    };
    that = this
  }
  static navigationOptions=({navigation})=>({
      headerRight:<ImageButton imgSource={refresh_icon} imgStyle = {{width:25,height:25,tintColor:AppColors.white}} onPress={()=>that.getMatchList()}/>
  })
  componentDidMount() {
    this.getMatchList()
}
/*
<FlatList
  data={dataSource}
  renderItem={this.renderRow}
 />
 */
  render() {
    const {visible} = this.state
    return (
        <View>
        <ImageBackground source={bgImg_match_list}  style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
            <View style={{flex:1 ,marginTop:(Platform.OS=="android")?55:70}}>
              {this.renderHeaderView()}
              {this.renderInstructionText()}
              {this.renderCenterButtonView()}
              {this.renderBottomView()}
            </View>
            <Spinner visible={visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
          </ImageBackground>
        </View>
    );
  }

  renderHeaderView=()=>{
      return(
        <View style = {styles.headerContStyle}>
            <View>
                <Text style = {{color:AppColors.white,fontSize:20,fontWeight:"600",alignSelf:"center"}}>Gary Cockram</Text>
                <View style = {{flexDirection:"row",alignItems:"center",alignSelf:"center"}}>
                    <Image source = {hyundai_icon} style = {{resizeMode:"contain",width:25,height:25,tintColor:AppColors.white}}/>
                    <Text style = {{color:AppColors.white,fontSize:20,fontWeight:"600",alignSelf:"center"}}>Hyundai</Text>
                </View>
            </View>
            <View style = {{width:0.5,height:100,backgroundColor:AppColors.white}}></View>
            <View>
                <Text style = {{color:AppColors.white,fontSize:27,fontWeight:"bold",alignSelf:"center"}}>MAN</Text>
                <Text style = {{color:AppColors.white,fontSize:17,alignSelf:"center"}}>OF THE</Text>
                <Text style = {{color:AppColors.white,fontSize:18,fontWeight:"bold",alignSelf:"center"}}>MATCH</Text>
            </View>
        </View>
      )
  }

  renderInstructionText=()=>{
      return(
            <Text style = {{color:AppColors.white,fontSize:14,alignSelf:"center",width:"70%",textAlign:"center",marginTop:10}}>
                Voting for the Gary Cockram Man of The Match opens when each BNZ Crusaders game kicks off. When you have decided which player (jersey number) is your Man of The Match, then vote below:
            </Text>
      )
  }

  renderCenterButtonView=()=>{
    const {dataSource} = this.state
    return(
          <View opacity = {(dataSource.length == 0)?0.5:1} style={{width:"80%",alignSelf:"center" }}>
            <LoginButton text={"VOTE NOW!"} disabled={(dataSource.length == 0)?true:false} onPress={()=>this.goToManOfMatchDetailScreen()} style={AppStyles.green_round_button} />
          </View>
    )
  }
  renderBottomView=()=>{
    return(
      <View style = {{flexDirection:"column",alignItems:"center",alignSelf:"center",width:"80%"}}>
      <View style = {{flexDirection:"row"}}>
          <Image source = {clubrooms_icon} style = {{alignSelf:"flex-start",resizeMode:"contain",width:100 ,height:100}}/>
          <Text style = {{color:AppColors.white,fontSize:18,fontWeight:"bold",alignSelf:"center",textAlign:"center",marginTop:10}}>
            Join The Clubrooms
          </Text>
          
      </View>

      <Text style = {{color:AppColors.white,fontSize:13,alignSelf:"center",textAlign:"center"}}>
            Bringing together fans of Canterbury Sport.
As vehicle providers to the Crusaders, Gary Cockram Clubrooms has a focus on Rugby and provides many great opportunities for our members, from ticket giveaways to meeting our Crusaders Ambassadors. visit www.clubrooms.co.nz
      </Text>
          
      </View>
    )
  }

/*  renderRow=({item,index})=>{
    return (
      <View opacity = {(item.button_disabled)?0.5:1} style={{backgroundColor:(item.button_disabled)?AppColors.blurWhite:null}}>
          <TouchableOpacity disabled={item.button_disabled} onPress={()=>this.goToManOfMatchDetailScreen(item,index)}>
            <View>
                <View style={{flexDirection:'column'}}>
                     <View style={{marginTop : 0 , flex : 1 , flexDirection : 'row' ,height : 80 , width : Dimensions.get('window').width ,alignItems:"center"}}>
                            <View style={{flexDirection:'column' , marginLeft : 20}}>
                              <Text style={{color : 'white' ,fontSize: 20,fontWeight: 'bold', }}>{item.match}</Text>
                              <Text style={{color : 'white' }}>{"Date :" + item.date + ' | '+ item.time}</Text>
                              <Text style={{color : 'white' }}>{item.venue}</Text>
                            </View>
                      </View>
                  </View>
              </View>
           </TouchableOpacity>
       </View>
   )
  }*/

  goToManOfMatchDetailScreen=()=>{
    const {dataSource} = this.state
   /* console.log("Match model"+JSON.stringify(item))
    this.props.navigation.navigate("ManOfMatchDetail",{from:"ManOfMatchList",matchModel:item})*/
    if (dataSource.length != 0){
      console.log("Match model"+JSON.stringify(dataSource))
     this.props.navigation.navigate("ManOfMatchDetail",{from:"ManOfMatchList",matchModel:dataSource[0]})
    }
    
  }

  getMatchList=()=>{
    // Loader show
    AsyncStorage.getItem('userModel')
    .then((res) => {
        if (res) {
            var data = JSON.parse(res)
            this.setState({ visible: true })
            this.PostToApiCalling("GET", "get_match_list", Constant.URL_get_match_list,data);
        }
    });
  }

  /*
    Api calling
  */


  PostToApiCalling=(method, apiKey, apiUrl, data)=> {
    new Promise(function (resolve, reject) {
        if (method == 'POST') {
            resolve(WebServices.callWebService(apiUrl, data));
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



apiSuccessfullResponse=(apiKey, jsonRes)=>{

        if (apiKey == 'get_match_list') {
            if (jsonRes.response == '1')
            {
                console.log(JSON.stringify(jsonRes.message.matchdata))
                const arrMatches = []
                jsonRes.message.matchdata.forEach((element,index)=>{
                    let matchObj = new MatchModel(element)
                    if(matchObj.vote_enable){
                        matchObj.button_disabled = false
                        arrMatches.push(matchObj)
                    }else{
                        matchObj.button_disabled = true
                    }
                    //arrMatches.push(matchObj)
                })
                this.setState({ visible: false ,dataSource:arrMatches})
            } else {
                this.setState({ visible: false })
            }
        }
    }

}
const styles = StyleSheet.create({
  textStyle:{
      color:AppColors.white,
      fontSize:15,
      alignSelf:"center"
  },
  headerContStyle:{
      marginTop:5,
      flexDirection:"row",
      justifyContent:"space-evenly",
      alignItems:"center",
  }

});
