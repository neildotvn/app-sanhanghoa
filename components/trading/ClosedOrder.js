import React from "react";
import OrderInfo from "./OrderInfo";
import { getProductNameFromCode, getLeverageFromCode } from "../../constants/CommodityMap";
import { parseTime } from "../../utils/TimeUtils";

class ClosedOrder extends React.Component {
    render() {
        const order = this.props.order;
        order.createdAt = parseTime(order.created_at);
        order.productName = getProductNameFromCode(this.props.order.product);
        const leverage = getLeverageFromCode(this.props.order.product);
        const value =
            (this.props.order.closing_price - this.props.order.placing_price) * leverage * this.props.order.volume;
        order.value = value;

        return <OrderInfo order={order} onPress={this.props.onPress} />;
    }
}

export default ClosedOrder;
