/**
 * Created by rishi paliwal on 6 nov 2017
 * Global function   
*/

import React, { Component } from 'react';
import {
    Alert,
    AsyncStorage,
} from 'react-native';
import {NavigationActions} from 'react-navigation';
/*
    This is use for Email validation
*/
export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

/*
    This is use for alert messaging
*/
export function message(msg) {
    return Alert.alert(msg)
}



export function logoutFromSession(context,message){
    Alert.alert(
        "BNZCrusaders",
        (message)?message:"You are logged out.",
        [
            { text: 'OK', },
        ],
        { cancelable: false }
    )
    AsyncStorage.removeItem("userModel");
    AsyncStorage.removeItem("token");
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })],
      });
      context.props.navigation.dispatch(resetAction);
}



/*
    This is use for Email validation
*/
export function fetchInterestIDFromArray(arr) {
    var arrIntrstIDs = []
    arr.map(function (datas, indexs) {
        arrIntrstIDs.push(datas.InterestID + 1)
    })
    //output like ['1', '2','3']
    return arrIntrstIDs
}



/*
    This is use for Email validation
*/
export function repeatedOn(sun, mon, tue, wed, thur, fri, sat) {
    var arr = []
    if (sun) {
        arr.push(' Sunday')
    }
    if (mon) {
        arr.push(' Monday')
    }
    if (tue) {
        arr.push(' Tuesday')
    }
    if (wed) {
        arr.push(' Wednesday')
    }
    if (thur) {
        arr.push(' Thursday')
    }
    if (fri) {
        arr.push(' Friday')
    }
    if (sat) {
        arr.push(' Saturday')
    }
    return arr
}



/*
    This is use for Email validation
*/
export function dateFormat_Date(dateInput) {
    var dateFormat = new Date(dateInput).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).split(' ').join(' ');

    return dateFormat
}