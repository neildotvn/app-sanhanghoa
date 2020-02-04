import React from "react";
import { TextInput } from "react-native";

export default function(props) {
    const config = props.config;

    return (
        <TextInput
            style={props.style}
            onChangeText={text => props.onChangeText(text, props.title)}
            {...config}
            placeholderTextColor="#bbb"
        />
    );
}
