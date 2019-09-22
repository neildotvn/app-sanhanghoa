import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import AuthScreen from "../screens/auth/AuthScreen";

const authNavigator = createStackNavigator(
    {
        Auth: AuthScreen
    },
    {
        initialRouteName: "Auth",
        defaultNavigationOptions: {
            header: null
        }
    }
);

export default authNavigator;
