import React, { Component } from 'react';

import { ScrollView, TouchableOpacity, Image, Text, View, AsyncStorage, ImageBackground, Dimensions, Platform } from "react-native";
import { Card, Button, FormLabel, FormInput, FormValidationMessage, Input, Icon } from "react-native-elements";
import { CONF, styles, axiosCall, requiredData } from './common';
import Loader from './common/Loader';
const BG_IMAGE = require('../../assets/img/main-bg.jpg');
const LOGO = require('../../assets/img/logo.png');
const TOPLOGO = require('../../assets/img/profile.png');
const subBtnImg = require('../../assets/img/updateBtn.png');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SignInScreen extends React.Component {

    state = {
        showLoading: true, error: false, id: 0,
        email: '', email_err: false,
        first_name: '', first_name_err: false,
        last_name: '', last_name_err: false,
        phone: '', phone_err: false

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
    phoneValidate = (x) => {
        this.setState({
            phone: x,
            phone_err: requiredData(x)
        });
    }

    emailValidate = (x) => {
        this.setState({
            email: x,
            email_err: requiredData(x)
        });
    };
    onButtonPress = () => {
        if (!this.valid()) {
            return;
        }
        this.updateProfile()
    }
    updateProfile = async () => {


        const a = await axiosCall();
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            id: this.state.id
        }
        this.setState({
            showLoading: true
        });
        a.put('api/myprofile/' + data.id, data).then(res => {
            console.log('response:', res);
            this.getProfile();
        }).catch(error => {
            this.setState({
                showLoading: false,
                error: "No Message found"
            });
            console.log('error', error);
        });


    }
    getProfile = async () => {
        const a = await axiosCall();

        a.get('api/myprofile').then(res => {
            console.log('response:', res);
            let data = res.data.user;
            this.setState({
                showLoading: false,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                email: data.email,
                id: data.id
            });
        }).catch(error => {
            this.setState({
                showLoading: false,
                error: "No Message found"
            });
            console.log('error', error);
        });

    }
    componentDidMount() {
        this.getProfile();

    }
    valid = () => {
        if (this.state.first_name_err) {
            return false;
        }
        if (this.state.last_name_err) {
            return false;
        }
        if (this.state.phone_err) {
            return false;
        }
        if (this.state.email_err) {
            return fasle;
        }

        return true;
    }

    render() {
        return (
            <ScrollView >

                <View style={styles.center}>
                    <Image
                        source={TOPLOGO}
                    />
                </View>
                <View style={styles.containerStyle} ><Loader loading={this.state.showLoading} />
                    <Input
                        autoCapitalize="none"
                        placeholder="Jane"
                        label="First name"
                        labelStyle={{ marginTop: 10 }}
                        value={this.state.first_name}
                        onChangeText={x => this.fnameValidate(x)}
                        autoCorrect={false}
                        //placeholderTextColor="black"
                        errorStyle={{ textAlign: 'center', fontSize: 12 }}
                        errorMessage={this.state.first_name_err ? "Please enter a valid password" : ''}
                        keyboardType="default"

                    />
                    <Input
                        autoCapitalize="none"

                        placeholder="Smit"
                        label="Last name"
                        labelStyle={{ marginTop: 10 }}
                        value={this.state.last_name}
                        onChangeText={x => this.lnameValidate(x)}
                        autoCorrect={false}
                        //placeholderTextColor="black"
                        errorStyle={{ textAlign: 'center', fontSize: 12 }}
                        errorMessage={this.state.last_name_err ? "Please enter a valid password" : ''}
                        keyboardType="default"

                    />
                    <Input
                        autoCapitalize="none"
                        placeholder="name@example.com"
                        label="Email"
                        labelStyle={{ marginTop: 16 }}
                        value={this.state.email}
                        onChangeText={x => this.emailValidate(x)}
                        autoCorrect={false}
                        blurOnSubmit={false}
                        // placeholderTextColor="black"
                        errorStyle={{ textAlign: 'center', fontSize: 12 }}
                        errorMessage={this.state.email_err ? "Please enter a valid email address" : ''}
                        keyboardType="email-address"
                    />


                    <Input
                        autoCapitalize="none"
                        placeholder="Jane"
                        label="Cellphone number"
                        labelStyle={{ marginTop: 10 }}
                        value={this.state.phone}
                        onChangeText={x => this.phoneValidate(x)}
                        autoCorrect={false}
                        //placeholderTextColor="black"
                        errorStyle={{ textAlign: 'center', fontSize: 12 }}
                        errorMessage={this.state.phone_err ? "Please enter a valid password" : ''}
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

            </ScrollView>
        );
    }
}
export default SignInScreen;

