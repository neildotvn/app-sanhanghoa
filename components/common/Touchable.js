import React from 'react';
import {TouchableNativeFeedback, TouchableHighlight, Platform} from 'react-native';

export default function(props) {
    return Platform.OS === "android" ? (
        <TouchableNativeFeedback onPress={props.onPress}>
            {props.children}
        </TouchableNativeFeedback>
    ) : (
        <TouchableHighlight onPress={props.onPress}>
            {props.children}
        </TouchableHighlight>
    )
}