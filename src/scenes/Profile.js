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
    Picker
} from 'react-native';
import CheckBox from 'react-native-check-box'
import Spinner from 'react-native-loading-spinner-overlay';
import { AppStyles, AppSizes, AppColors } from '../themes/'
import Buttons, { LoginButton, Button2 } from "../components/Buttons";
const EmailIdImage = require('../themes/Images/user.png');
const password_icon = require('../themes/Images/password.png');
const Logo = require('../themes/Images/logo.png');
const check_icon = require('../themes/Images/check.png')
const uncheck_icon = require('../themes/Images/uncheck.png')
import ModalDropdown from 'react-native-modal-dropdown';
import CallHistory from 'react-native-call-history';
import * as commonFunctions from '../utils/CommonFunctions'
var Constant = require('../api/WebInteractor').Constant;
var WebServices = require('../api/WebInteractor').WebServices;
var _that;
class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _userID: '',
            _name: '',
            _phonenumber: '',
            _visible: false,
            _address: '',
            _sufferingFrom: '',
            _sufferingId: '',
        },
            _that = this
    }
    /*
    _showModalLoadingSpinnerOverLay = () => {
        this._modalLoadingSpinnerOverLay.show()
        //simulate http request
        this.setTimeout(() => {
            this._modalLoadingSpinnerOverLay.hide()
        }, 3000)
    }*/
    componentDidMount() {
/*
        setTimeout(function () {
            AsyncStorage.getItem('UserData')
                .then((res) => {
                    if (res) {
                        const { _userID, _sufferingId, _name, _phonenumber, _visible, _address, _sufferingFrom } = _that.state
                        var data = JSON.parse(res)
                        _that.setState({
                            _userID: data._userID,
                            _phonenumber: data.PhoneNo,
                            _name: data.UserName,
                            _sufferingFrom: data.SufferingFrom,
                            _address: data.Address,
                            _sufferingId: data.SufferingID
                        })
                    }
                });

        }, 1000)*/
        // CallHistory.list(
        //     (history) => {
        //         AsyncStorage.setItem("callHistory", history);
        //     },
        //     (error) => {
        //         console.warn(error);
        //     }
        // );
    }


    render() {

        return (
          

        )
    }

    /**
     * LogIn click functionality
     */



    Submit = () => {
        const { _sufferingId, _userID, _name, _phonenumber, _visible, _address, _sufferingFrom } = this.state

        // Loader show
        this.setState({ _visible: true })

        /**
         *  Form  Validations
         */

        if (_name == "") {
            this.setState({ _visible: false })
            commonFunctions.message('Please enter the user name');
        } else if (_phonenumber == "") {
            this.setState({ _visible: false })
            commonFunctions.message('Please enter a password!');
        } else {

            AsyncStorage.getItem('UserData')
                .then((res) => {
                    if (res) {
                        var res = JSON.parse(res)
                        var data = {
                            "UserID": res.UserID,
                            "UserName": _name,
                            "PhoneNo": _phonenumber,
                            "Address": _address,
                            "SufferingId": _sufferingId,
                            "SufferingFrom": "sample string 5"
                        }
                        this.PostToApiCalling('POST', 'UpdateProfile', Constant.URL_Update_Profile, data);
                    }
                });
        }
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


    PostToApiCalling(method, apiKey, apiUrl, data) {
        new Promise(function (resolve, reject) {
            if (method == 'POST') {
                resolve(WebServices.callWebService(apiUrl, data));
            } else {
                resolve(WebServices.callWebService_GET(apiUrl, data));
            }
        }).then((jsonRes) => {

            if ((!jsonRes) || (jsonRes.Status != 200)) {
                //  commonFunctions.message(jsonRes.Message)
                this.setState({ _visible: false })
            } else {
                if (jsonRes.Status == 200) {
                    console.log(jsonRes)
                    this.setState({ _visible: false })
                    _that.apiSuccessfullResponse(apiKey, jsonRes)
                }
            }
        }).catch((error) => {
            console.log("ERROR" + error);
        });
    }



    apiSuccessfullResponse(apiKey, jsonRes) {
        const { _email, _password, _isRemember } = this.state
        if (apiKey == 'UpdateProfile') {
            var jsonResponse = jsonRes.ResponsePacket;
            commonFunctions.message(jsonRes.Message)
        }
    }

}




export default Profile
