import React, { Component } from 'react';
import { WebView,ImageBackground,View,Alert } from 'react-native';
import { AppStyles, AppSizes, AppColors } from '../themes/'

var _that ;
import Spinner from 'react-native-loading-spinner-overlay';
var login_bg = require('../themes/Images/home_3.png')
export default class Web extends Component{ 
  constructor(props) {
    super(props);
    this.state = {
        _url: this.props.navigation.state.params.data,
        visible:false
    },
    _that = this;
  }
  _showModalLoadingSpinnerOverLay = () => {
      this._modalLoadingSpinnerOverLay.show()
      //simulate http request
      this.setTimeout(() => {
          this._modalLoadingSpinnerOverLay.hide()
      }, 3000)
  }


  componentWillMount(){
    if (_that.state._url == "AboutUs"){
       //_that.props.navigation.navigationOptions: {headerTitle:'AboutUs'}
      _that.setState({ _url: "https://crusaders.co.nz/about-us" })
    }else if (_that.state._url == "News"){
      //_that.props.navigation.headerTitle("News")
      _that.setState({ _url: "https://crusaders.co.nz/news" })
    }else if (_that.state._url == "Tickets"){
      //_that.props.navigation.headerTitle("Tickets")
      _that.setState({ _url: "https://www.ticketrocket.co.nz/crusaders" })
    }else if (_that.state._url ==  "Match"){
      _that.setState({ _url: "https://crusaders.co.nz/" })
    }else if(_that.state._url ==  "GAME_DAY"){
      _that.setState({ _url: "https://crusaders.co.nz/game-day-info" })
    }else if (_that.state._url ==  "Shop"){
      _that.setState({ _url: "https://shop.crusaders.co.nz/" })
    }

  }

  render() {
    const {visible} = this.state
    return (
      <View  >
        <ImageBackground source={login_bg} style={{ width: AppSizes.screen.width, height: AppSizes.screen.height}} >
          <WebView
            source={{uri: _that.state._url}}
            style={{marginTop: 70 , flex : 1 , marginLeft : 5 , marginBottom : 5 , width : AppSizes.screen.width - 10}}
            onLoadStart={()=>this.setState({visible:true})}
            onLoad={()=>this.setState({visible:false})}
          />
          <Spinner visible={visible} textContent={"Loading..."} textStyle={{ color: '#FFF' }} />
        </ImageBackground>
      </View>
    );
  }


}
