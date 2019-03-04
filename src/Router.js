import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import SignInScreen from './screen/Signin';
import HomeScreen from './screen/Home';
import RegisterScreen from './screen/Register';
import ForgotScreen from './screen/Forgot';
import PinScreen from './screen/Forgot';
import Message1Screen from './screen/Message1';
import Message2Screen from './screen/Message2';
import SchedularScreen from './screen/Schedular';
import SchedularEditScreen from './screen/SchedularEdit';

import MessageListScreen from './screen/MessageList';
import MessageArchiveScreen from './screen/MessageArchive';
import ProfileScreen from './screen/Profile';

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = createStackNavigator({
  Home: HomeScreen, schedular: SchedularScreen, messageList: MessageListScreen,
  messageArchive: MessageArchiveScreen, profile: ProfileScreen, schedularEdit: SchedularEditScreen
}, { headerMode: 'none' });
const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen, Register: RegisterScreen, Forgot: ForgotScreen, Pin: PinScreen,
    message1: Message1Screen, message2: Message2Screen
  }, { headerMode: 'none' });


const AppStackNavigator = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none'
  }
));



export default AppStackNavigator;