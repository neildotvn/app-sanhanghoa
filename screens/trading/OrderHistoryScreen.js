import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Platform,
    StatusBar
} from "react-native";
import TopBar from "../../components/TopBar";
import Strings from "../../constants/Strings";
import { connect } from "react-redux";
import OpenOrder from "../../components/trading/OpenOrder";
import Colors from "../../constants/Colors";
import { fetchAccountInfo } from "../../store/actions/Account";
import { fetchOrderHistory } from "../../store/actions/Order";

class OrderHistoryScreen extends React.Component {
    state = {
        balanceInfo: {
            balance: 20000,
            credit: 0,
            residualDeposit: 19000,
            leverage: "400%",
            freeMargin: 21000
        }
    };

    onBackPressed = () => {
        this.props.navigation.pop();
    };

    infoNames = {
        balance: Strings.TRADING_BALANCE,
        credit: Strings.TRADING_CREDIT,
        residualDeposit: Strings.TRADING_RESIDUAL_DEPOSIT,
        leverage: Strings.TRADING_LEVERAGE,
        freeMargin: Strings.TRADING_FREE_MARGIN
    };

    topBarConfig = {
        title: Strings.HEADER_ORDER_HISTORY,
        leftButtonLabel: Strings.HEADER_BUTTON_BACK,
        leftImageSource: require("../../assets/images/icons/ic-back.png"),
        onLeftButtonPress: this.onBackPressed
    };

    componentDidMount() {
        this.props.fetchOrderHistory();
    }

    render() {
        const orders = this.props.orderStore.orderHistory;
        const orderList = orders.map((order, position) => (
            <OpenOrder
                key={position}
                volume={order.volume}
                createdAt={order.created_at}
                orderType={order.order_type}
                exchange={order.exchange}
                placingPrice={order.placing_price}
            />
        ));

        return (
            <View style={styles.container}>
                <TopBar {...this.topBarConfig} />
                <ScrollView style={styles.scrollView}>
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
        fetchOrderHistory: () => dispatch(fetchOrderHistory())
    };
};

OrderHistoryScreen.navigationOptions = {
    header: null
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderHistoryScreen);

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
