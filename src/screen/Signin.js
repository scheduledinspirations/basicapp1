import React, { Component } from 'react';

import { TouchableOpacity, Image, Text, View, AsyncStorage, ImageBackground, Dimensions, Platform } from "react-native";
import { Card, Button, FormLabel, FormInput, FormValidationMessage, Input, Icon } from "react-native-elements";
import axios from "axios";
import Loader from './common/Loader';

import { CONF, styles, URL, postData } from './common';

const BG_IMAGE = require('../../assets/img/main-bg.jpg');
const LOGO = require('../../assets/img/logo.png');
const subBtnImg = require('../../assets/img/loginBtn.png');

class SignInScreen extends React.Component {

  state = {
    fontLoaded: false,
    email: '',
    email_valid: true,
    password: '',
    login_failed: false,
    password_valid: true,
    showLoading: false,
    error: false
  };
  constructor(props) {
    super(props);

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

    this.setState({
      email: email, error: false,
      email_valid: this.validateEmail(email)
    });
  }
  onPasswordChange(password) {
    this.setState({
      password: password, error: false,
      password_valid: this.validatePassword(password)
    });
  }
  validateAction = () => {
    if (!this.state.email_valid || !this.state.password_valid) return false;
    return true;
  }
  onButtonPress = () => {
    this.setState({
      email_valid: this.validateEmail(this.state.email),
      error: false,
      password_valid: this.validatePassword(this.state.password)
    });
    if (this.validateAction()) {
      this.getLoginToken();
    }

  }
  getLoginToken = () => {
    const formData = new FormData()
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    this.setState({
      showLoading: true
    });
    axios.post(URL + 'api/login', formData)
      .then(res => {
        console.log(res);
        this.setState({
          showLoading: false
        });
        this.signInAsync(res.data.api_key);
      }).catch(error => {
        this.setState({
          showLoading: false,
          error: "Login  Email and password do not match."
        });
      });

  }
  onForgotPress = () => {
    this.props.navigation.navigate('Forgot');
  }
  onRigsterPress = () => {
    this.props.navigation.navigate('Register');
  }
 signInAsync = async (token) => {
    await AsyncStorage.setItem('userToken', token);
    this.props.navigation.navigate('App');
};
  render() {
    return (
      <View style={styles.container}>
        <Loader loading={this.state.showLoading} />
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
            secureTextEntry={true}
            placeholder="******"
            label="Password"
            labelStyle={{ marginTop: 16 }}
            value={this.state.password}
            onChangeText={password => this.onPasswordChange(password)}
            autoCorrect={false}
            //placeholderTextColor="black"
            errorStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={this.state.password_valid ? '' : "Please enter a valid password"}
            keyboardType="default"

          />

          <TouchableOpacity style={styles.right} onPress={this.onForgotPress}>

            <Text style={[styles.text, { padding: 5 }]}>Forgot Password ?</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', fontSize: 12, color: 'red', padding: 5 }}>{this.state.error}</Text>
          <TouchableOpacity style={styles.touchable} onPress={this.onButtonPress}>

            <Image
              source={subBtnImg}
              resizeMode={'contain'}
              style={styles.image}
            />


          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable} onPress={this.onRigsterPress}>

            <Text style={[styles.text, { padding: 10 }]}>Need an account <Text style={{ fontWeight: 'bold' }}>? Signup here.</Text>
            </Text>


          </TouchableOpacity>

        </View>
        <View style={styles.right}>
          {/* <Image
            source={LOGO}
            style={{ width: 50, height: 50 }}
          /> */}
        </View>
        {/* </ImageBackground> */}
      </View>
    );
  }
}
export default SignInScreen;

