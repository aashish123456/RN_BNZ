import React, { Component } from 'react';
import {Platform,AsyncStorage} from 'react-native';
import {withNavigation,NavigationActions} from 'react-navigation';
import firebase from 'react-native-firebase';

import * as commonFunctions from '../utils/CommonFunctions'
var Constant = require('../api/WebInteractor').Constant;
var WebServices = require('../api/WebInteractor').WebServices;
class Notification extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    componentDidMount(){
        //this.getInitialNotification()
        this.setUpNotificationConfiguration()
    }

    render(){
        return null
    }

    componentWillUnmount(){
    }

    getInitialNotification=async()=>{
        try{
            const notif = await firebase.notifications().getInitialNotification()
            if(notif && notif.notification){
                firebase.notifications().setBadge(0)
                console.log("notification data"+JSON.stringify(notif.notification.data))
                if(notif.notification.data.notification_type=="logout"){
                    this.logoutApiCalled(notif.notification.data.user_id)
                }
                else if(notif.notification.data.notification_type=="manual_notification"){
                    commonFunctions.message(notif.notification.data.description + '\n' + notif.notification.data.message);
                } 
                else{
                    this.navigateToScreen(notif.notification)
                }           
            }            
        }catch(e){
            console.log("error in getting initial notification"+JSON.stringify(e.message))
        }       
    }

    setUpNotificationConfiguration=()=>{
         this.requestNotifPermissionIOS()
         this.registerForRemoteNotificationsIOS()
         this.refreshTokenListener = firebase.messaging().onTokenRefresh((token)=>this.onRefreshToken(token))
         this.getDeviceToken()
         this.notifForegroundListener = firebase.notifications().onNotification((notif)=>this.onNotificationReceivedInForeground(notif))
         this.onNotificationTappedListenter = firebase.notifications().onNotificationOpened((notif)=>this.onNotificationOpened(notif))
         
    }

    //notification related methods
    requestNotifPermissionIOS=async()=>{
        if(Platform.OS=="ios"){
            try {
                const enabled = await firebase.messaging().hasPermission()
                if(!enabled){
                  const res =   await firebase.messaging().requestPermission()
                  console.log("permissions"+JSON.stringify(res))
                }
                
            } catch (error) {
                console.log("error in notif permissions ios"+JSON.stringify(error.message))
            }
        }
             
    }

    registerForRemoteNotificationsIOS=async()=>{
        try {
           await firebase.messaging().ios.registerForRemoteNotifications()
           console.log("registerForRemoteNotifications")
        } catch (error) {
            console.log("error in notif permissions ios"+JSON.stringify(error.message))
        }
       
    }

    onNotificationReceivedInBackground=(notif)=>{
    }

    onNotificationOpened=(notif)=>{
        if(notif && notif.notification){
            firebase.notifications().setBadge(0)
            console.log("notification data"+JSON.stringify(notif.notification.data))
            if(notif.notification.data.notification_type=="logout"){
                this.logoutApiCalled(notif.notification.data.user_id)
            }
            else if(notif.notification.data.notification_type=="manual_notification"){
                commonFunctions.message(notif.notification.data.description + '\n' + notif.notification.data.message);
            } 
            else{
                this.navigateToScreen(notif.notification)
            }           
        }       
    }

    onNotificationReceivedInForeground=(notif)=>{
        if(notif){
            firebase.notifications().setBadge(0)
            console.log("notification data"+JSON.stringify(notif.data))
            if(notif.data.notification_type=="logout"){
                this.logoutApiCalled(notif.data.user_id)
            }else if(notif.data.notification_type=="manual_notification"){
                commonFunctions.message(notif.data.description + '\n' + notif.data.message);
            } 
            else{
                this.navigateToScreen(notif)
            }           
        }        
        //alert("notif bundle"+JSON.stringify(notif.data))
    }


    navigateToScreen=(notif)=>{
         const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'ManOfMatchCongrats',params: {
                playerId: notif.data.player_id,
                message: notif.data.message  
            } })],
        });
          this.props.navigation.dispatch(resetAction);
    }


    //token related methods
    getDeviceToken=async()=>{
        try{
            if(Platform.OS=="android"){
                const token = await firebase.messaging().getToken()
                this.storeDeviceToken(token)
            }
            // else{
            //     const token = await firebase.messaging().ios.getAPNSToken()
            //     this.storeDeviceToken(token)
            // }
        }catch(e){
            console.log("error in getting token"+JSON.stringify(e.message))
        }        
    }

    storeDeviceToken=async(token)=>{
        
        try{
            if(token){
                console.log("token>>>>>>>",token)
                await AsyncStorage.setItem("token",token)
            }            
        } catch(e){
            console.log("error in storing token"+JSON.stringify(e))
        }
        
    }

    onRefreshToken=(token)=>{
        this.storeDeviceToken(token)
    }

    //utils method
    singleBtnAlert=(alertTitle,alertMsg,okAction,cancelAction)=>{

    }


    /**
     * Api calling
     */

     logoutApiCalled=(userId)=>{
              let data = new FormData();
              data.append("user_id",userId)
              data.append("logout_type","force")
              this.PostToApiCalling("POST", "logout", Constant.URL_logout, data);
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

          } else {
              if (jsonRes.response == '1') {
                  console.log(jsonRes)
                  this.apiSuccessfullResponse(apiKey, jsonRes)
              }
          }
        }).catch((error) => {
            console.log("ERROR" + error);
        });
    }

    apiSuccessfullResponse(apiKey, jsonRes) {
        if (apiKey == 'logout') {
            commonFunctions.logoutFromSession(this,"You are logged out because you are logged in somewhere else.")
        }
    }
}


export default withNavigation(Notification)