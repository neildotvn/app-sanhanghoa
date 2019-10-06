import React from "react";
import { StyleSheet, WebView, Platform, StatusBar, View } from "react-native";
import TopBar from "../../components/TopBar";
import Strings from "app/constants/Strings";

export default function NewsScreen() {
    topBarConfig = {
        title: Strings.HEADER_NEWS
    };

    return (
        <View style={styles.container}>
            <TopBar {...this.topBarConfig} />
            <WebView
                style={styles.flex}
                source={{
                    uri: "https://sanhanghoa24h.com/tin-tuc-thi-truong/"
                }}
            />
        </View>
    );
}

NewsScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    },
    webview: {
        flex: 1
    }
});
