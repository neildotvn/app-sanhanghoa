import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import OrderHistoryScreen from "../screens/trading/OrderHistoryScreen";

const authNavigator = createStackNavigator(
    {
        MainTab: MainTabNavigator,
        OrderHistory: OrderHistoryScreen
    },
    {
        initialRouteName: "MainTab",
        defaultNavigationOptions: {
            header: null
        }
    }
);

export default authNavigator;
