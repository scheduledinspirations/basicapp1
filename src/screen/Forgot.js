
import React, { Component } from 'react';

import { TouchableOpacity, Image, Text, View, AsyncStorage, ImageBackground, Dimensions, Platform } from "react-native";
import { Card, Button, FormLabel, FormInput, FormValidationMessage, Input, Icon } from "react-native-elements";
import { CONF, styles, validateEmail, axiosCall } from './common'; import Loader from './common/Loader';


const BG_IMAGE = require('../../assets/img/main-bg.jpg');
const LOGO = require('../../assets/img/logo.png');
const subBtnImg = require('../../assets/img/next.png');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SignInScreen extends React.Component {

    state = {
        fontLoaded: false,
        email: '',
        email_valid: true,

        error: false,

        showLoading: false
    };
    constructor(props) {
        super(props);
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }
    validateAction = () => {
        if (!this.state.email_valid) return false;
        return true;
    }
    onButtonPress = () => {
        this.setState({
            email_valid: this.validateEmail(this.state.email),
            error: false

        }, () => {
            if (this.validateAction()) {
                this.doForgot();
            }
        });

    }
    doForgot = async () => {
        const a = await axiosCall();
        const data = {
            email: this.state.email
        }
        this.setState({
            showLoading: true
        });
        a.post('password/email', data).then(res => {
            //console.log('response:', res);
            this.setState({
                showLoading: false
            });
            this.props.navigation.navigate('ForgotMsg');
        }).catch(error => {
            this.setState({
                showLoading: false,
                error: "Error please try again"
            });
            console.log('error', error);
        });

    }
    onEmailChange(email) {

        this.setState({
            email: email, error: false,
            email_valid: this.validateEmail(email)
        });
    }
    onForgotPress = () => {
        this.props.navigation.navigate('Forgot');
    }
    render() {
        return (
            <View style={styles.container}>
                <Loader loading={this.state.showLoading} />
                {/* <ImageBackground
          source={BG_IMAGE}
          style={styles.bgImage}
        > */}
                <View style={styles.center}>
                    <TouchableOpacity style={styles.touchable} onPress={() => this.props.navigation.navigate('SignIn')}>
                        <Image
                            source={LOGO}
                        />
                    </TouchableOpacity>
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





                    <TouchableOpacity style={[styles.touchable]} onPress={this.onButtonPress}>

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
