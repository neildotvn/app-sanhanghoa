import React from "react";
import { Text } from "react-native";

export function RegularText(props) {
    return <Text {...props} style={[props.style, { fontFamily: "regular" }]} />;
}

export function LightText(props) {
    return <Text {...props} style={[props.style, { fontFamily: "light" }]} />;
}
