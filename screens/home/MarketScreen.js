import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    StatusBar,
    View
} from "react-native";
import { ExpoConfigView } from "@expo/samples";
import MarketTabScreen from "../market/MarketTabScreen";
import TopBar from "../../components/TopBar";
import TopTabBar from "../../components/TopTabBar";

export default function MarketScreen(props) {
    const topBarConfig = {
        title: "Thị trường",
        rightButtonLabel: "Tin báo",
        rightImageSource: require("../../assets/images/icons/ic-alert.png")
    };

    return (
        <View style={styles.container}>
            <TopBar {...topBarConfig} />
            <TopTabBar />
            <MarketTabScreen />
        </View>
    );
}

MarketScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    }
});
