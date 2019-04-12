/**
 *  Please find react-native-signature-capture on below url
 *  https://github.com/RepairShopr/react-native-signature-capture
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    TouchableHighlight
} from 'react-native';

const image_icon1 = require('../themes/Images/img1.png')
const image_icon2 = require('../themes/Images/img2.png')
const image_icon3 = require('../themes/Images/img3.png')
const image_icon4 = require('../themes/Images/img4.png')
const image_icon5 = require('../themes/Images/img5.png')
const image_icon6 = require('../themes/Images/img6.png')
const close_red_icon = require('../themes/Images/close_red.png')
import SignatureCapture from 'react-native-signature-capture';
var _that;
var ImagePicker = require('react-native-image-picker');
var { height, width } = Dimensions.get('window');

class ImageGrid extends React.Component {
    constructor(props) {
        super(props)
        _that = this;
        this.state = {
            /// gallery image 
            avatarSource1: image_icon6,
            avatarSource2: image_icon6,
            avatarSource3: image_icon6,
            avatarSource4: image_icon6,
            avatarSource5: image_icon6,
            avatarSource6: image_icon6,
            /// close icon
            _closeIcon1: null,
            _closeIcon2: null,
            _closeIcon3: null,
            _closeIcon4: null,
            _closeIcon5: null,
            _closeIcon6: null,
        }
    }
    static navigationOptions = {
        drawerLabel: 'Messages'
    };
    render() {
        return (
            <ScrollView style={{

            }}>
                <View style={{ flex: 1, flexDirection: "column" }}>
                    <Text style={{ alignItems: "center", justifyContent: "center" }}>Signature Capture Extended </Text>
                    <SignatureCapture
                        style={[{ flex: 1 }, styles.signature]}
                        ref="sign"
                        onSaveEvent={this._onSaveEvent}
                        onDragEvent={this._onDragEvent}
                        saveImageFileInExtStorage={false}
                        showNativeButtons={false}
                        showTitleLabel={false}
                        viewMode={"portrait"} />

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <TouchableHighlight style={styles.buttonStyle}
                            onPress={() => { this.saveSign() }} >
                            <Text>Save</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={styles.buttonStyle}
                            onPress={() => { this.resetSign() }} >
                            <Text>Reset</Text>
                        </TouchableHighlight>

                    </View>

                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 10
                }}>
                    <Images
                        source={_that.state.avatarSource1}
                        onPress={() => image_Picker(1)} />
                    <TouchableOpacity
                        onPress={() => click_closeIcon(1)}
                        activeOpacity={.8}
                        style={styles.close_icon_left} >
                        {(_that.state._closeIcon1) ? <Image source={_that.state._closeIcon1} /> : null}
                    </TouchableOpacity>
                    <Images
                        source={_that.state.avatarSource2}
                        onPress={() => image_Picker(2)} />
                    <TouchableOpacity
                        onPress={() => click_closeIcon(2)}
                        activeOpacity={.8}
                        style={styles.close_icon_right}>
                        {(_that.state._closeIcon2) ? <Image source={_that.state._closeIcon2} /> : null}
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 10
                }}>
                    <Images
                        source={_that.state.avatarSource3}
                        onPress={() => image_Picker(3)} />
                    <TouchableOpacity
                        onPress={() => click_closeIcon(3)}
                        activeOpacity={.8}
                        style={styles.close_icon_left}>
                        {(_that.state._closeIcon3) ? <Image source={_that.state._closeIcon3} /> : null}
                    </TouchableOpacity>
                    <Images
                        source={_that.state.avatarSource4}
                        onPress={() => image_Picker(4)} />
                    <TouchableOpacity
                        onPress={() => click_closeIcon(4)}
                        activeOpacity={.8}
                        style={styles.close_icon_right}>
                        {(_that.state._closeIcon4) ? <Image source={_that.state._closeIcon4} /> : null}
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 10
                }}>
                    <Images
                        source={_that.state.avatarSource5}
                        onPress={() => image_Picker(5)} />
                    <TouchableOpacity
                        onPress={() => click_closeIcon(5)}
                        activeOpacity={.8}
                        style={styles.close_icon_left}>
                        {(_that.state._closeIcon5) ? <Image source={_that.state._closeIcon5} /> : null}
                    </TouchableOpacity>
                    <Images
                        source={_that.state.avatarSource6}
                        onPress={() => image_Picker(6)} />
                    <TouchableOpacity
                        onPress={() => click_closeIcon(6)}
                        activeOpacity={.8}
                        style={styles.close_icon_right}  >
                        {(_that.state._closeIcon6) ? <Image source={_that.state._closeIcon6} /> : null}
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => click_Save()}
                        activeOpacity={.8}
                        style={styles.button} >
                        <Text style={{ color: '#fff' }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}


saveSign = () => {
    _that.refs["sign"].saveImage();
}

resetSign = () => {
    _that.refs["sign"].resetImage();
}

_onSaveEvent = (result) => {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    console.log(result);
}
_onDragEvent = () => {
    // This callback will be called when the user enters signature
    console.log("dragged");
}


/**
 * save all 6 images click on save button
 */
