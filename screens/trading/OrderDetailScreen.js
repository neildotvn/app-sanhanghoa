import React from "react";
import { connect } from "react-redux";
import { Platform, StatusBar, StyleSheet, View, Button } from "react-native";
import OpenOrder from "../../components/trading/OpenOrder";
import TopBar from "../../components/TopBar";
import Colors from "../../constants/Colors";
import Strings from "../../constants/Strings";
import {
    getRowDataWithProductAndExchange,
    getProductNameFromCode
} from "../../constants/CommodityMap";
import { closeOrder, fetchAllActiveOrders } from "../../store/actions/Order";
import Toast from "react-native-simple-toast";
import Spinner from "react-native-loading-spinner-overlay";

class OrderDetailScreen extends React.Component {
    componentDidUpdate() {
        if (this.props.orderStore.close_success) {
            Toast.show(Strings.ORDER_CLOSE_SUCCESS);
            this.props.navigation.pop();
        }
        if (this.props.orderStore.error) {
            Toast.show(Strings.ORDER_CLOSE_FAIL);
        }
    }

    onCloseOrder = () => {
        try {
            const order = this.props.navigation.getParam("order");
            productName = getProductNameFromCode(order.product);
            rowData = getRowDataWithProductAndExchange(
                this.props.pricesStore.prices,
                order.product,
                order.exchange
            );
            currentPrice = rowData[1];
            this.props.onCloseOrder(order.order_uid, currentPrice);
        } catch (err) {
            console.log(err);
        }
    };

    onBackPressed = () => {
        this.props.navigation.pop();
    };

    topBarConfig = {
        title: Strings.HEADER_ORDER_DETAIL,
        leftImageSource: require("../../assets/images/icons/ic-back.png"),
        onLeftButtonPress: this.onBackPressed
    };

    render() {
        return (
            <View style={styles.container}>
                <Spinner visible={this.props.orderStore.close_loading} />
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <TopBar {...this.topBarConfig} />
                <View style={styles.detailContainer}>
                    <OpenOrder
                        order={this.props.navigation.getParam("order")}
                    />
                    <View style={{ height: 20 }}></View>
                    <Button
                        onPress={() => this.onCloseOrder()}
                        color={Colors.decrease}
                        title={Strings.ORDER_CLOSE}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
        // paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    },
    detailContainer: {
        padding: 20
    },
    button: {}
});

const mapStateToProps = state => {
    return {
        pricesStore: state.pricesStore,
        orderStore: state.orderStore
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCloseOrder: (order_uid, price) =>
            dispatch(closeOrder(order_uid, price)),
        fetchAllActiveOrders: () => dispatch(fetchAllActiveOrders())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderDetailScreen);
