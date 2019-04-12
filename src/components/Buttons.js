import React, { PropTypes } from 'react'
import { TouchableOpacity, Text,Image } from "react-native";
//import style from "./style";

const Buttons = props => {
    const { text, onPress, style } = props;
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

export const ImageButton = props => {
    const { imgSource, onPress, imgStyle, btnStyle } = props;
    return (
        <TouchableOpacity btnStyle = {[{alignItems: 'center',justifyContent: 'center'},btnStyle]} onPress={onPress}>
            <Image source = {imgSource} style = {[{resizeMode:"contain",},imgStyle]}/>
        </TouchableOpacity>
    )
}

export const LoginButton = props => {
    const { text, onPress, style } = props;
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.8} >
            <Text style={style}>{text}</Text>
        </TouchableOpacity>
    )
}

export const Button2 = props => {
    const { text, onPress } = props;
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

export default Buttons


