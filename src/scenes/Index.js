
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
    Platform,
    View,
    StatusBar,
    AsyncStorage
} from 'react-native';

import {  StackNavigator } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen'
// import Login from './Login';
// import SignUp from './SignUp';
// import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import PlayerCard from './PlayerCard';
import PlayerCardDetail from './PlayerCardDetail'
import TheTeam from './TheTeam'
import TeamPlayerDetail from './TeamPlayerDetail'
import MatchList from './MatchList'
import MatchListDetail from './MatchListDetail'
import Web from './Web'
import MyCard  from './MyCard'
import MySquadMyCards from './MySquadMyCards'
import GetCards from './GetCards'
import InputCode from './InputCode'
import ReferAFriend from './ReferAFriend'
import ProfileScreen from './ProfileScreen'
import congratulation from './congratulation'
import PreviewCode from './PreviewCode'
import ManOfMatchList from './ManOfMatchList';
import ManOfMatchDetail from './ManOfMatchDetail';
import ManOfMatchCongrats from './ManOfMatchCongrats';

//import MyProfile from './MyProfile'
// /import DrawerMenu from './DrawerMenu';

import Buttons, { Button1, Button2 } from "../components/Buttons";
import { SYMBOL } from "../Constants";

var DrawerItemIndex;
const navBarHeight = (Platform.OS=="android")?10:2

// import ImageGrid from './ImageGrid';
click = () => {
    alert(SYMBOL)
}

class Index extends Component {
    constructor(props) {
          super(props);
          this.state={
              isLoggedIn:false
          }
          this.authenticateUser()
    }
    componentDidMount(){
        SplashScreen.hide();
    }
    authenticateUser=()=>{
        AsyncStorage.getItem('userModel')
            .then((res) => {
                if (res) {
                    var data = JSON.parse(res)
                    if (data.UserID > 0) {
                       this.setState({isLoggedIn:true})
                    }
                }
            });
    }
    render() {
        console.disableYellowBox = true
      const { navigation } = this.props;
        return (
            <View style = {{flex:1}}>
                {
                    (this.state.isLoggedIn)?<HomeStack screenProps={navigation}/>:<MainStack screenProps={navigation} />
                }
            </View>
            
        );
    }
}


