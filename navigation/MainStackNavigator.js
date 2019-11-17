import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import OrderHistoryScreen from "../screens/trading/OrderHistoryScreen";
import UpdateProfileScreen from "../screens/settings/UpdateProfileScreen";
import MarketPricesScreen from "../screens/market/MarketPricesScreen";
import CreateOrderScreen from "../screens/trading/CreateOrderScreen";
import OrderDetailScreen from "../screens/trading/OrderDetailScreen";
import ContactScreen from '../screens/settings/ContactScreen'

const authNavigator = createStackNavigator(
    {
        MainTab: MainTabNavigator,
        OrderHistory: OrderHistoryScreen,
        EditProfile: UpdateProfileScreen,
        Contact: ContactScreen,
        PricesDetail: MarketPricesScreen,
        CreateOrder: CreateOrderScreen,
        OrderDetail: OrderDetailScreen
    },
    {
        initialRouteName: "MainTab",
        defaultNavigationOptions: {
            header: null
        }
    }
);

export default authNavigator;
