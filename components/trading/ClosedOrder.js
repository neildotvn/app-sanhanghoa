import React from "react";
import OrderInfo from "./OrderInfo";
import { getProductNameFromCode } from "../../constants/CommodityMap";
import { parseTime } from "../../utils/TimeUtils";

class ClosedOrder extends React.Component {
    render() {
        const order = this.props.order;
        order.createdAt = parseTime(order.created_at);
        order.productName = getProductNameFromCode(this.props.order.product);

        return <OrderInfo order={order} onPress={this.props.onPress} />;
    }
}

export default ClosedOrder;
