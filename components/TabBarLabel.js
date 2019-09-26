import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";

export default function({ focused, label }) {
    return (
        <Text style={[styles.text, focused ? styles.active : {}]}>{label}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        color: Colors.black3,
        fontSize: 11,
        textAlign: "center"
    },
    active: {
        color: Colors.main
    }
});
