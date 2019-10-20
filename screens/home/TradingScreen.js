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
import { fetchAllActiveOrders } from "../../store/actions/Order";

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

    openOrderHistory = () => {
        this.props.navigation.push("OrderHistory");
    };

    onOrderPress = order => {
        this.props.navigation.push("OrderDetail", { order });
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
        rightImageSource: require("../../assets/images/icons/ic-history.png"),
        onRightButtonPress: this.openOrderHistory
    };

    componentDidMount() {
        this.props.fetchAccount();
        this.props.fetchAllActiveOrders();
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

        const orders = this.props.orderStore.activeOrders;
        const orderList = orders.map((order, position) => (
            <OpenOrder
                key={position}
                order={order}
                onPress={this.onOrderPress}
            />
        ));

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
                    <View styles={styles.openOrderContainer}>{orderList}</View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        accountStore: state.accountStore,
        orderStore: state.orderStore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAccount: user_uid => dispatch(fetchAccountInfo(user_uid)),
        fetchAllActiveOrders: () => dispatch(fetchAllActiveOrders())
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
        flex: 1
        // marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
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
