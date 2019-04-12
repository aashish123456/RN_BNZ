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
    Platform,
    AsyncStorage,
    ImageBackground,
    BackHandler,
} from 'react-native';

import {AppStyles,AppColors,AppSizes} from '../themes/'
import { FlatGrid } from 'react-native-super-grid';
import Notification from './Notification';

var logo_btImg = require('../themes/Images/logo_bt.png')
var logoImg  = require('../themes/Images/crusaders.png')
var myCardImg = require('../themes/Images/my_card.png')
var teamImg = require('../themes/Images/team.png')
var newsSectionImg = require('../themes/Images/news_section.png')
var draw_resultsImg = require('../themes/Images/draws_results.png')
var get_ticketsImg = require('../themes/Images/get_tickets.png')
var login_bg = require('../themes/Images/bgHome.png')
var profileImg = require('../themes/Images/profileD.png')
var logoutImg = require('../themes/Images/logout.png')
var matchProgrammeImg = require('../themes/Images/match_programme.png')
const hyundai_logoImg = require("../themes/Images/hyundai_logoImg.png")
const gameDay_logoImg = require("../themes/Images/gameDay_logoImg.png")
const hyundai_icon = require("../themes/Images/hyundai_icon.png")
var cart = require('../themes/Images/cart.png')

const HeaderImageView = (props)=>{
  const {sponserImages} = props
  return(
    <View style = {{margin:10,marginBottom:0,marginTop:(Platform.OS=="android")?0:15}}>
        <View style = {{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
          {sponserImages.map((element,index)=>(

            <Image source = {element} style = {[{width:40,height:40,resizeMode:"contain"},(index==0)?{width:50,height:50}:null]}/>
          ))}
      </View>
    </View>
  )
}

const FooterImageView = (props)=>{
  const {sponserImages} = props
  return(
    <View style = {{margin:10,marginTop:0}}>
    <View style = {{flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
          {sponserImages.map((element,index)=>(
            <Image source = {element} style = {[{height:60,width:60,resizeMode:"contain",},(index==0)?{width:40,height:40}:(index==2)?{width:50,height:70}:null]}/>
          ))}
      </View>
    </View>
  )
}
//{screenName:"MyCard",type:"",imgSource:myCardImg,title:"My",content:"Cards"},
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
          gridData:[
            {screenName:"Web",type:"Tickets",imgSource:get_ticketsImg,title:"Get",content:"Tickets"},
            {screenName:"MatchList",type:"",imgSource:draw_resultsImg,title:"Draws &",content:"Results"},
            {screenName:"TheTeam",type:"",imgSource:teamImg,title:"Our",content:"Team"},
            {screenName:"Web",type:"News",imgSource:newsSectionImg,title:"News",content:"Section"},
            {screenName:"Web",type:"Shop",imgSource:cart,title:"Shop",content:"Section"},
            {screenName:"ManOfMatchList",type:"",imgSource:hyundai_logoImg,title:"Vote for",content:"Man of the Match"},
            {screenName:"Web",type:"Match",imgSource:matchProgrammeImg,title:"Match",content:"Programme"},
            {screenName:"Web",type:"GAME_DAY",imgSource:gameDay_logoImg,title:"Game",content:"Day"},
            {screenName:"Web",type:"AboutUs",imgSource:logoImg,title:"About",content:"Crusaders"},
            {screenName:"ProfileScreen",type:"",imgSource:profileImg,title:"My",content:"Profile"},
            
          ],
          arrTopSponserImages:[
            require("../themes/Images/bnz_logoImg.png"),
            require("../themes/Images/cat_logoImg.png"),
            require("../themes/Images/gib_logoImg.png"),
            require("../themes/Images/infor_logoImg.png"),
            require("../themes/Images/2d_logoImg.png")
          ],
          arrBottomSponserImages:[
            require("../themes/Images/adidas_logoImg.png"),
            require("../themes/Images/Monteiths_logoImg.png"),
            require("../themes/Images/Mobil_logoImg.png"),
            require("../themes/Images/place_marker_logoImg.png"),
            require("../themes/Images/Meridian_logoImg.png"),
          ]
        }
    }

    componentDidMount() {
    }


    render() {
      const {gridData,arrTopSponserImages,arrBottomSponserImages} = this.state
        return (
          <ImageBackground source={login_bg} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height,}} opacity={0.82}>
            <HeaderImageView sponserImages = {arrTopSponserImages}/>
           <View style = {{flex:1,margin:10,marginTop:0,marginBottom:15}}>
              <FlatGrid
                  itemDimension={130}
                  items={gridData}
                  renderItem={({ item,index }) => this.renderItem(item,index)}
                  ListFooterComponent={<FooterImageView sponserImages={arrBottomSponserImages}/>}
                />
             </View>
             <Notification/>
            </ImageBackground>
        )
    }

    renderItem=(item,index)=>{
      if(item.title=="Man of"){
        return(
          <TouchableOpacity activeOpacity={.8} onPress={() => this.onItemPressed(item,index)}>
                          <View style={[AppStyles.homeIconImg_cnt,{backgroundColor:AppColors.red,opacity:0.8}]}>
                            <View style={{flex:1,alignItems:"center",justifyContent:"center",marginTop:10}}>
                              <Text style = {{color:AppColors.white,fontSize:15,fontWeight:"bold",alignSelf:"center"}}>Gary Cockram</Text>
                              <View style = {{flexDirection:"row",alignItems:"center",alignSelf:"center"}}>
                                  <Image source = {hyundai_icon} style = {{resizeMode:"contain",width:20,height:20,tintColor:AppColors.white}}/>
                                  <Text style = {{color:AppColors.white,fontSize:15,fontWeight:"bold",alignSelf:"center"}}>Hyundai</Text>
                              </View>
                            </View>
                            <Text style = {{color:'white'}}>{item.title}</Text>
                            <Text style = {AppStyles.homeTextBold}>{item.content}</Text>
                          </View>
          </TouchableOpacity>
        )
      }else{
        return(
          <TouchableOpacity activeOpacity={.8} onPress={() => this.onItemPressed(item,index)}>
                            <View style={[AppStyles.homeIconImg_cnt,{backgroundColor:AppColors.red,opacity:0.8}]}>
                              <Image source = {item.imgSource} style = {[AppStyles.homeIconImg,(item.title=="Game")?{resizeMode:"contain",width:90,height:70}:null]}/>
                              <Text style = {{color:'white'}}>{item.title}</Text>
                              <Text style = {AppStyles.homeTextBold}>{item.content}</Text>
                            </View>
            </TouchableOpacity>
        )
      }
    }


    //on item press
    onItemPressed=(item,index)=>{
      if (item.screenName == 'TheTeam'){
        this.props.navigation.navigate('TheTeam')
      }else if (item.screenName == 'PlayerCard'){
        this.props.navigation.navigate('PlayerCard')
      }else if (item.screenName == 'MatchList'){
        this.props.navigation.navigate('MatchList')
      }else if (item.screenName == 'Web'){
      this.props.navigation.navigate('Web',{data:item.type})
      }else if (item.screenName == 'Profile'){
        this.props.navigation.navigate('Profile')
      }else if (item.screenName == 'MyCard'){
        this.props.navigation.navigate('MyCard')
      }else if (item.screenName == 'ProfileScreen'){
        this.props.navigation.navigate('ProfileScreen')
      }else if(item.screenName == "ManOfMatchList"){
        this.props.navigation.navigate('ManOfMatchList')
      }
    }
}