const MainStack = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    ManOfMatchCongrats: {
        screen: ManOfMatchCongrats,
        navigationOptions: {
            header: null
        }

    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
          headerTitle:'Sign Up',
        headerTintColor:'white',
           headerTitleStyle: { color: 'white' },
           headerStyle: {
             marginTop: navBarHeight,
             backgroundColor: 'transparent',
             position: 'absolute',
             height: 40,
             top: 0,
             left: 0,
             right: 0,
             borderBottomWidth:0
           },
        }

    },
    ManOfMatchDetail: {
        screen: ManOfMatchDetail,
        navigationOptions: {
          headerTitle:' ',
          headerBackTitle:null,
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
             headerTitle:'Forgot Password',
             headerTintColor:'white',
             headerTitleStyle: { color: 'white' },
             headerStyle: {
                   marginTop: navBarHeight,
                   backgroundColor: 'transparent',
                   position: 'absolute',
                   height: 40,
                   top: 0,
                   left: 0,
                   right: 0,
                   borderBottomWidth:0
           },
        }
    },

    Home: {
        screen: Home,
        navigationOptions: {
               header:null
         }
    },
    PlayerCard: {
        screen: PlayerCard,
        navigationOptions: {
            header: null
        }

    },
    PlayerCardDetail: {
        screen: PlayerCardDetail,
        navigationOptions: {
            header: null
        }
    },
    TheTeam: {
        screen: TheTeam,
        navigationOptions: {
          headerTitle:'The Team',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    TeamPlayerDetail: {
        screen: TeamPlayerDetail,
        navigationOptions: {
          headerTitle:'Player Profile',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    MatchList: {
        screen: MatchList,
        navigationOptions: {
          headerTitle:'Match List',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
        }
      }
    },
    MatchListDetail: {
        screen: MatchListDetail,
        navigationOptions: {
          headerTitle:'Match List Detail',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    ManOfMatchList:{
        screen: ManOfMatchList,
        navigationOptions:{
            headerTitle:'Match List Detail',
            headerTintColor:'white',
            headerTitleStyle: { color: 'white' },
            headerTitle:'Match List',
            headerTintColor:'white',
            headerTitleStyle: { color: 'white' },
            headerStyle: {
                marginTop: navBarHeight,
                backgroundColor: 'transparent',
                position: 'absolute',
                height: 40,
                top: 0,
                left: 0,
                right: 0,
                borderBottomWidth:0
            }
        }
    },
    MyCard: {
        screen: MyCard,
        navigationOptions: {
          headerTitle:'My Cards',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    MySquadMyCards: {
        screen: MySquadMyCards,
        navigationOptions: {
          headerTitle:'My Cards',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    GetCards: {
        screen: GetCards,
        navigationOptions: {
          headerTitle:'Get Cards',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    InputCode: {
        screen: InputCode,
        navigationOptions: {
          headerTitle:'Input Digit Code',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    ReferAFriend: {
        screen: ReferAFriend,
        navigationOptions: {
          headerTitle:'Refer A Friend',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    congratulation: {
        screen: congratulation,
        navigationOptions: {
          headerTitle:'Congratulation',
          headerLeft: null,
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
          headerTitle:'Profile',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
             marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    ManOfMatchCongrats: {
        screen: ManOfMatchCongrats,
        navigationOptions: {
            header: null
        }

    },
    PreviewCode: {
        screen: PreviewCode,
        navigationOptions: {
          headerTitle:'Code',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
             marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },


    Web: {
        screen: Web,
        navigationOptions: {
          headerTitle:'',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
             marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },


},{
  defaultNavigationOptions:{
    headerStyle:{
      borderBottomColor:"transparent",
      borderBottomWidth:0
    }
  }
});

const HomeStack = StackNavigator({
      Home: {
        screen: Home,
        navigationOptions: {
              header:null
        }
    },  
      Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    ManOfMatchCongrats: {
        screen: ManOfMatchCongrats,
        navigationOptions: {
            header: null
        }

    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
          headerTitle:'Sign Up',
        headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
            marginTop: navBarHeight,
            backgroundColor: 'transparent',
            position: 'absolute',
            height: 40,
            top: 0,
            left: 0,
            right: 0,
            borderBottomWidth:0
          },
        }

    },
    ManOfMatchDetail: {
        screen: ManOfMatchDetail,
        navigationOptions: {
          headerTitle:'',
          headerBackTitle:null,
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            headerTitle:'Forgot Password',
            headerTintColor:'white',
            headerTitleStyle: { color: 'white' },
            headerStyle: {
                  marginTop: navBarHeight,
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  height: 40,
                  top: 0,
                  left: 0,
                  right: 0,
                  borderBottomWidth:0
          },
        }
    },

    PlayerCard: {
        screen: PlayerCard,
        navigationOptions: {
            header: null
        }

    },
    PlayerCardDetail: {
        screen: PlayerCardDetail,
        navigationOptions: {
            header: null
        }
    },
    TheTeam: {
        screen: TheTeam,
        navigationOptions: {
          headerTitle:'The Team',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    TeamPlayerDetail: {
        screen: TeamPlayerDetail,
        navigationOptions: {
          headerTitle:'Player Profile',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    MatchList: {
        screen: MatchList,
        navigationOptions: {
          headerTitle:'Match List',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
        }
      }
    },
    MatchListDetail: {
        screen: MatchListDetail,
        navigationOptions: {
          headerTitle:'Match List Detail',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    ManOfMatchList:{
        screen: ManOfMatchList,
        navigationOptions:{
            headerTitle:'Match List Detail',
            headerTintColor:'white',
            headerTitleStyle: { color: 'white' },
            headerTitle:'Match List',
            headerTintColor:'white',
            headerTitleStyle: { color: 'white' },
            headerStyle: {
                marginTop: navBarHeight,
                backgroundColor: 'transparent',
                position: 'absolute',
                height: 40,
                top: 0,
                left: 0,
                right: 0,
                borderBottomWidth:0
            }
        }
    },
    MyCard: {
        screen: MyCard,
        navigationOptions: {
          headerTitle:'My Cards',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    MySquadMyCards: {
        screen: MySquadMyCards,
        navigationOptions: {
          headerTitle:'My Cards',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    GetCards: {
        screen: GetCards,
        navigationOptions: {
          headerTitle:'Get Cards',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    InputCode: {
        screen: InputCode,
        navigationOptions: {
          headerTitle:'Input Digit Code',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    ReferAFriend: {
        screen: ReferAFriend,
        navigationOptions: {
          headerTitle:'Refer A Friend',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    congratulation: {
        screen: congratulation,
        navigationOptions: {
          headerTitle:'Congratulation',
          headerLeft: null,
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
              marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
          headerTitle:'Profile',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
            marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
    ManOfMatchCongrats: {
        screen: ManOfMatchCongrats,
        navigationOptions: {
            header: null
        }

    },
    PreviewCode: {
        screen: PreviewCode,
        navigationOptions: {
          headerTitle:'Code',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
            marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },


    Web: {
        screen: Web,
        navigationOptions: {
          headerTitle:'',
          headerTintColor:'white',
          headerTitleStyle: { color: 'white' },
          headerStyle: {
            marginTop: navBarHeight,
              backgroundColor: 'transparent',
              position: 'absolute',
              height: 40,
              top: 0,
              left: 0,
              right: 0,
              borderBottomWidth:0
        }
      }
    },
  
},{
  defaultNavigationOptions:{
  headerStyle:{
  borderBottomColor:"transparent",
  borderBottomWidth:0
  }
}

});

export default Index
