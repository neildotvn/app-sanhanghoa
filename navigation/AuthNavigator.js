import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LogInScreen from "../screens/auth/LogInScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const authNavigator = createStackNavigator(
    {
        LogIn: LogInScreen,
        Register: RegisterScreen
    },
    {
        initialRouteName: "LogIn",
        defaultNavigationOptions: {
            header: null
        }
    }
);

export default authNavigator;
