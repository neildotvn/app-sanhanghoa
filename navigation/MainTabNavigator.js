import React from "react";
import { Platform } from "react-native";
import {
    createStackNavigator,
    createBottomTabNavigator
} from "react-navigation";

import TabBarIcon, { iconTypes } from "../components/TabBarIcon";
import MarketScreen from "../screens/home/MarketScreen";
import MarketTabNavigator from "./MarketTabNavigator";
import CreateOrderScreen from "../screens/trading/CreateOrderScreen";
import TradingScreen from "../screens/home/TradingScreen";
import NewsScreen from "../screens/home/NewsScreen";
import NotificationScreen from "../screens/home/NotificationScreen";
import SettingsScreen from "../screens/home/SettingsScreen";
import TabBarLabel from "../components/TabBarLabel";

const config = Platform.select({
    web: { headerMode: "screen" },
    default: {}
});

const MarketStack = createStackNavigator(
    {
        Home: MarketScreen // CreateOrderScreen //
    },
    config
);

MarketStack.navigationOptions = {
    tabBarLabel: ({ focused }) => (
        <TabBarLabel focused={focused} label={"Thị trường"} />
    ),
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} type={iconTypes.TYPE_MARKET} />
    )
};

MarketStack.path = "";

const TradingStack = createStackNavigator(
    {
        Links: TradingScreen
    },
    config
);

TradingStack.navigationOptions = {
    tabBarLabel: ({ focused }) => (
        <TabBarLabel focused={focused} label={"Giao dịch"} />
    ),
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} type={iconTypes.TYPE_TRADE} />
    )
};

TradingStack.path = "";

const NewsStack = createStackNavigator(
    {
        Settings: NewsScreen
    },
    config
);

NewsStack.navigationOptions = {
    tabBarLabel: ({ focused }) => (
        <TabBarLabel focused={focused} label={"Tin tức"} />
    ),
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} type={iconTypes.TYPE_NEWS} />
    )
};

const NotificationStack = createStackNavigator(
    {
        Settings: NotificationScreen
    },
    config
);

NotificationStack.navigationOptions = {
    tabBarLabel: ({ focused }) => (
        <TabBarLabel focused={focused} label={"Thông báo"} />
    ),
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} type={iconTypes.TYPE_NOTI} />
    )
};

const SettingsStack = createStackNavigator(
    {
        Settings: SettingsScreen
    },
    config
);

SettingsStack.navigationOptions = {
    tabBarLabel: ({ focused }) => (
        <TabBarLabel focused={focused} label={"Cá nhân"} />
    ),
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} type={iconTypes.TYPE_SETTINGS} />
    )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
    MarketStack,
    TradingStack,
    NewsStack,
    NotificationStack,
    SettingsStack
});

tabNavigator.path = "";

export default tabNavigator;
