import React, { Component } from 'react';
import {ListView,
        ScrollView,
        Text,
        View,
        Image,
        Keyboard,
        TouchableHighlight,
        Dimensions,
        ImageBackground,
        TouchableOpacity,
        paddingRight,
        paddingLeft,
        StyleSheet,
        Alert} from 'react-native';

import { AppStyles, AppSizes, AppColors } from '../themes/'
import SegmentedControlTab from 'react-native-segmented-control-tab'
var login_bg = require('../themes/Images/home_3.png')
const img1 = require('../themes/Images/home_3.png')
const img2 = require('../themes/Images/u.png')
const Logo = require('../themes/Images/login_logo.png');
const Score = require('../themes/Images/scorc.png');
var _that ;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const list_data = [
  {
    name: 'test1',
    image: img1,
  },
  {
    name: 'test2',
    image: img2,
  },
  {
    name: 'test3',
    image: img1,
  },
  {
    name: 'test4',
    image: img2,
  },
  {
    name: 'test5',
    image: img1,
  },
]


class MatchListDetail extends Component<{}> {
constructor(props) {
    super(props);
    var arrImages = [];
    this.state = {
        selectedIndex: 0,
        _matchData: this.props.navigation.state.params.data,
        playerData: [],
        dataSource:ds.cloneWithRows(this.props.navigation.state.params.data.crusaders_summary),
        summary : this.props.navigation.state.params.data.crusaders_summary.summary,
    };
    _that = this;
    _that.onGridPress = _that.onGridPress.bind(_that);
  }
  handleIndexChange = (index) => {
      this.setState({
        ...this.state,
        selectedIndex: index,
      });

      if (this.state.selectedIndex == 1){
            this.setState({ _visible: false ,summary:this.state._matchData.crusaders_summary.summary , dataSource:ds.cloneWithRows(this.state._matchData.crusaders_summary)});

         //Alert.alert("first")
      }else{
          this.setState({ _visible: false ,summary:this.state._matchData.opponent_summary.summary ,dataSource:ds.cloneWithRows(this.state._matchData.opponent_summary)});
         //Alert.alert("second")
      }
  }

  render() {
    return (
      <View>
        <ImageBackground source={login_bg} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
              <View style = {{flex:1,}} >
                <View style={ { justifyContent: 'space-between', paddingLeft: AppColors.paddingLeft20,paddingRight: AppColors.paddingRight20,backgroundColor:'transparent' ,flexDirection:'column',flex:1,marginTop:70}}>

                      <View style={AppStyles.login_logo_cnt}>
                       <Image source={require('../themes/Images/logo_bt.png')} style={{width:270,height:80,resizeMode:'contain',marginTop:10,alignItems:'center',alignSelf:'center'}} />
                      </View>

                      <View style ={{marginTop : 30 ,flexDirection : 'column'}}>
                        <Text style = {{color : 'white',fontSize : 25,fontWeight : 'bold'}}>{this.state._matchData.match}</Text>
                        <Text style = {{color : 'white',fontSize : 15 , marginTop : 7}}>{"OPPONENT TEAM NAME : " + this.state._matchData.opponent_summary.name}</Text>
                      </View>

                      <View style = {{flexDirection : 'row', marginTop : 10}}>
                        <Image source={Score}/>
                        <Text style = {{color : 'white',fontSize : 15 ,marginLeft : 3}}>{this.state._matchData.score}</Text>
                      </View>

                      <View style = {{flexDirection : 'row', marginTop : 10}}>
                        <Image source={Score}/>
                        <Text style = {{color : 'white',fontSize : 15 ,marginLeft : 3}}>{this.state._matchData.date + ' | ' + this.state._matchData.time}</Text>
                      </View>

                      <View style = {{flexDirection : 'row', marginTop : 10}}>
                        <Image source={Score}/>
                        <Text style = {{color : 'white',fontSize : 15 ,marginLeft : 3}}>{this.state._matchData.venue}</Text>
                      </View>

                      <View style = {{marginTop : 10}}>
                        <SegmentedControlTab tabsContainerStyle={styles.tabsContainerStyle}
                            tabStyle={styles.tabStyle}
                            tabTextStyle={styles.tabTextStyle}
                            activeTabStyle={styles.activeTabStyle}
                            activeTabTextStyle={styles.activeTabTextStyle}
                            selectedIndex={this.state.selectedIndex}
                            values={[this.state._matchData.crusaders_summary.name, this.state._matchData.opponent_summary.name]}
                            //onPress= {index => this.setState({selected:index})}
                            onTabPress={this.handleIndexChange}
                          />
                      </View>

                      <View style={{flex:1 ,marginTop:10}}>
                           <Text style={{color : 'white'}}>{this.state.summary}</Text>
                      </View>
                </View>
              </View>
          </ImageBackground>
        </View>
    );
  }
  renderRow(data){
    return (
    <View>
        <TouchableOpacity  activeOpacity={.8} >
          <View>
              <View style={{flexDirection:'column'}}>
                   <View style={{marginTop : 0 , flex : 1 , flexDirection : 'row' ,height : 100 , width : Dimensions.get('window').width ,}}>
                        <Image source={data.image} style={{width :70  , height : 70 ,borderRadius : 35, marginLeft : 10 , borderColor : 'white' ,borderWidth : 1}} />
                        <Text style={{color : 'white' ,fontSize: 20,fontWeight: 'bold', }}>{data.name}</Text>
                    </View>
                </View>
            </View>
         </TouchableOpacity>
     </View>
   )
  }

  onGridPress = (name) => {
       if (name == 'TeamPlayerDetail'){
         _that.props.navigation.navigate('TeamPlayerDetail')
       }
  }
}
const styles = StyleSheet.create({
      tabsContainerStyle: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      },
      tabStyle: {
        paddingVertical: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'transparent',
        borderWidth: 1,
        backgroundColor: 'white',
      },
      activeTabStyle: {
        backgroundColor: 'red'
      },
      tabTextStyle: {
        color: 'black'
      },
      activeTabTextStyle: {
        color: 'white'
      },
      tabBadgeContainerStyle: {
        borderRadius: 20,
        backgroundColor: 'red',
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 5,
        marginBottom: 3
      },
      activeTabBadgeContainerStyle: {
        backgroundColor: 'white'
      },
      tabBadgeStyle: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold'
      },
      activeTabBadgeStyle: {
        color: 'black'
      }
});
export default MatchListDetail
