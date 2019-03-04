import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
//import reducers from './reducers';
import AppStackNavigator from './Router';
console.ignoredYellowBox = ['Warning:'];
 
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    // isSignedIn()
    //   .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
    //   .catch(err => alert("An error occurred"));
  }

  render() {

    const { checkedSignIn, signedIn } = this.state;

    //const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    //const Layout = createRootNavigator(signedIn);
    return (

      // <Provider store={store}>
        <AppStackNavigator />
      // </Provider>
    );
  }
}

export default App;
