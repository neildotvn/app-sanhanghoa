import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Platform,
    StatusBar
} from "react-native";
import TopBar from "../../components/TopBar";
import BalanceInfo from "../../components/trading/BalanceInfo";
import Strings from "../../constants/Strings";
import { MediumText } from "../../components/common/StyledText";
import { connect } from "react-redux";
import OpenOrder from "../../components/trading/OpenOrder";
import Colors from "../../constants/Colors";
import { fetchAccountInfo } from "../../store/actions/Account";

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

    componentDidMount() {
        this.props.fetchAccount("88d4ec0f-4e36-473c-9f2f-f3b963c2c825");
    }

    render() {
        const account = this.props.accountStore.account;
        const balanceInfo = [];
        for (key in account) {
            if (key === "account_uid") continue;
            balanceInfo.push(
                <BalanceInfo
                    key={key}
                    title={this.infoNames[key]}
                    value={account[key]}
                />
            );
        }
        return (
            <View style={styles.container}>
                <TopBar {...this.topBarConfig} />
                <ScrollView style={styles.scrollView}>
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

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        accountStore: state.accountStore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAccount: user_uid => dispatch(fetchAccountInfo(user_uid))
    };
};

TradingScreen.navigationOptions = {
    header: null
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TradingScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    },
    scrollView: {
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
