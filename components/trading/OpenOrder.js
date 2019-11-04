import React from "react";
import { StyleSheet, View, TouchableNativeFeedback } from "react-native";
import { RegularText, MediumText, BoldText } from "../common/StyledText";
import { connect } from "react-redux";
import Colors from "../../constants/Colors";
import { orderTypes } from "../../constants/Strings";
import OrderInfo from "./OrderInfo";
import {
    getRowDataWithProductAndExchange,
    getProductNameFromCode
} from "../../constants/CommodityMap";
import { parseTime } from "../../utils/TimeUtils";

class OpenOrder extends React.Component {
    render() {
        const order = this.props.order;
        order.createdAt = parseTime(order.created_at);
        let rowData;

        try {
            order.productName = getProductNameFromCode(
                this.props.order.product
            );
            rowData = getRowDataWithProductAndExchange(
                this.props.pricesStore.prices,
                this.props.order.product,
                this.props.order.exchange
            );
            order.currentPrice = rowData[1];
        } catch (err) {
            console.log(err);
        }

        return <OrderInfo order={order} onPress={this.props.onPress} />;
    }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
    return {
        pricesStore: state.pricesStore
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OpenOrder);
