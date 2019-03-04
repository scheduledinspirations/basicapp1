import React, { Component } from 'react';

import { TimePickerAndroid, DatePickerAndroid, ScrollView, TouchableOpacity, Image, Text, View, AsyncStorage, ImageBackground, Dimensions, Platform } from "react-native";
import { Card, Button, FormLabel, FormInput, FormValidationMessage, Input, Icon } from "react-native-elements";
import { CONF, styles, URL, axiosCall } from './common';

const BG_IMAGE = require('../../assets/img/main-bg.jpg');
const LOGO = require('../../assets/img/logo.png');
const TOPLOGO = require('../../assets/img/calender.png');

const subBtnImg = require('../../assets/img/schedule.png');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SignInScreen extends React.Component {

  state = {
    name: '',
    phone: '',
    message: '',
    date: '',
    time: '',
    showLoading: false,
    name_err: false,
    phone_err: false,
    message_err: false,
    date_err: false,
    time_err: false,

  };
  constructor(props) {
    super(props);

  }

  validate = () => {
    if (!this.state.name.length) {
      this.setState({ name_err: "Name Required" });
    }
    if (!this.state.phone.length) {
      this.setState({ phone_err: "Phone Required" });
    }
    if (!this.state.message.length) {
      this.setState({ message_err: "Message Required" });
    }
    if (!this.state.date.length) {
      this.setState({ date_err: "Date Required" });
    }
    if (!this.state.time.length) {
      this.setState({ time_err: "Time Required" });
    }
    if (!this.state.error) {
      return true;
    }

  };
  onButtonPress = async () => {

    // if (!this.validate()) {
    //   return;
    // };
    const a = await axiosCall();
    const data = {
      name: this.state.name,
      phone: this.state.phone,
      message: this.state.message,
      date: this.state.date,
      time: this.state.time
    }
    a.post('api/message', data).then(res => {
      console.log('response:', res);
      this.setState({
        showLoading: false
      });
      this.props.navigation.navigate('messageList');
    }).catch(error => {
      this.setState({
        showLoading: false,
        error: "No Message found"
      });
      console.log('error', error);
    });


  }
  requiredData = (x) => {
    if (x) {
      return false;
    }
    return true;
  }
  nameValidate = (x) => {
    this.setState({
      name: x,
      name_err: this.requiredData(x)
    });

  }
  phoneValidate = (x) => {
    this.setState({
      phone: x,
      phone_err: this.requiredData(x)
    });
  }
  messageValidate = (x) => {
    this.setState({
      message: x,
      message_err: this.requiredData(x)
    });
  };

  onDatePress = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(),
        mode: 'spinner'
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({
          date: `${year}-${month}-${day}`
        });
        this.setState({
          date_err: this.requiredData(this.state.date)
        });

      }

    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }
  onTimePress = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 0,
        minute: 0,
        mode: 'spinner',
        is24Hour: false, // Will display '2 PM'
      });

      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        this.setState({ time: `${hour}:${minute}` });
        this.setState({
          time_err: this.requiredData(this.state.time)
        });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }
  componentDidMount() {
    if (this.props.navigation.state.params.id) {
      const data = this.props.navigation.state.params;
      this.setState({
        name: data.name,
        phone: data.phone,
        message: data.message,

      });
    }
  }
  render() {

    return (
      <ScrollView >

        <View style={styles.center}>
          <Image
            source={TOPLOGO}
          />
        </View>
        <View style={styles.containerStyle} >
          <Input
            autoCapitalize="none"
            placeholder=""
            label="Recipient name"
            labelStyle={{ marginTop: 16 }}
            value={this.state.name}
            onChangeText={name => this.nameValidate(name)}
            autoCorrect={false}
            blurOnSubmit={false}
            // placeholderTextColor="black"
            errorStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={this.state.name_err ? 'This field is required ' : ""}
            keyboardType="email-address"
          />
          <Input
            autoCapitalize="none"
            placeholder=""
            label="Recipient cellphone number"
            labelStyle={{ marginTop: 10 }}
            value={this.state.phone}
            onChangeText={phone => this.phoneValidate(phone)}
            autoCorrect={false}
            //placeholderTextColor="black"
            errorStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={this.state.phone_err ? 'This field is required' : ""}
            keyboardType="default"

          />
          <ScrollView>
            <Input
              autoCapitalize="none"
              placeholder=""
              label="Yourmessage"
              labelStyle={{ marginTop: 10 }}
              value={this.state.message}
              onChangeText={message => this.messageValidate(message)}
              value={this.state.message}
              autoCorrect={false}
              errorStyle={{ textAlign: 'center', fontSize: 12 }}

              keyboardType="default"
              multiline={true}
              numberOfLines={4}
              containerStyle={{ height: 80 }}
              errorMessage={this.state.message_err ? "This field is required" : ''}

            />
          </ScrollView>

          <Input
            autoCapitalize="none"
            placeholder=""
            label="Send date"
            labelStyle={{ marginTop: 10 }}
            value={this.state.date}
            autoCorrect={false}
            //placeholderTextColor="black"
            errorStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={this.state.email_valid ? '' : "This field is required"}
            keyboardType="default"
            rightIcon={() => <Icon name='calendar' type='font-awesome' color='#f50' onPress={() => this.onDatePress()} />}
            editable={false}
            errorMessage={this.state.date_err ? "This field is required" : ''}
          />
          <Input
            autoCapitalize="none"
            placeholder=""
            label="Send time"
            labelStyle={{ marginTop: 10 }}
            value={this.state.time}
            autoCorrect={false}
            //placeholderTextColor="black"
            errorStyle={{ textAlign: 'center', fontSize: 12 }}
            errorMessage={this.state.email_valid ? '' : "This field is required"}
            editable={false}
            rightIcon={() => <Icon name='calendar' type='font-awesome' color='#f50' onPress={() => this.onTimePress()} />}
            errorMessage={this.state.time_err ? "This field is required" : ""}
          />

          <TouchableOpacity style={styles.touchable} onPress={this.onButtonPress}>
            <Image
              source={subBtnImg}
              resizeMode={'contain'}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          <Image
            source={LOGO}
            style={{ width: 50, height: 50 }}
          />
        </View>
      </ScrollView>
    );
  }
}
export default SignInScreen;
