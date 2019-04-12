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
    ImageBackground,
  Linking
} from 'react-native';
import { AppStyles, AppSizes, AppColors } from '../themes/'
var login_bg = require('../themes/Images/home_3.png')
const Logo = require('../themes/Images/login_logo.png');
const PlayerBg = require('../themes/Images/player_bg.png');
var _that;
import FlipCard from 'react-native-flip-card'
import Buttons from '../components/Buttons';
class TeamPlayerDetail extends Component <{}> {
    constructor(props) {
        super(props)
        this.state = {
             _playerData: this.props.navigation.state.params.data
           };

    }

    componentDidMount() {

    }


    render() {


        return (
          <View style={{flex:1, flexDirection: 'row'}}>

                           <FlipCard
                                 style={styles.card}
                                 friction={10}
                                 perspective={1000}
                                 flipHorizontal={true}
                                 flipVertical={false}
                                 flip={false}
                                 clickable={true}


                                 onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}>

                                     <View style={styles.face}>

                                        <View style={{flex:1}}>
                                          <ImageBackground source={login_bg} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
                                            <ScrollView style ={{marginTop : 60}}>
                                                 <View style={{flex:1 }}>
                                                    <View style={ {backgroundColor:'transparent' ,flexDirection:'column',flex:1 , justifyContent : 'center'}}>

                                                             <View style={AppStyles.login_logo_cnt }>
                                                                  <Image source={Logo} style={AppStyles.login_logo} />
                                                             </View>
                                                             <TouchableHighlight>
                                                             <View style={AppStyles.login_logo_cnt }>

                                                                 <Image source={PlayerBg} style={AppStyles.player_bg} />
                                                                 <Image source={{uri: this.state._playerData.card.image}} style={{position: 'absolute',top: 40,justifyContent : 'center' , alignSelf : 'center' ,width: 150 ,height: 260,}} />

                                                             </View>
                                                             </TouchableHighlight>

                                                             <Text style={{color : 'white' ,fontSize: 20,fontWeight: 'bold', justifyContent : 'center' , alignSelf : 'center'}}>{this.state._playerData.card.name}</Text>

                                                              <View style={{flex:1,flexDirection:'row'}}>
                                                               <Text style={{color : 'white' ,marginTop : 20, marginLeft : 20 , marginRight : 20}}>{'POSITION : ' +  " "+ this.state._playerData.card.Position}</Text>

                                                              </View>

                                                              <View style={{flex:1,flexDirection:'row'}}>
                                                               <Text style={{color : 'white' ,marginTop : 20, marginLeft : 20 , marginRight : 20}}>{'HEIGHT : ' +  " "+ this.state._playerData.card.Height}</Text>
                                                               <Text style={{color : 'white' ,marginTop : 20,}}>{'WEIGHT : ' +  " "+ this.state._playerData.card.Weight}</Text>
                                                              </View>

                                                              <View style={{flex:1,flexDirection:'row'}}>
                                                               <Text style={{color : 'white' ,marginTop : 20, marginLeft : 20 , marginRight : 20}}>{'BORN : ' +  " "+ this.state._playerData.card.Born}</Text>
                                                              </View>



                                                             <Image source={require('../themes/Images/logo_bt.png')} style={{width:270,height:60,resizeMode:'contain',marginTop:10,marginBottom:50,alignItems:'center',alignSelf:'center'}} />
                                                     </View>
                                                   </View>
                                             </ScrollView >
                                           </ImageBackground>
                                        </View>
                                     </View>


                                     <View style={styles.back}>


                                         <View style={{flex:1}}>
                                           <ImageBackground source={login_bg} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
                                             <ScrollView style ={{marginTop : 60}}>
                                                  <View style={{flex:1 }}>
                                                     <View style={ {backgroundColor:'transparent' ,flexDirection:'column',flex:1 , justifyContent : 'center'}}>

                                                              <View style={AppStyles.login_logo_cnt }>
                                                                  <Image source={{uri: this.state._playerData.card.image}} style={{width: 150,height: 200,}} />
                                                              </View>

                                                              <Text style={{color : 'white' ,fontSize: 20,fontWeight: 'bold', justifyContent : 'center' , alignSelf : 'center' , marginTop : 10}}>{this.state._playerData.card.name}</Text>

                                                              <Text style={{color : 'white' ,marginTop : 20, justifyContent : 'center' , alignSelf : 'center'}}>{this.state._playerData.card.Position}</Text>
                                                               <TouchableHighlight>
                                                                  <View style={{flex : 1, width : AppSizes.screen.width-30  ,backgroundColor: 'rgba(52, 52, 52, 0.8)', justifyContent : 'center' , alignSelf : 'center', marginTop : 20}}>

                                                                  <TouchableHighlight style={{ flex: 1 }} onPress={() => this.props.navigation.navigate('PreviewCode' , {data:this.state._playerData})} >
                                                                    <Image source={{uri: this.state._playerData.card.qr_code}} style={{width:60,height:60,marginTop:10, justifyContent : 'center' , alignSelf : 'center' }} />
                                                                  </TouchableHighlight>
                                                                         <View style={{flex : 1 , flexDirection : 'row'}}>


                                                                             <Text style={{color : 'white' ,fontSize: 15,fontWeight: 'bold', justifyContent : 'flex-start' , alignSelf : 'flex-start' , marginTop : 10 , marginLeft : 10}}>CRUSADER#</Text>

                                                                             <Text style={{color : 'white' ,marginTop : 10 , marginLeft : 10}}>{this.state._playerData.card.Crusader_No}</Text>

                                                                         </View>




                                                                         <View style={{flex : 1 , flexDirection : 'row'}}>
                                                                             <Text style={{color : 'white' ,fontSize: 15,fontWeight: 'bold', justifyContent : 'flex-start' , alignSelf : 'flex-start' , marginTop : 5 , marginLeft : 10}}>PHYSICAL</Text>

                                                                             <Text style={{color : 'white' ,marginTop : 5 , marginLeft : 10}}>{this.state._playerData.card.Weight + " " +this.state._playerData.card.Height }</Text>
                                                                         </View>

                                                                         <View style={{flex : 1 , flexDirection : 'row'}}>
                                                                             <Text style={{color : 'white' ,fontSize: 15,fontWeight: 'bold', justifyContent : 'flex-start' , alignSelf : 'flex-start' , marginTop : 5 , marginLeft : 10}}>SUPER CAPS</Text>

                                                                             <Text style={{color : 'white' ,marginTop : 5 , marginLeft : 10}}>{this.state._playerData.card.Super_Caps}</Text>
                                                                         </View>

                                                                         <View style={{flex : 1 , flexDirection : 'row' }}>
                                                                             <Text style={{color : 'white' ,fontSize: 15,fontWeight: 'bold', justifyContent : 'flex-start' , alignSelf : 'flex-start' , marginTop : 5 , marginLeft : 10}}>DATE OF BIRTH</Text>

                                                                             <Text style={{color : 'white' ,marginTop : 5 , marginLeft : 10}}>{this.state._playerData.card.Born}</Text>
                                                                         </View>

                                                                         <View style={{flex : 1 , flexDirection : 'row'}}>
                                                                             <Text style={{color : 'white' ,fontSize: 15,fontWeight: 'bold', justifyContent : 'flex-start' , alignSelf : 'flex-start' , marginTop : 5 , marginLeft : 10}}>DEBUT</Text>

                                                                             <Text style={{color : 'white' ,marginTop : 5 , marginLeft : 10}}>{this.state._playerData.card.Super_Debut}</Text>
                                                                         </View>



                                                                         <View style={{flex : 1 , flexDirection : 'row'}}>
                                                                             <Text style={{color : 'white' ,fontSize: 15,fontWeight: 'bold', justifyContent : 'flex-start' , alignSelf : 'flex-start' , marginTop : 5 , marginLeft : 10}}>SUPER PONITS</Text>

                                                                             <Text style={{color : 'white' ,marginTop : 5 , marginLeft : 10}}>{this.state._playerData.card.Super_Points}</Text>
                                                                         </View>

                                                                         <View style={{flex : 1 , flexDirection : 'row'}}>
                                                                             <Text style={{color : 'white' ,fontSize: 15,fontWeight: 'bold', justifyContent : 'flex-start' , alignSelf : 'flex-start' , marginTop : 5 , marginLeft : 10}}>PROVINCE</Text>

                                                                             <Text style={{color : 'white' ,marginTop : 5 , marginLeft : 10}}>{this.state._playerData.card.Province}</Text>
                                                                         </View>



                                                                         <View style={{backgroundColor : 'white' ,height : 1, width : AppSizes.screen.width - 50 , justifyContent : 'center' , alignSelf : 'center',marginTop : 10}}></View>
                                                                         <Text style={{ width : AppSizes.screen.width - 50 , justifyContent : 'center' , alignSelf : 'center',color : 'white' , marginTop : 10}}>{this.state._playerData.card.desc}</Text>
                                                                         <TouchableOpacity onPress={()=>this.onUrlPressed()} style = {{height:35,width:"100%"}}>
                                                                              <View>
                                                                                <Text style={{ alignSelf : 'center',color : 'white' ,color:"#00bfff",}} numberOfLines={3}>{"Click for full profile"}</Text>
                                                                                <View style = {{backgroundColor:"#00bfff",width:115,height:1,alignSelf:"center"}}></View>
                                                                              </View>
                                                                         </TouchableOpacity>
                                                                         

                                                                  </View>
                                                              </TouchableHighlight>
                                                              <Image source={require('../themes/Images/logo_bt.png')} style={{width:270,height:60,resizeMode:'contain',marginTop:10,marginBottom:50,alignItems:'center',alignSelf:'center'}} />

                                                      </View>
                                                    </View>
                                              </ScrollView >
                                            </ImageBackground>

                                         </View>

                                     </View>

                             </FlipCard>

               </View>
        )
    }

    onUrlPressed=()=>{
      const {_playerData} = this.state
      const url = _playerData.card.url
      this.props.navigation.navigate('Web',{data:url})
    }



}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 20,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  card: {
    width: AppSizes.screen.width,
    height: AppSizes.screen.height,
  },
  face: {
    width: AppSizes.screen.width,
    height: AppSizes.screen.height,
    justifyContent: 'center',
    alignItems: 'center',

  },
  back: {
    width: AppSizes.screen.width,
    height: AppSizes.screen.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 30,
    marginTop: 30,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: '#007AFF',
    borderColor: 'transparent',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  img: {
    flex: 1,
    height: 64
  }
});



export default TeamPlayerDetail
