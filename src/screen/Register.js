import React, { Component } from 'react';

import { ScrollView, TouchableOpacity, Image, Text, View, AsyncStorage, ImageBackground, Dimensions, Platform } from "react-native";
import { Card, Button, FormLabel, FormInput, FormValidationMessage, Input, Icon } from "react-native-elements";
import { CONF, styles, axiosCall, requiredData } from './common';

const BG_IMAGE = require('../../assets/img/main-bg.jpg');
const LOGO = require('../../assets/img/logo.png');
const subBtnImg = require('../../assets/img/signupbtn.png');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SignInScreen extends React.Component {

  state = {
    fontLoaded: false,
    email: '', email_err: false,
    first_name: '', first_name_err: false,
    last_name: '', last_name_err: false,
    phone: '', phone_err: false,
    password: '', password_err: false,
    cpassword: '', cpassword_err: false,
    showLoading: false
  };
  constructor(props) {
    super(props);
    //console.log('state-', this.state);
    //console.log('prop-', this.props);
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
  onCPasswordChange(cpassword) {
    this.setState({ cpassword });
  }
  handelRespons = async (res) => {
    console.log('response:', res);
    this.setState({
      showLoading: false
    });
    await AsyncStorage.setItem('user_id', res.data.user_id);
    this.props.navigation.navigate('message1');

  }
  onButtonPress = async () => {

    const a = await axiosCall();
    const data = {
      first_name: this.state.first_name, last_name: this.state.last_name,
      password: this.state.password,
      email: this.state.email,
      phone: this.state.phone
    }
    a.post('api/register', data).then(res => this.handelRespons(res)).catch(error => {
      this.setState({
        showLoading: false,
        error: "Error please try again"
      });
      console.dir(error);
    });


  }
  phoneValidate = (x) => {
    this.setState({
      phone: x,
      phone_err: requiredData(x)
    });
  }
  lnameValidate = (x) => {
    this.setState({
      last_name: x,
      last_name_err: requiredData(x)
    });

  }
  fnameValidate = (x) => {
    this.setState({
      first_name: x,
      first_name_err: requiredData(x)
    });

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
            errorMessage={this.state.email_valid ? "Please enter a valid email address" : ''}
            keyboardType="email-address"
          />
          <Input
            autoCapitalize="none"
            placeholder="Jane"
            label="First name"
            labelStyle={{ marginTop: 10 }}
            value={this.state.first_name}
            onChangeText={password => this.fnameValidate(password)}
            autoCorrect={false}
            //placeholderTextColor="black"
            errorStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={this.state.first_name_err ? 'This is required' : ""}
            keyboardType="default"

          />
          <Input
            autoCapitalize="none"

            placeholder="Smit"
            label="Last name"
            labelStyle={{ marginTop: 10 }}
            value={this.state.last_name}
            onChangeText={password => this.lnameValidate(password)}
            autoCorrect={false}
            //placeholderTextColor="black"
            errorStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={this.state.last_name_err ? 'This is required' : ""}
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
            errorMessage={this.state.password_valid ? 'This is required' : ""}
            keyboardType="default"
          />
          <Input
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="******"
            label="Confirm Password"
            labelStyle={{ marginTop: 10 }}
            value={this.state.cpassword}
            onChangeText={password => this.onCPasswordChange(password)}
            autoCorrect={false}
            //placeholderTextColor="black"
            errorStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={this.state.cpassword_err ? "Password not matched" : ''}
            keyboardType="default"

          />
          {/* <Input
            autoCapitalize="none"
            placeholder="Cellphone number"
            label="Cellphone number"
            labelStyle={{ marginTop: 10 }}
            value={this.state.phone}
            onChangeText={x => this.phoneValidate(x)}
            autoCorrect={false}
            //placeholderTextColor="black"
            errorStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={this.state.phone_err ? 'This is required' : ""}
            keyboardType="default"

          /> */}


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
