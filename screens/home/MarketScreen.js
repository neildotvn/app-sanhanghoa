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
import MarketTabScreen from "../../components/market/MarketTab";
import TopBar from "../../components/TopBar";
import TopTabBar from "../../components/TopTabBar";
import Strings from "../../constants/Strings";

class MarketScreen extends React.Component {
    topBarConfig = {
        title: Strings.HEADER_MARKET,
        rightButtonLabel: Strings.HEADER_BUTTON_ALERT,
        rightImageSource: require("../../assets/images/icons/ic-alert.png")
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar {...this.topBarConfig} />
                <TopTabBar />
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
