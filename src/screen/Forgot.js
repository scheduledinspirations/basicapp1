
import React, { Component } from 'react';

import { TouchableOpacity, Image, Text, View, AsyncStorage, ImageBackground, Dimensions, Platform } from "react-native";
import { Card, Button, FormLabel, FormInput, FormValidationMessage, Input, Icon } from "react-native-elements";
import { CONF, styles } from './common';

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

    onForgotPress = () => {
        this.props.navigation.navigate('Forgot');
    }
    render() {
        return (
            <View style={styles.container}>

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
                    <Image
                        source={LOGO}
                        style={{ width: 50, height: 50 }}
                    />
                </View>
                {/* </ImageBackground> */}
            </View>
        );
    }

}
export default SignInScreen;
