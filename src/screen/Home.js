
import React, { Component } from 'react';
import { Image, Text, View, AsyncStorage, Dimensions, Platform } from "react-native";
import { ListItem } from "react-native-elements";
import { CONF, styles } from './common';

const BG_IMAGE = require('../../assets/img/main-bg.jpg');
const LOGO = require('../../assets/img/logo.png');
const TOPLOGO = require('../../assets/img/home.png');


const subBtnImg = require('../../assets/img/next.png');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SignInScreen extends React.Component {

  state = {
    fontLoaded: false,
    email: '',
    email_valid: true,
    password: '',
    login_failed: false,
    password_valid: true,
    showLoading: false
  };
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  showSchedular = () => {
    this.props.navigation.navigate('schedular');
  }
  showMessageList = () => {
    this.props.navigation.navigate('messageList');
  }
  showMessageArchive = () => {
    this.props.navigation.navigate('messageArchive');
  }
  showProfile = () => {
    this.props.navigation.navigate('profile');
  }
  logout = () => {
    AsyncStorage.clear()
    this.props.navigation.navigate('SignIn');
  }




  render() {
    return (
      <View style={styles.container}>

        <View style={styles.center}>
          <Image
            source={TOPLOGO}
          />
          <Text style={{ fontSize: 16 }}>
            ScheduleInspriration
                    </Text>
        </View>
        <View style={styles.containerStyle} >

          <ListItem
            title="Schedule a message"
            bottomDivider
            onPress={this.showSchedular}
          />
          <ListItem
            title="View/edit scheduled"
            bottomDivider
            onPress={this.showMessageList}

          />
          <ListItem
            title="View archive (sent)"
            bottomDivider
            onPress={this.showMessageArchive}
          />
          <ListItem
            title="Update your profile"
            bottomDivider
            onPress={this.showProfile}
          />
          <ListItem
            title="logout"
            bottomDivider
            onPress={this.logout}
          />



        </View>
        <View style={styles.right}>
          <Image
            source={LOGO}
            style={{ width: 50, height: 50 }}
          />
        </View>

      </View >
    );
  }

}
export default SignInScreen;

