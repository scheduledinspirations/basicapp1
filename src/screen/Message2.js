
import React, { Component } from 'react';

import { TouchableOpacity, Image, Text, View, AsyncStorage, ImageBackground, Dimensions, Platform } from "react-native";
import { Card, Button, FormLabel, FormInput, FormValidationMessage, Input, Icon } from "react-native-elements";
import { CONF, styles } from './common';

const BG_IMAGE = require('../../assets/img/main-bg.jpg');
const LOGO = require('../../assets/img/logo.png');
const BELL = require('../../assets/img/bell.png');


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
         }
    
    onButtonPress = () => {
        this.setState({
            email_valid: this.validateEmail(this.state.email),
            password_valid: this.validatePassword(this.state.password),
        });
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={styles.container}>


                <View style={styles.center}>
                    <Image
                        source={BELL}
                    />
                    <Text style={{ fontSize: 16 }}>
                        ScheduleInspriration
                    </Text>
                </View>
                <View style={styles.containerStyle} >


                    <Text style={{ fontSize: 16 }}>
                        We’ve sent a four-digit verification code to the cellphone number you indicated. Please insert it below to complete your registration
                    </Text>

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

            </View >
        );
    }

}
export default SignInScreen;
