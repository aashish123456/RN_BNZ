import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Button,
    Image,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import React from 'react';
import {
    getNavigationOptionsWithAction,
    getDrawerNavigationOptions,
    getDrawerConfig
} from '../utils/navigation';
import NavBarItem from '../components/NavBarItem';
import Profile from './Profile';
import AddContact from './AddContact';
import AddEmergencyContact from './AddEmergencyContact';
import EmergencyContactList from './EmergencyContactList';
import Logout from './Logout';
import ToolBox from './ToolBox';
import MemberList from './MemberList';
import { AppStyles, AppSizes, AppColors } from '../themes/'
const ProfileLogo = require('../themes/Images/menu_logo.png');

/**
 * Drawer Navigation icons
 */

var calendarIcon = require('../themes/Images/profile.png')
var strategy_list_icon = require('../themes/Images/add_contact.png')
var approvals_icon = require('../themes/Images/member_list.png')
var file_manager_icon = require('../themes/Images/add_em_contact.png')
var toolbox_icon = require('../themes/Images/em_contact_list.png')
var logout = require('../themes/Images/logout.png')
var default_user = require('../themes/Images/default-user.png')
var settings_icon = require('../themes/Images/settings.png')
var cross_icon = require('../themes/Images/cross.png')
var dot_menu = require('../themes/Images/dot-menu.png')



const getDrawerItem = navigation => (<NavBarItem iconName={dot_menu}
    onPress={() => {
        (navigation.state.index == 0) ? navigation.navigate('DrawerOpen') : navigation.navigate('DrawerClose')
    }}
/>
);


const crossIcon = ({ tintColor }) => getDrawerIcon('contactus', tintColor, cross_icon);
const calenderDrawerIcon = ({ tintColor }) => getDrawerIcon('dashboard', tintColor, calendarIcon);
const strategyIcon = ({ tintColor }) => getDrawerIcon('inspectionList', tintColor, strategy_list_icon);
const approvalsIcon = ({ tintColor }) => getDrawerIcon('contactDir', tintColor, approvals_icon);
const file_managerIcon = ({ tintColor }) => getDrawerIcon('technicalManual', tintColor, file_manager_icon);
const toolboxIicon = ({ tintColor }) => getDrawerIcon('ppolicy', tintColor, toolbox_icon);
const logoutIcon = ({ tintColor }) => getDrawerIcon('contactus', tintColor, logout);


const crossNavOptions = getDrawerNavigationOptions(' ', "AppColors.primary", 'white', crossIcon);
const clenderNavOptions = getDrawerNavigationOptions('Profile', "AppColors.primary", 'white', calenderDrawerIcon);
const strategyNavOptions = getDrawerNavigationOptions('Add Contact', AppColors.primary, 'white', strategyIcon);
const approvalsNavOptions = getDrawerNavigationOptions('Member List', AppColors.primary, 'white', approvalsIcon);
const filemanagerNavOptions = getDrawerNavigationOptions('Add Emergency Contact', AppColors.primary, 'white', file_managerIcon);
const toolboxNavOptions = getDrawerNavigationOptions('Emergency Contact List', AppColors.primary, 'white', toolboxIicon);
const messageNavOptions = getDrawerNavigationOptions('Logout', AppColors.primary, 'white', logoutIcon);



const LeftDrawer = DrawerNavigator({
    Profile: {
        screen: Profile, navigationOptions: clenderNavOptions
    },
    StrategyScreen: {
        screen: AddContact, navigationOptions: strategyNavOptions
    },
    ApprovalsScreen: {
        screen: MemberList, navigationOptions: approvalsNavOptions
    },
    FlileManagerScreen: {
        screen: AddEmergencyContact, navigationOptions: filemanagerNavOptions
    },
    ToolBoxScreen: {
        screen: EmergencyContactList, navigationOptions: toolboxNavOptions
    },
    Logout: {
        screen: Logout, navigationOptions: messageNavOptions
    },
},
    {
        contentComponent: props => <ScrollView style={{ backgroundColor: '#258652' }}>
            <View style={[AppStyles.login_logo_cnt, { height: 150, backgroundColor: AppColors.primary }]}>
                <Image source={ProfileLogo} style={[AppStyles.login_logo, { width: 120 }]} />
            </View>
            <DrawerItems {...props} />
        </ScrollView>,
        contentOptions: {
            activeBackgroundColor: AppColors.primary,
            inactiveBackgroundColor: AppColors.primary,
            inactiveTintColor: AppColors.white,
            activeTintColor: AppColors.white,
        }
    },
    getDrawerConfig(200, 'left', 'Profile', AppColors.primary));

LeftDrawer.navigationOptions = ({ navigation }) =>

    getNavigationOptionsWithAction(
        ' ',
        AppColors.primary,
        'white',
        getDrawerItem(navigation)
    );

const getDrawerIcon = (iconName, tintColor, imgUrl) => <Image style={AppStyles.drawer_icon} source={imgUrl} />;


export default LeftDrawer;

