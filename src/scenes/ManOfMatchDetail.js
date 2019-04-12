import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Alert,
    Platform,
    AsyncStorage,
    ImageBackground,
    ScrollView
} from 'react-native';
import CheckBox from 'react-native-check-box'
import Spinner from 'react-native-loading-spinner-overlay';
import { AppStyles, AppSizes, AppColors } from '../themes/'
import Buttons, { LoginButton, Button2 } from "../components/Buttons";
import PlayerModel from '../Models/PlayerModel';


var Constant = require('../api/WebInteractor').Constant;
var WebServices = require('../api/WebInteractor').WebServices;
const window = Dimensions.get("window")
const hyundai_logoImg = require("../themes/Images/hyundai_logoImg.png")
const tshirt_logoImg = require("../themes/Images/t-shirtImg.png")
const hyundai_icon = require("../themes/Images/hyundai_icon.png")
const TShirtLogoButton = (props)=>{
    const {imgSource,text,imgStyle,textStyle,onPress} = props
    return(
        <TouchableOpacity style = {{}} onPress={onPress}>
            <Image source = {imgSource} style = {[{resizeMode:"contain",width:window.width/6,height:window.width/6,position:"absolute"},imgStyle]}/>
            <View style = {{alignItems:"center",justifyContent:"center",width:window.width/6,height:window.width/6}}>
                <Text style = {[{fontSize:16,fontWeight:"bold",color:AppColors.white,marginTop:7},textStyle]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const BlankBoxView = ()=>{
    return(
        <View style = {{width:window.width/7,height:window.width/7}}></View>
    )
}

export default class ManOfMatchDetailScreen extends Component {

    constructor(props) {
      super(props);
      this.state = {
        arrPlayers:[],
        visible: false,
      };
      const {params} = this.props.navigation.state
      this.matchModel = (params.from=="ManOfMatchList")?params.matchModel:null
    }

    componentDidMount(){
        this.getPlayerListApi()
    }

    /*
     {this.renderHeaderView()}
    {this.renderInstructionText()}
    */
    render(){
    const {visible} = this.state
    return(
        <View style={{flex:1}}>
            <ImageBackground source={require('../themes/Images/login_bg.png')} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
                    <View style = {{flex:1,marginTop:25}}>
                        <ScrollView style = {{flex:1,marginBottom:15,marginTop:25}} contentContainerStyle={{}}>
                            {this.renderPlayGroundView()}
                        </ScrollView>
                    </View>
            <Spinner visible={visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
            </ImageBackground>
        </View>

    )
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
                Click on the Crusaders jersey number below to vote for your Gary Cockram Hyundai Man of the Match
            </Text>
      )
  }

  renderPlayGroundView=()=>{
    return(
        <View style = {{flex:1,marginTop:10,marginBottom:15}}>
                            <View style = {{flexDirection:"row",justifyContent:"space-evenly"}}>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"1"} onPress={()=>this.giveVote(1)}/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"2"} onPress={()=>this.giveVote(2)}/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"3"} onPress={()=>this.giveVote(3)}/>
                            </View>
                            <View style = {{flexDirection:"row",justifyContent:"space-evenly",marginTop:10}}>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"6"} onPress={()=>this.giveVote(6)}/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"4"} onPress={()=>this.giveVote(4)}/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"5"} onPress={()=>this.giveVote(5)}/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"7"} onPress={()=>this.giveVote(7)}/>
                            </View>
                            <View style = {{flexDirection:"row",justifyContent:"space-evenly",marginTop:10}}>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"8"} onPress={()=>this.giveVote(8)}/>
                            </View>
                            <View style = {{flexDirection:"row",justifyContent:"space-evenly"}}>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"9"} onPress={()=>this.giveVote(9)}/>
                                <BlankBoxView/>
                                <BlankBoxView/>
                                <BlankBoxView/>
                            </View>
                            <View style = {{flexDirection:"row",justifyContent:"space-evenly"}}>
                                <BlankBoxView/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"10"} onPress={()=>this.giveVote(10)}/>
                                <BlankBoxView/>
                                <BlankBoxView/>
                                <BlankBoxView/>
                            </View>
                            <View style = {{flexDirection:"row",justifyContent:"space-evenly"}}>
                                <BlankBoxView/>
                                <BlankBoxView/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"12"} onPress={()=>this.giveVote(12)}/>
                                <BlankBoxView/>
                                <BlankBoxView/>
                            </View>
                            <View style = {{flexDirection:"row",justifyContent:"space-evenly"}}>
                                <BlankBoxView/>
                                <BlankBoxView/>
                                <BlankBoxView/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"13"} onPress={()=>this.giveVote(13)}/>
                                <BlankBoxView/>
                            </View>
                            <View style = {{flexDirection:"row",justifyContent:"space-evenly"}}>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"11"} onPress={()=>this.giveVote(11)}/>
                                <BlankBoxView/>
                                <BlankBoxView/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"14"} onPress={()=>this.giveVote(14)}/>
                            </View>
                            <View style = {{flexDirection:"row",justifyContent:"space-evenly"}}>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"15"} onPress={()=>this.giveVote(15)}/>
                            </View>
                            <View style = {{flexDirection:"row",justifyContent:"space-evenly",marginTop:10}}>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"16"} onPress={()=>this.giveVote(16)}/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"17"} onPress={()=>this.giveVote(17)}/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"18"} onPress={()=>this.giveVote(18)}/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"19"} onPress={()=>this.giveVote(19)}/>
                            </View>
                            <View style = {{flexDirection:"row",justifyContent:"space-evenly",marginTop:10}}>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"20"} onPress={()=>this.giveVote(20)}/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"21"} onPress={()=>this.giveVote(21)}/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"22"} onPress={()=>this.giveVote(22)}/>
                                <TShirtLogoButton imgSource={tshirt_logoImg} text={"23"} onPress={()=>this.giveVote(23)}/>
                            </View>
        </View>
    )
  }

  giveVote=(jerseyNo)=>{
    let {arrPlayers} = this.state
    const playerModel =  arrPlayers.find((element,index)=>{
        return element.jersyNo === jerseyNo
    })
    if(playerModel){
        console.log("playermodel"+JSON.stringify(playerModel))
        this.votePlayerApiCall(playerModel.playerId)
    }

  }


    /**
     * Api Calling
     */

    getPlayerListApi=()=>{
        // Loader show
        AsyncStorage.getItem('userModel')
        .then((res) => {
            if (res) {
                var data = JSON.parse(res)
                this.setState({ visible: true })
                this.PostToApiCalling("GET", "get_player_list", Constant.URL_get_player_list,data);
            }
        });
    }

    votePlayerApiCall=(playerId)=>{
        // Loader show
        AsyncStorage.getItem('userModel')
        .then((res) => {
            if (res) {
                var userModel = JSON.parse(res)
                const userId = userModel.UserID
                const data = new FormData();
                data.append("userId",userId)
                data.append("matchId",this.matchModel.matchId)
                data.append("playerId",playerId)
                this.setState({ visible: true })
                this.PostToApiCalling("POST", "post_player_vote", Constant.URL_post_player_vote,data);
            }

        });

    }

    PostToApiCalling=(method, apiKey, apiUrl, data)=> {
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

        if (apiKey == 'get_player_list') {
                if (jsonRes.response == '1')
                {
                    console.log(JSON.stringify(jsonRes.message.player_data))
                    const playerData = jsonRes.message.player_data
                    const arrPlayers = []
                    playerData.forEach((element,index)=>{
                        const playerObj = new PlayerModel(element)
                        arrPlayers.push(playerObj)
                    })
                    console.log("arrPlayers"+JSON.stringify(arrPlayers))
                    this.setState({ visible: false ,arrPlayers:arrPlayers})
                } else {
                    this.setState({ visible: false })
                }
            }else if(apiKey == 'post_player_vote'){
                if (jsonRes.response == "1"){
                    this.setState({ visible: false },()=>{
                        setTimeout(()=>{
                            Alert.alert(
                                jsonRes.message.message,
                                "",
                                [
                                    { text: 'OK' },
                                ],
                                { cancelable: false }
                            )
                        },200)
                        this.props.navigation.goBack()
                    })

                }else{
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
