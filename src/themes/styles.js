import React from 'react';
import {
    Dimensions,
    Platform
} from 'react-native';

const { width, height } = Dimensions.get("window");

import Colors from './color';
import Fonts from './fonts';
import Sizes from './sizes';

export default {

    appContainer: {
        backgroundColor: Colors.white
    },

    // parent Container style

    radioButton:{
      fontSize: 13,
      fontFamily: Colors.fontFamilyRegular,
      color:'white',
    },


    container: {
        flex: Colors.flex1,
        flexDirection: Colors.flexDirectioncolumn,
        backgroundColor: Colors.white,
    },
    rounded_button: {

    },
    /**
     * Login file css
     */

    container_space: {
        flex: 1,
        flexDirection: Colors.flexDirectioncolumn,
        justifyContent: Colors.justifyContentcenter,
        alignItems: Colors.alignItemscenter,
        marginLeft: Colors.marginLeft30,
        marginRight: Colors.marginRight30,
        marginBottom: Colors.marginBottom30,
    },
    login_logo_cnt: {
        justifyContent: Colors.justifyContentcenter,
        alignItems: Colors.alignItemscenter,
        flexDirection: Colors.flexDirectionrow
    },

    login_logo: {
        width: width - 150,
        height: 85,
        marginTop:20,
        marginBottom: 0,
        resizeMode: 'contain',
    },

    player_bg:{
      width: width - 20,
      height: 300,
      marginTop:20,
      marginBottom: 0,
      resizeMode: 'contain',
    },

    Input_iconcnt: {
        //flexDirection: Colors.flexDirectionrow,
        alignItems: Colors.alignItemscenter,
        borderColor: Colors.white,
        borderBottomWidth: 1,
        borderRadius: 10,
        height: 80,
        paddingLeft: 50
    },
    /*
    Input_iconcnt: {
        flexDirection: Colors.flexDirectionrow,
        alignItems: Colors.alignItemscenter,
        borderColor: Colors.lightGray_text,
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        marginTop: Colors.marginTop10
    },*/
    InputCnt_icon: {
        backgroundColor: 'rgba(0,0,0,0)',
        color: Colors.white,
        paddingLeft: 3,
        width: Sizes.screen.width,
        marginTop: Colors.marginTop20,
        height: 15,
        alignItems: Colors.alignItemsflexstart
    },
    Input_img: {
        width: 30,
        height: 25,
        marginTop: Colors.marginTop6,
    },

    Inputtxt: {
        flex: Colors.flex6, height: 40
    },
    InputCnt_txt: {
        color: '#fff',
        width: Sizes.screen.width,
        height: (Platform.OS === 'ios') ? 40 : 55,
        fontSize: 18,
        fontFamily: Colors.fontFamilyRegular,
        alignItems: Colors.alignItemsflexstart,
    },
    forgot_txt: {
        color: Colors.red,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: Colors.fontFamilyRegular,
        textAlign: Colors.textAlignleft,
        marginTop: Colors.marginTop15,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    checkBox: {
        flex: Colors.flex1,
        padding: Colors.padding10,

    },
    checkBox_txt: {
        color: Colors.white,
        fontSize: 18
    },
    green_round_button: {
        backgroundColor: Colors.red,
        height: 50,
        marginTop: Colors.marginTop20,
        textAlign: Colors.textAlignCenter,
        color: Colors.white,
        paddingTop: Colors.paddingTop15 - 5,
        borderRadius: 5,
        fontSize: 20,
        fontFamily: Colors.fontFamilyBold,
        overflow: 'hidden'
    },
    signup_txt: {
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 18,
        marginLeft: 5,
        fontFamily: Colors.fontFamilyBold,
        color: Colors.red,
    },
    signup1_txt: {
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 20,
        marginRight: 5,
        color: Colors.white
    },
    Qst: {
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 20,
        color: '#fff'
    },
    /**
     *  Drawer menu file css
     */



    cross_icon: {
        top: 0,
        left: Sizes.screen.width - 100,
        width: 20,
        height: 20
    },
    drawer_bottom_cnt_item: {
        height: Sizes.screen.height / 2 - 95,
        flex: Colors.flex1,
        flexDirection: Colors.flexDirectioncolumn,
        padding: Colors.paddingLeft10,
        marginTop: -10,
        backgroundColor: Colors.primary
    },
    drawer_bottom_item: {
        flexDirection: Colors.flexDirectionrow,
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: 350,
        padding: Colors.padding10,
        marginTop: -10,
        backgroundColor: Colors.primary
    },
    drawer_bottom_profile_icon: {
        width: 100,
        height: 100
    },
    drawer_bottom_setting_icon: {
        position: 'absolute',
        left: 75,
        top: 10,
        width: 35,
        height: 35
    },
    drawer_bottom_txt: {
        color: Colors.white,
        width: 230,
        paddingLeft: Colors.paddingLeft20,
        paddingTop: Colors.paddingTop20
    },
    drawer_icon_calender: {
        width: 55,
        height: 50
    },
    drawer_icon: {
        height: 25,
        width: 25
    },

    /**
     * Home screen
     */

    Grid_btn: {
        borderWidth: 2, borderRadius: 2, marginBottom: 4, height: 40, borderColor: '#fff'
    },
    Grid_text: {
        fontFamily: 'AvenirNext-Heavy',
        fontSize: 22,
        textAlign: 'center', marginTop: 4, color: '#fff'
    },
    banner_img: {
        width: Sizes.width,
        height: 150
    },
    logo_img: {
        width: 100,
        height: 40
    },

    home_cnt: {
      flexDirection: 'row',
      paddingTop:10,
      justifyContent:'space-around',
      //opacity:0.8
  //backgroundColor: 'rgba(52, 52, 52, 0.5)'

    },

    homeIconImg_cnt: {

      width:Sizes.screen.width/2-20,
      height: Sizes.screen.height/3-80,
     justifyContent:'center',
     padding:10
    },

    homeIconImg: {

      width:60,
      height: 60,
      alignSelf:'center',
      marginTop:10
    },

    homeTextBold: {
      fontWeight:'bold',
      color:'white'
    },


    /**
     * playercarddetail
     */

    lnborder: {
        marginTop: 5, marginBottom: 5, height: 2, backgroundColor: 'red'
    },
    playercarddetailcrusadertxt: {
        fontFamily: 'AvenirNext-Heavy', fontSize: 12, color: '#fff', textAlign: 'left'

    },
    playercarddetailcrusadertxtright: {
        fontFamily: 'AvenirNext-Heavy', fontSize: 12, color: '#fff', textAlign: 'right'
    },
    playercarddetailcrusaderprofileimg: {
        width: 200, height: 200, resizeMode: 'contain'
    },
    playercarddetailcrusadercnt: {
        flex: 1, flexDirection: 'column'
    },
    playercarddetailcrusadercnttxt: {
        flex: 1, height: 30
    },
    playercarddetailcrusadercntmain: {
        flex: 1, flexDirection: 'row'
    },
    playercarddetailcrusaderdetail: {
        fontFamily: 'AvenirNext-Heavy', color: 'white', fontSize: 20, marginTop: 40
    },
    playercarddetailcrusadername: {
        color: 'red', fontSize: 35, fontFamily: 'AvenirNext-Heavy',
    }

    /**
     * Home css
     */






};
