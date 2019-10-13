import React from "react";
import { Platform, StyleSheet, StatusBar, View } from "react-native";
import MarketTabScreen from "../../components/market/MarketTab";
import TopBar from "../../components/TopBar";
import TopTabBar from "../../components/TopTabBar";
import Strings from "../../constants/Strings";

class MarketScreen extends React.Component {
    onTabChanged = position => {
        console.log(position);
    };

    topBarConfig = {
        title: Strings.HEADER_MARKET,
        rightButtonLabel: Strings.HEADER_BUTTON_ALERT,
        rightImageSource: require("../../assets/images/icons/ic-alert.png")
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar {...this.topBarConfig} />
                <TopTabBar onTabChanged={this.onTabChanged} />
                <MarketTabScreen />
            </View>
        );
    }
}

export default MarketScreen;

MarketScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    }
});
