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

export default function MarketScreen() {
    return <View style={styles.container}></View>;
}

MarketScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff000",
        marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    }
});
