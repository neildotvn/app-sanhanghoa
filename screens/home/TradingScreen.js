import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Platform,
    StatusBar
} from "react-native";
import { ExpoLinksView } from "@expo/samples";
import TopBar from "../../components/TopBar";
import BalanceInfo from "../../components/trading/BalanceInfo";
import Strings from "../../constants/Strings";
import { MediumText } from "../../components/common/StyledText";
import OpenOrder from "../../components/trading/OpenOrder";
import Colors from "../../constants/Colors";

class TradingScreen extends React.Component {
    state = {
        balanceInfo: {
            balance: 20000,
            credit: 0,
            residualDeposit: 19000,
            leverage: "400%",
            freeMargin: 21000
        }
    };

    infoNames = {
        balance: Strings.TRADING_BALANCE,
        credit: Strings.TRADING_CREDIT,
        residualDeposit: Strings.TRADING_RESIDUAL_DEPOSIT,
        leverage: Strings.TRADING_LEVERAGE,
        freeMargin: Strings.TRADING_FREE_MARGIN
    };

    topBarConfig = {
        title: Strings.HEADER_TRADING,
        rightButtonLabel: Strings.HEADER_BUTTON_HISTORY,
        rightImageSource: require("../../assets/images/icons/ic-history.png")
    };

    render() {
        const balanceInfo = [];
        for (key in this.state.balanceInfo) {
            balanceInfo.push(
                <BalanceInfo
                    key={key}
                    title={this.infoNames[key]}
                    value={this.state.balanceInfo[key]}
                />
            );
        }
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TopBar {...this.topBarConfig} />
                    <View style={styles.balanceInfoContainer}>
                        {balanceInfo}
                    </View>
                    <View style={styles.titleOpenOrderContainer}>
                        <MediumText style={styles.titleOpenOrder}>
                            {Strings.TRADING_OPEN_ORDER}
                        </MediumText>
                    </View>
                    <View styles={styles.openOrderContainer}>
                        <OpenOrder />
                        <OpenOrder />
                        <OpenOrder />
                        <OpenOrder />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default TradingScreen;

TradingScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        paddingStart: 12,
        paddingEnd: 12
    },
    balanceInfoContainer: {
        marginTop: 12
    },
    titleOpenOrderContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 36,
        backgroundColor: Colors.grey,
        marginTop: 16,
        marginBottom: 8
    },
    titleOpenOrder: {
        fontSize: 14,
        color: Colors.black3
    }
});
