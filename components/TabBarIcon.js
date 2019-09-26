import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

import icMarket from "../assets/images/tab-icons/ic-market.png";
import icMarketActive from "../assets/images/tab-icons/ic-market-active.png";
import icTrade from "../assets/images/tab-icons/ic-trade.png";
import icTradeActive from "../assets/images/tab-icons/ic-trade-active.png";
import icNews from "../assets/images/tab-icons/ic-news.png";
import icNewsActive from "../assets/images/tab-icons/ic-news-active.png";
import icNoti from "../assets/images/tab-icons/ic-noti.png";
import icNotiActive from "../assets/images/tab-icons/ic-noti-active.png";
import icSettings from "../assets/images/tab-icons/ic-settings.png";
import icSettingsActive from "../assets/images/tab-icons/ic-settings-active.png";

import Colors from "../constants/Colors";

const iconStyle = {
    width: 28,
    height: 28,
    marginBottom: -4
};

export const iconTypes = {
    TYPE_MARKET: 0,
    TYPE_TRADE: 1,
    TYPE_NEWS: 2,
    TYPE_NOTI: 3,
    TYPE_SETTINGS: 4
};

export default function TabBarIcon({ focused, type }) {
    console.log(type);

    let iconSource;
    switch (type) {
        case iconTypes.TYPE_MARKET:
            iconSource = focused ? icMarketActive : icMarket;
            break;
        case iconTypes.TYPE_TRADE:
            iconSource = focused ? icTradeActive : icTrade;
            break;
        case iconTypes.TYPE_NEWS:
            iconSource = focused ? icNewsActive : icNews;
            break;
        case iconTypes.TYPE_NOTI:
            iconSource = focused ? icNotiActive : icNoti;
            break;
        case iconTypes.TYPE_SETTINGS:
            iconSource = focused ? icSettingsActive : icSettings;
            break;
    }

    return <Image source={iconSource} style={iconStyle} />;
}
