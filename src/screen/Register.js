import React, { Component } from 'react';

import { ScrollView, TouchableOpacity, Image, Text, View, AsyncStorage, ImageBackground, Dimensions, Platform } from "react-native";
import { Card, Button, FormLabel, FormInput, FormValidationMessage, Input, Icon } from "react-native-elements";
import { CONF, styles, axiosCall } from './common';

const BG_IMAGE = require('../../assets/img/main-bg.jpg');
const LOGO = require('../../assets/img/logo.png');
const subBtnImg = require('../../assets/img/signupbtn.png');
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
    console.log('state-', this.state);
    console.log('prop-', this.props);
  }
  submitLoginCredentials() {
    const { showLoading } = this.state;

    this.setState({
      showLoading: !showLoading
    });
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }
  validatePassword(email) {

    if (email.length < 6) {
      return false;
    }
    return true;

  }
  onEmailChange(email) {

    this.setState({ email });
  }

  onPasswordChange(password) {
    this.setState({ password });
  }
  onButtonPress = async () => {

    const a = await axiosCall();
    const data = {
      fname: this.state.fname, lname: this.state.lname,
      //phone: this.state.phone,
      email: this.state.email,
      id: this.state.id
    }
    a.put('api/message/' + data.id, data).then(res => {
      console.log('response:', res);
      this.setState({
        showLoading: false
      });
    }).catch(error => {
      this.setState({
        showLoading: false,
        error: "No Message found"
      });
      console.log('error', error);
    });

    this.props.navigation.navigate('messageList');
  }
  onForgotPress = () => {
    this.props.navigation.navigate('Forgot');
  }
  onRigsterPress = () => {
    this.props.navigation.navigate('Register');
  }
  render() {
    return (
      <ScrollView >

        {/* <ImageBackground
          source={BG_IMAGE}
          style={styles.bgImage}
        > */}
        <View style={styles.center}>
          <Image
            source={LOGO}
          />
          <Text style={{ fontSize: 16 }}>
            ScheduleInspriration
        </Text>
        </View>
        <View style={styles.containerStyle} >
          <Input
            autoCapitalize="none"
            placeholder="name@example.com"
            label="Email"
            labelStyle={{ marginTop: 16 }}
            value={this.state.email}
            onChangeText={email => this.onEmailChange(email)}
            autoCorrect={false}

            blurOnSubmit={false}
            // placeholderTextColor="black"
            errorStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={this.state.email_valid ? '' : "Please enter a valid email address"}
            keyboardType="email-address"
          />
          <Input
            autoCapitalize="none"
            placeholder="Jane"
            label="First name"
            labelStyle={{ marginTop: 10 }}
            value={this.state.password}
            onChangeText={password => this.onPasswordChange(password)}
            autoCorrect={false}
            //placeholderTextColor="black"
            errorStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={this.state.password_valid ? '' : "Please enter a valid password"}
            keyboardType="default"

          />
          <Input
            autoCapitalize="none"

            placeholder="Smit"
            label="Last name"
            labelStyle={{ marginTop: 10 }}
            value={this.state.password}
            onChangeText={password => this.onPasswordChange(password)}
            autoCorrect={false}
            //placeholderTextColor="black"
            errorStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={this.state.password_valid ? '' : "Please enter a valid password"}
            keyboardType="default"

          />
          <Input
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="******"
            label="Password"
            labelStyle={{ marginTop: 10 }}
            value={this.state.password}
            onChangeText={password => this.onPasswordChange(password)}
            autoCorrect={false}
            //placeholderTextColor="black"
            errorStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={this.state.password_valid ? '' : "Please enter a valid password"}
            keyboardType="default"
          />
          <Input
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="******"
            label="Confirm Password"
            labelStyle={{ marginTop: 10 }}
            value={this.state.password}
            onChangeText={password => this.onPasswordChange(password)}
            autoCorrect={false}
            //placeholderTextColor="black"
            errorStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={this.state.password_valid ? '' : "Please enter a valid password"}
            keyboardType="default"

          />


          <TouchableOpacity style={styles.touchable} onPress={this.onButtonPress}>

            <Image
              source={subBtnImg}
              resizeMode={'contain'}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        {/* </ImageBackground> */}
      </ScrollView>
    );
  }

}
export default SignInScreen;
