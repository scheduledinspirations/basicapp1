
import React, { Component } from 'react';
import { FlatList, ScrollView, Image, Text, View, Dimensions, Platform, Alert } from "react-native";
import { ListItem, Icon, Button } from "react-native-elements";
import { CONF, styles, axiosCall, Confirm } from './common';
import Loader from './common/Loader';

const BG_IMAGE = require('../../assets/img/main-bg.jpg');
const LOGO = require('../../assets/img/logo.png');
const TOPLOGO = require('../../assets/img/archive.png');
const subBtnImg = require('../../assets/img/next.png');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SignInScreen extends React.Component {

    state = {
        loading: true,
        data: [],
        page: 1,
        seed: 1,
        error: null,
        refreshing: false,
        showLoading: false,
        showModal: false,

        tempData: ''
    };
    constructor(props) {
        super(props);
        this.geteMessages();
    }
    onEditPress = (item) => {

        this.props.navigation.navigate('schedular', item);
    }
    onDelPress = (item) => {
        Alert.alert(
            'Delete Message',
            'Delete Message',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.deletMessage(item) },
            ],
            { cancelable: false },
        );


    }
    actions = (item) => {
        return <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Icon name='copy' type='font-awesome' color='#f50' onPress={() => this.onEditPress(item)} />
            <Icon name='trash' type='font-awesome' color='#f50' onPress={() => this.onDelPress(item)} />

        </View>
    }
    onAccept = (id) => {
        this.deletMessage(id);
    }
    deletMessage = async (item) => {
        const a = await axiosCall();
        a.delete('api/message/' + item.id).then(res => {
            // console.log(res);
            this.setState({
                showLoading: false,
                data: res.data.result

            });
            this.props.navigation.navigate('messageList');
            //this.signInAsync(res.data.api_key);
        }).catch(error => {
            this.setState({
                showLoading: false,
                error: "No Message found"
            });
            console.log(error);
        });

    }
    onDecline = (item) => {
        this.setState({ showModal: false });
    }
    showTime = () => {
        date1 = this.state.date + ' ' + this.state.time;
        return Moment(date1).format('h:mm a');
    }
    geteMessages = async () => {

        const a = await axiosCall();
        a.get('api/message/archive').then(res => {
            console.log(res);
            this.setState({
                showLoading: false,
                data: res.data.result

            });
            //this.signInAsync(res.data.api_key);
        }).catch(error => {
            this.setState({
                showLoading: false,
                error: "No Message found"
            });
            console.log(error);
        });
    }

    renderRow = (item) => {
        return <ListItem
            title={item.message}
            bottomDivider
            onPress={this.showSchedular}
            rightIcon={() => this.actions(item)}

        />
    }
    render() {
        return (
            <View style={styles.container}>
                <Loader loading={this.state.showLoading} />
                <View style={styles.center}>
                    <Image
                        source={TOPLOGO}
                    />
                    <Text style={{ fontSize: 16 }}>
                        ScheduleInspriration
                    </Text>
                </View>
                <View style={styles.containerStyle} >

                    <ScrollView>

                        <FlatList


                            data={this.state.data}
                            renderItem={({ item }) => this.renderRow(item)}
                            //ListHeaderComponent={this.renderHeader}
                            keyExtractor={(item) => +item.id}
                            // ListFooterComponent={<RenderFooter loading={this.state.loading} loadMore={this.loadMore} count={this.state.data.length} />}
                            onRefresh={this.handleRefresh}
                            refreshing={this.state.refreshing}
                        // contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-evenly' }}

                        // onEndReachedThreshold={1} 
                        //onEndReached={this.loadMore}

                        />
                    </ScrollView>



                </View>
                <View style={styles.right}>
                    <Image
                        source={LOGO}
                        style={{ width: 50, height: 50 }}
                    />
                </View>
                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept}
                    onDecline={this.onDecline}
                >
                    Are you sure you want to delete this?
                </Confirm>

            </View >
        );
    }


}
export default SignInScreen;

