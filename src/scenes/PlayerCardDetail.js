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
const BANNER = require('../themes/Images/u.png');
var _that;
class PlayerCardDetail extends Component {
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
            <View style={[AppStyles.container, { backgroundColor: 'black', opacity: 0.9, paddingLeft: AppColors.paddingLeft20, paddingRight: AppColors.paddingRight20 }]}>
                <View style={AppStyles.playercarddetailcrusadercntmain}>
                    <View style={{ flex: 1.3, padding: 10 }} >
                        <Text style={AppStyles.playercarddetailcrusadername}>
                            ISRAEL DAGG {"\n"}
                            <Text style={{ fontSize: 20 }}>FULL BACK/WING</Text>
                        </Text>
                        <View style={AppStyles.lnborder}></View>
                        <View style={AppStyles.playercarddetailcrusadercnt}>
                            <View style={AppStyles.playercarddetailcrusadercntmain}>
                                <View style={AppStyles.playercarddetailcrusadercnttxt} >
                                    <Text style={AppStyles.playercarddetailcrusadertxt}>CRUSADERS</Text>
                                </View>
                                <View style={AppStyles.playercarddetailcrusadercnttxt} >
                                    <Text style={AppStyles.playercarddetailcrusadertxtright}>186</Text>
                                </View>
                            </View>
                        </View>
                        <View style={AppStyles.playercarddetailcrusadercnt}>
                            <View style={AppStyles.playercarddetailcrusadercntmain}>
                                <View style={AppStyles.playercarddetailcrusadercnttxt} >
                                    <Text style={AppStyles.playercarddetailcrusadertxt}>HEIGHT</Text>
                                </View>
                                <View style={AppStyles.playercarddetailcrusadercnttxt} >
                                    <Text style={AppStyles.playercarddetailcrusadertxtright}>189cm</Text>
                                </View>
                            </View>
                        </View>
                        <View style={AppStyles.playercarddetailcrusadercnt}>
                            <View style={AppStyles.playercarddetailcrusadercntmain}>
                                <View style={AppStyles.playercarddetailcrusadercnttxt} >
                                    <Text style={AppStyles.playercarddetailcrusadertxt}>WEIGHT</Text>
                                </View>
                                <View style={AppStyles.playercarddetailcrusadercnttxt} >
                                    <Text style={AppStyles.playercarddetailcrusadertxtright}>96kg</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, padding: 15 }} >
                        <Image source={BANNER} style={AppStyles.playercarddetailcrusaderprofileimg} />
                    </View>
                </View>
                <View style={{ flex: 2, }} >
                    <Text style={AppStyles.playercarddetailcrusaderdetail}>
                        lorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisumlorem lisum
                    </Text>
                </View>
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

export default PlayerCardDetail