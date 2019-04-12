import React, { Component } from 'react';
import {
    View,
    Platform,
    AsyncStorage,
} from 'react-native';
import CheckBox from 'react-native-check-box'
import Spinner from 'react-native-loading-spinner-overlay';
import { AppStyles, AppSizes, AppColors } from '../themes/'
import * as commonFunctions from '../utils/CommonFunctions'

var _that;
class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _email: '',
            _visible: false
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
    componentDidMount() {
        this.setState({ _visible: true })
        setTimeout(function () {
            var data = {
                "isRemember": false
            }
            AsyncStorage.setItem("UserData", JSON.stringify(data))
            _that.setState({ _visible: false })
            _that.props.navigation.navigate('Login')
            commonFunctions.message("Successfully logout")
        }, 300);

    }
    render() {
        return (
            <View >
                <Spinner visible={this.state._visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
            </View>
        )
    }
}


export default Logout