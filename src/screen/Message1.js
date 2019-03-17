
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

        this.props.navigation.navigate('PhoneStart');
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
                        Please check your email to confirm your registration and validate your email. [If you don’t see the confirmation email in your inbox, please check your email junk box.]
                    </Text>



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

            </View>
        );
    }
}
export default SignInScreen;
