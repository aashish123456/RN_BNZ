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
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppStyles, AppSizes, AppColors } from '../themes/'
const BANNER = require('../themes/Images/Screen.png');
var _that;
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        },
            _that = this
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={[AppStyles.container, { backgroundColor: 'black', paddingLeft: AppColors.paddingLeft20, paddingRight: AppColors.paddingRight20 }]}>
                <TouchableHighlight style={{ flex: 1 }} onPress={() => this.onGridPress('NEWS')} >
                    <Image source={BANNER} resizeMode="contain" style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined
                    }} />
                </TouchableHighlight>

                <Spinner visible={this.state._visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
            </View>
        )
    }




    /**
     * Grid_click
     */

    onGridPress = (name) => {
        _that.props.navigation.navigate('PlayerCardDetail')
    }


}

export default Home