click_Save = () => {
    alert(_that.state.avatarSource1.uri)
    //_that.state.avatarSource2.uri
    //_that.state.avatarSource3.uri
    //_that.state.avatarSource4.uri
    //_that.state.avatarSource5.uri
    //_that.state.avatarSource6.uri
}


/**
 * Image custom component for image grid view
 * @param {*} props
 */


const Images = props => {
    const { source, onPress, style } = props;
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.8} >
            <Image source={source} style={{ width: width / 2 - 25, height: 160, marginRight: 10, borderRadius: 10 }} />
        </TouchableOpacity>
    )
}
/**
 * Tap on close icon for delete  selected an image
 */

click_closeIcon = (_id) => {
    switch (_id) {
        case 1:
            return (
                _that.setState({
                    avatarSource1: image_icon6,
                    _closeIcon1: null
                })
            );
        case 2:
            return (
                _that.setState({
                    avatarSource2: image_icon6,
                    _closeIcon2: null
                })
            );
        case 3:
            return (
                _that.setState({
                    avatarSource3: image_icon6,
                    _closeIcon3: null
                })
            );
        case 4:
            return (
                _that.setState({
                    avatarSource4: image_icon6,
                    _closeIcon4: null
                })
            );
        case 5:
            return (
                _that.setState({
                    avatarSource5: image_icon6,
                    _closeIcon5: null
                })
            );
        case 6:
            return (
                _that.setState({
                    avatarSource6: image_icon6,
                    _closeIcon6: null
                })
            );
    }
}
/**
 * Tap on image for selecting an image
 */

image_Picker = (avatarSource) => {
    // More info on all the options is below in the README...just some common use cases shown here
    const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
    };

    ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) { }
        else if (response.error) { }
        else if (response.customButton) { }
        else {
            let source = { uri: response.uri };
            // You can also display the image using data:
            // let source = {uri: 'data:image/jpeg;base64,' + response.data };
            switch (avatarSource) {
                case 1:
                    return (
                        _that.setState({
                            avatarSource1: source,
                            _closeIcon1: close_red_icon
                        })
                    );
                case 2:
                    return (
                        _that.setState({
                            avatarSource2: source,
                            _closeIcon2: close_red_icon
                        })
                    );
                case 3:
                    return (
                        _that.setState({
                            avatarSource3: source,
                            _closeIcon3: close_red_icon
                        })
                    );
                case 4:
                    return (
                        _that.setState({
                            avatarSource4: source,
                            _closeIcon4: close_red_icon,
                        })
                    );
                case 5:
                    return (
                        _that.setState({
                            avatarSource5: source,
                            _closeIcon5: close_red_icon
                        })
                    );
                case 6:
                    return (
                        _that.setState({
                            avatarSource6: source,
                            _closeIcon6: close_red_icon
                        })
                    );
                default:

            }
        }
    });
}


export default ImageGrid

const styles = StyleSheet.create({
    close_icon_left: {
        position: 'absolute', left: width / 2 - 30, top: -5
    },
    close_icon_right: {
        position: 'absolute', left: width - 40, top: -5
    },
    button: {
        backgroundColor: '#467702',
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        paddingTop: 13,
        borderRadius: 4,
        width: width - 50,
        borderBottomWidth: 5,
    }

});
