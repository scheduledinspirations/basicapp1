import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
class Draggable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDraggable: true,
            dropAreaValues: null,
            pan: new Animated.ValueXY(),
            opacity: new Animated.Value(1)
        };
    }

    componentWillMount() {
        this._val = { x: 0, y: 0 }
        this.state.pan.addListener((value) => this._val = value);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderGrant: (e, gesture) => {
                this.state.pan.setOffset({
                    x: this._val.x,
                    y: this._val.y
                })
                this.state.pan.setValue({ x: 0, y: 0 })
            },
            onPanResponderMove: Animated.event([
                null, { dx: 0, dy: this.state.pan.y }
            ]),
            onPanResponderRelease: (e, gesture) => {
                
                // if (this.isDropArea(gesture)) {
                //     Animated.timing(this.state.opacity, {
                //         toValue: 0,
                //         duration: 1000
                //     }).start(() =>
                //         this.setState({
                //             showDraggable: false
                //         })
                //     );
                // }
            }
        });
    }

    isDropArea(gesture) {
        return gesture.moveY < 200;
    }

    render() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        }
        if (this.state.showDraggable) {
            return (

                <Animated.View

                    {...this.panResponder.panHandlers}
                    style={[...this.props.style, panStyle, styles.cardStyle,  { opacity: this.state.opacity }]}
                >
                    {this.props.children}
                </Animated.View>

            );
        }

    }


}


export default Draggable;
const styles = {
    cardStyle: {
      position: 'absolute',
      width: SCREEN_WIDTH
    }
  };